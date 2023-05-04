const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /emptycart', () => {
  it('should create a new order, move cart items to order items, and delete cart items for a given user ID', async () => {
    const userRes = await pool.query(
      "INSERT INTO users (email, password, fullname, username) VALUES ('test566@example.com', 'password566', 'Test User566', 'testuser566') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;
    
    const productRes = await pool.query(
        "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('104', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id, qt"
    );
    const productId = productRes.rows[0].product_id;
    const i_qt = productRes.rows[0].qt;
    const cartItemRes = await pool.query(
      "INSERT INTO cartItems (user_id, product_id, quantity) VALUES ($1, $2, 3)",
      [userId, productId]
    );

    const response = await request(app)
      .post('/emptycart')
      .send({ user_id: userId })
      .expect(200);

    // check if order was created
    const orderRes = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1",
      [userId]
    );
    expect(orderRes.rows.length).toEqual(1);
    const orderId = orderRes.rows[0].order_id;

    // check if cart items were moved to order items
    const orderItemRes = await pool.query(
      "SELECT * FROM order_item WHERE order_id = $1 AND product_id = $2",
      [orderId, productId]
    );
    expect(orderItemRes.rows.length).toEqual(1);
    expect(orderItemRes.rows[0].quantity).toEqual(3);

    // check if product quantity was updated
    const productRes2 = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [productId]
    );
    expect(productRes2.rows[0].qt).toEqual(i_qt - 3);

    // check if cart items were deleted
    const cartItemRes2 = await pool.query(
      "SELECT * FROM cartItems WHERE user_id = $1",
      [userId]
    );
    expect(cartItemRes2.rows.length).toEqual(0);

    const deleteOrderItemRes = await pool.query(
        "DELETE FROM order_item WHERE order_id = $1",
        [orderId]
      );
    // clean up test data
    const deleteOrderRes = await pool.query(
      "DELETE FROM orders WHERE order_id = $1",
      [orderId]
    );
    const deleteProductRes = await pool.query(
      "DELETE FROM products WHERE product_id = $1",
      [productId]
    );
    const deleteUserRes = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [userId]
    );
  });
});
