const request = require('supertest');
const app = require('../index'); 
const pool = require('./db');

// beforeAll(async () => {
//   await pool.query('DELETE FROM Wishlists');
// });

afterAll(async () => {
  await pool.end();
});

describe('POST /add_to_wishlist', () => {
  it('should be able to add a product to the user\'s wishlist', async () => {
    // Create a new user and product in the database
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test563@example.com', 'password563', 'Test User563', 'testuser563') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const productRes = await pool.query(
      "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('102', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
    );
    const productId = productRes.rows[0].product_id;

    // Add the product to the user's wishlist
    const response = await request(app)
      .post('/add_to_wishlist')
      .send({ userId, productId })
      .expect(200);
    
    expect(response.body.message).toBe('Product added to wishlist');
    console.log(response.body.message)

    // Check that the product is in the user's wishlist in the database
    const wishlistRes = await pool.query(
      "SELECT * FROM Wishlists WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    expect(wishlistRes.rows.length).toBe(1);
    console.log(wishlistRes.rows.length)
    const clean = await pool.query(
        "DELETE  FROM Wishlists where user_id = $1",[userId]
      );
    const clean1 = await pool.query(
        "DELETE  FROM Products where product_id = $1",[102]
    );
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });

  it('should return an error if the product does not exist', async () => {
    // Create a new user in the database
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test564@example.com', 'password564', 'Test User564', 'testuser564') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    // Try to add a non-existent product to the user's wishlist
    const response = await request(app)
      .post('/add_to_wishlist')
      .send({ userId, productId: 999 })
      .expect(404);

    expect(response.body.error).toBe('Product not found');
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });

  it('should return an error if the product is already in the user\'s wishlist', async () => {
    // Create a new user and product in the database
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test565@example.com', 'password565', 'Test User565', 'testuser565') RETURNING user_id"
    );
    const userId = userRes.rows[0].user_id;

    const productRes = await pool.query(
        "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('103', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
        );
    const productId = productRes.rows[0].product_id;

    // Add the product to the user's wishlist
    await pool.query(
      "INSERT INTO Wishlists (user_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    // Try to add the product to the user's wishlist again
    const response = await request(app)
      .post('/add_to_wishlist')
      .send({ userId, productId })
      .expect(400);

    expect(response.body.error).toBe('Product already in wishlist');
    const clean = await pool.query(
        "DELETE  FROM Wishlists where user_id = $1",[userId]
      );
    const clean1 = await pool.query(
        "DELETE  FROM Products where product_id = $1",[103]
    );
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });
});
``
