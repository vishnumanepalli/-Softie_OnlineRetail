const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('DELETE /delete_from_wishlist', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should delete a product from the user\'s wishlist', async () => {
    // Create a new user and product in the database
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test571@example.com', 'password571', 'Test User571', 'testuser571') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const productRes = await pool.query(
      "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('107', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
    );
    const productId = productRes.rows[0].product_id;

    // Add the product to the user's wishlist
    await pool.query(
      "INSERT INTO Wishlists (user_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    // Delete the product from the user's wishlist
    const response = await request(app)
      .delete('/delete_from_wishlist')
      .send({ userId, productId })
      .expect(200);

    expect(response.body.success).toBe('Product removed from wishlist');

    // Check that the product is not in the user's wishlist in the database
    const wishlistRes = await pool.query(
      "SELECT * FROM Wishlists WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    expect(wishlistRes.rows.length).toBe(0);

    // Clean up
    await pool.query("DELETE FROM Wishlists WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM Products WHERE product_id = $1", [productId]);
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
  });

  it('should return an error if the product is not in the user\'s wishlist', async () => {
    // Create a new user and product in the database
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test572@example.com', 'password572', 'Test User572', 'testuser572') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const productRes = await pool.query(
      "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('108', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
    );
    const productId = productRes.rows[0].product_id;

    // Delete the product from the user's wishlist
    const response = await request(app)
      .delete('/delete_from_wishlist')
      .send({ userId, productId })
      .expect(404);

    expect(response.body.error).toBe('Product not found in wishlist');

    // Clean up
    await pool.query("DELETE FROM Products WHERE product_id = $1", [productId]);
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
  });
})