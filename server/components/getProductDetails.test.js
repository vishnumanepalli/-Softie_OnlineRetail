const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /get_productdetails', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should return the details of the specified product', async () => {
    // Insert a test product into the database
    const insertRes = await pool.query(
      "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [111, 'Test Product', 'This is a test product', 10, 'http://example.com/image.jpg', 5, 'Test Category']
    );

    // Make a request to get the details of the test product
    const res = await request(app)
      .post('/get_productdetails')
      .send({ productId: 111 })
      .expect(200);

    // Verify that the response contains the expected product details
    expect(res.body.product_id).toEqual(111);
    expect(res.body.name).toEqual('Test Product');
    expect(res.body.description).toEqual('This is a test product');
    expect(res.body.price).toEqual(10);
    expect(res.body.image_url).toEqual('http://example.com/image.jpg');
    expect(res.body.qt).toEqual(5);
    expect(res.body.category).toEqual('Test Category');

    // Clean up the test product from the database
    const deleteRes = await pool.query(
      "DELETE FROM Products WHERE product_id = $1",
      [111]
    );
  });

  it('should return a 404 error if the product is not found', async () => {
    // Make a request to get the details of a nonexistent product
    const res = await request(app)
      .post('/get_productdetails')
      .send({ productId: 999 })
      .expect(404);

    // Verify that the response contains the expected error message
    expect(res.body.error).toEqual('Product not found');
  });

//   it('should return a 500 error if there is a server error', async () => {
//     // Simulate a server error by dropping the Products table
//     await pool.query('DROP TABLE Products');

//     // Make a request to get the details of a product
//     const res = await request(app)
//       .post('/get_productdetails')
//       .send({ productId: 1 })
//       .expect(500);

//     // Verify that the response contains the expected error message
//     expect(res.body.error).toEqual('Internal server error');

//     // Recreate the Products table for subsequent tests
//     await pool.query('CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price INTEGER, image_url VARCHAR(255), qt INTEGER, category VARCHAR(255))');
//   });
});
