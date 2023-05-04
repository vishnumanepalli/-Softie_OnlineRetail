const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /decrease_cart_item_quantity', () => {
  
  it('should decrease the quantity of a product in the user\'s cart', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test567@example.com', 'password567', 'Test User567', 'testuser567') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
      
      const productRes = await pool.query(
          "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('105', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
        );
        const productId = productRes.rows[0].product_id;
      
      // Add the product to the user's cart with an initial quantity of 2
      await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, $2, 2)",
        [userId, productId]
      );
      const initialQuantity = 2;
    const response = await request(app)
      .post('/decrease_cart_item_quantity')
      .send({ user_id: userId, productId: productId })
      .expect(200);

    expect(response.body).toEqual({ success: "Product quantity decreased in cart" });
    
    const updatedCartItem = await pool.query(
      "SELECT * FROM CartItems WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    
    expect(updatedCartItem.rows.length).toEqual(1);
    expect(updatedCartItem.rows[0].quantity).toEqual(initialQuantity - 1);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1 AND product_id = $2", [userId, productId]);
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM Products WHERE product_id = $1", [productId]);
  });
  
  it('should remove the product from the user\'s cart if its quantity is 1', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test568@example.com', 'password568', 'Test User568', 'testuser568') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
      
      const productRes = await pool.query(
          "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('106', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
        );
        const productId = productRes.rows[0].product_id;
      
      // Add the product to the user's cart with an initial quantity of 2
      await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, $2, 1)",
        [userId, productId]
      );
    const response = await request(app)
      .post('/decrease_cart_item_quantity')
      .send({ user_id: userId, productId: productId })
      .expect(200);

    expect(response.body).toEqual({ success: "Product removed from cart" });
    
    const deletedCartItem = await pool.query(
      "SELECT * FROM CartItems WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    
    expect(deletedCartItem.rows.length).toEqual(0);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1 AND product_id = $2", [userId, productId]);
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM Products WHERE product_id = $1", [productId]);
  });
  
  it('should return a 404 error if the product is not in the user\'s cart', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test569@example.com', 'password569', 'Test User569', 'testuser569') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
    const fakeProductId = 9999; // an ID that doesn't exist in the database
    const response = await request(app)
      .post('/decrease_cart_item_quantity')
      .send({ user_id: userId, productId: fakeProductId })
      .expect(404);

    expect(response.body).toEqual({ error: "Product not found in cart" });
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
  });
});
