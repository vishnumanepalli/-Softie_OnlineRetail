const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('DELETE /delete_from_cart', () => {
  let user_id, product_id;

//   beforeEach(async () => {
//     // Create a user and add a product to their cart
//     const userRes = await pool.query(
//       "INSERT INTO Users (email, password, fullname, username) VALUES ('test570@example.com', 'password570', 'Test User570', 'testuser570') RETURNING user_id"
//     );
//     user_id = userRes.rows[0].user_id;
//     const cartRes = await pool.query(
//       "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) RETURNING *",
//       [user_id]
//     );
//   });

//   afterEach(async () => {
//     // Delete the user and product created in beforeEach
//     await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
//     await pool.query("DELETE FROM Products WHERE product_id = $1", [1]);
//   });

  it('should remove a product from the cart', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test570@example.com', 'password570', 'Test User570', 'testuser570') RETURNING user_id"
      );
      user_id = userRes.rows[0].user_id;
      const cartRes1 = await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) RETURNING *",
        [user_id]
      );
    const response = await request(app)
      .delete('/delete_from_cart')
      .send({ user_id, productId: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe('Product removed from cart');
    const cartRes = await pool.query(
      "SELECT * FROM CartItems WHERE user_id = $1 AND product_id = 1",
      [user_id]
    );
    expect(cartRes.rows.length).toBe(0);
    await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1", [user_id]);
    // await pool.query("DELETE FROM Products WHERE product_id = $1", [1]);
  });

  it('should return an error if the product is not in the cart', async () => {
    // Create a user and add a product to their cart
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test597@example.com', 'password597', 'Test User597', 'testuser597') RETURNING user_id"
      );
      user_id = userRes.rows[0].user_id;
      const cartRes = await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) RETURNING *",
        [user_id]
      );
    const response = await request(app)
      .delete('/delete_from_cart')
      .send({ user_id, productId: 999 }); // a non-existent product ID
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Product not found in cart');
    await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1", [user_id]);
    // await pool.query("DELETE FROM Products WHERE product_id = $1", [1]);
  });

  it('should return an error if the user ID is not valid', async () => {
    // Create a user and add a product to their cart
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test599@example.com', 'password599', 'Test User599', 'testuser599') RETURNING user_id"
      );
      user_id = userRes.rows[0].user_id;
      const cartRes = await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) RETURNING *",
        [user_id]
      );
    const response = await request(app)
      .delete('/delete_from_cart')
      .send({ user_id: 'invalid', productId: product_id });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Internal server error');
    await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1", [user_id]);
    // await pool.query("DELETE FROM Products WHERE product_id = $1", [1]);
  });

  it('should return an error if the product ID is not valid', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test598@example.com', 'password598', 'Test User598', 'testuser598') RETURNING user_id"
      );
      user_id = userRes.rows[0].user_id;
      const cartRes = await pool.query(
        "INSERT INTO CartItems (user_id, product_id, quantity) VALUES ($1, 1, 1) RETURNING *",
        [user_id]
      );
    const response = await request(app)
      .delete('/delete_from_cart')
      .send({ user_id, productId: 'invalid' });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Internal server error');
    await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
    await pool.query("DELETE FROM CartItems WHERE user_id = $1", [user_id]);
    // await pool.query("DELETE FROM Products WHERE product_id = $1", [1]);
  });
});
