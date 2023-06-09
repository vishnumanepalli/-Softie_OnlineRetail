const request = require('supertest');
const app = require('../index');
const pool = require('./db');

afterAll(async () => {
  await pool.end();
});

describe('POST /get_order_items', () => {
  it('should return order items for a given order', async () => {
    // Insert test data into the orders and order_items tables
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test575@example.com', 'password575', 'Test User575', 'testuser575') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;
    const order_query = "INSERT INTO orders (user_id) VALUES ($1) RETURNING order_id";
    const order_res = await pool.query(order_query, [userId]);
    const order_id = order_res.rows[0].order_id;
    const order_item_query = "INSERT INTO order_item (order_id, product_id, quantity) VALUES ($1, 1, 2) RETURNING product_id";
    const order_item_res = await pool.query(order_item_query, [order_id]);
    const order_item_query1 = "INSERT INTO order_item (order_id, product_id, quantity) VALUES ($1, 2, 5) RETURNING product_id";
    const order_item_res1 = await pool.query(order_item_query1, [order_id]);

    const response = await request(app)
      .post('/get_order_items')
      .send({ order_id })
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
      // console.log(response.body)
    // expect(response.body[0].p.order_id).toBe(order_id)
    expect(response.body[0].quantity).toBe(2);
    expect(response.body[0].product_id).toBe(1);
    // expect(response.body[1].p.order_id).toBe(order_id)
    expect(response.body[1].quantity).toBe(5);
    expect(response.body[1].product_id).toBe(2);

    // Clean up the test data from the orders and order_items tables
    await pool.query('DELETE FROM order_item WHERE order_id = $1', [order_id]);
    await pool.query('DELETE FROM orders WHERE order_id = $1', [order_id]);
    await pool.query('DELETE FROM Users WHERE user_id = $1', [userId]);
  });

  it('should return an error if no order items are found for the order', async () => {
    const response = await request(app)
      .post('/get_order_items')
      .send({ order_id: 456 })
      .expect(404);

    expect(response.body.error).toBe('No order items found for this order');
  });

  // it('should return an error if there is a server error', async () => {
  //   // Simulate a server error by dropping the order_item table
  //   await pool.query('DROP TABLE order_item');

  //   const response = await request(app)
  //     .post('/get_order_items')
  //     .send({ order_id: 123 })
  //     .expect(500);

  //   expect(response.body.error).toBe('Internal server error');

  //   // Recreate the order_item table for subsequent tests
  //   await pool.query('CREATE TABLE order_item (order_id INTEGER, product_id INTEGER, quantity INTEGER)');
  // });
});
