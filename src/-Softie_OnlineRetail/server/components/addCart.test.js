const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /cart', () => {

  it('should add a product to the cart', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test560@example.com', 'password460', 'Test User560', 'testuser460') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
    const response = await request(app)
      .post('/cart')
      .send({
        user_id: userId,
        product_id: 1,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].user_id).toBe(userId);
    expect(response.body[0].product_id).toBe(1);
    expect(response.body[0].quantity).toBe(1);
    const clean = await pool.query(
        "DELETE  FROM CartItems where user_id = $1",[userId]
      );
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });

  it('should update the quantity of a product in the cart', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test561@example.com', 'password561', 'Test User561', 'testuser561') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
      const addToCart = await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) returning *",[userId]
      );
    const response = await request(app)
      .post('/cart')
      .send({
        user_id: userId,
        product_id: 1,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].user_id).toBe(userId);
    expect(response.body[0].product_id).toBe(1);
    expect(response.body[0].quantity).toBe(2);
    const clean = await pool.query(
        "DELETE  FROM CartItems where user_id = $1",[userId]
      );
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });

  it('should not add a product to the cart if there is not enough quantity available', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test562@example.com', 'password562', 'Test User562', 'testuser562') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
      const productRes = await pool.query(
        "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('99', 'Test Product', 'This is a test product', 40, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 0, 'Clothing') RETURNING product_id"
        );
    const productId = productRes.rows[0].product_id;
    const response = await request(app)
      .post('/cart')
      .send({
        user_id: userId,
        product_id: productId,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Not enough quantity available');
    const clean2 = await pool.query(
        "DELETE  FROM Products where product_id = $1",[productId]
    );
    const clean1 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });
});
