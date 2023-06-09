const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('GET /get_cartitems', () => {
  it('should get the items in the cart', async () => {
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test573@example.com', 'password573', 'Test User573', 'testuser573') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const addToCart = await pool.query(
      "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 2)",
      [userId]
    );

    const response = await request(app)
      .post('/get_cartitems')
      .send({
        user_id: userId,
      });
      console.log(response.body)
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    // expect(response.body[0].user_id).toBe(userId);
    expect(response.body[0].product_id).toBe(1);
    expect(response.body[0].quantity).toBe(2);

    const clean = await pool.query(
      "DELETE FROM CartItems WHERE user_id = $1",
      [userId]
    );

    const clean2 = await pool.query(
      "DELETE FROM Users WHERE user_id = $1",
      [userId]
    );
  });

  it('should return a 404 error if the cart is empty', async () => {
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test574@example.com', 'password574', 'Test User574', 'testuser574') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const response = await request(app)
      .post('/get_cartitems')
      .send({
        user_id: userId,
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Cart not found');

    const clean = await pool.query(
      "DELETE FROM Users WHERE user_id = $1",
      [userId]
    );
  });
});
