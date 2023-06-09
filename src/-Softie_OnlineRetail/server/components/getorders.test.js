const request = require('supertest');
const app = require('../index');
const pool = require('./db');

afterAll(async () => {
  await pool.end();
});

describe('POST /get_all_orders', () => {
  it('should return all orders for a user', async () => {
    // Insert test data into the orders table
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test576@example.com', 'password576', 'Test User576', 'testuser576') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;
    const order_query = "INSERT INTO orders (user_id) VALUES ($1) RETURNING order_id";
    const order_res = await pool.query(order_query, [userId]);
    const order_id = order_res.rows[0].order_id;

    const response = await request(app)
      .post('/get_all_orders')
      .send({ user_id: userId })
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);

    expect(response.body.some(order => order.order_id === order_id)).toBeTruthy();


    // Clean up the test data from the orders table
    await pool.query('DELETE FROM orders WHERE order_id = $1', [order_id]);
    await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
  });

//   it('should return an error if there is a server error', async () => {
//     // Simulate a server error by dropping the orders table
//     await pool.query('DROP TABLE orders');

//     const response = await request(app)
//       .post('/get_all_orders')
//       .send({ user_id: 123 })
//       .expect(500);

//     expect(response.body.error).toBe('Internal server error');

//     // Recreate the orders table for subsequent tests
//     await pool.query('CREATE TABLE orders (user_id INTEGER, product_id INTEGER, quantity INTEGER)');
//   });

  it('should return an error if no orders are found for the user', async () => {
    const response = await request(app)
      .post('/get_all_orders')
      .send({ order_id: 456 })
      .expect(404);

    expect(response.body.error).toBe('No orders found for this user');
  });
});
