const request = require('supertest');
const app = require('../index');
const pool = require('./db');

// beforeAll(async () => {
//   await pool.query('DELETE FROM Products');
// });

afterAll(async () => {
  await pool.end();
});

describe('POST /add_product', () => {
  it('should add a product to the database', async () => {
    const product = {
      product_id: 101,
      name: 'Test Product',
      description: 'This is a test product',
      price: 50,
      image_url: 'https://example.com/test-product.jpg',
      quantity: 10,
      category: 'Test Category'
    };

    const response = await request(app)
      .post('/add_product')
      .send(product)
      .expect(200);
    
    // expect(response.body).toMatchObject(product);

    const queryText = 'SELECT * FROM Products WHERE product_id = $1';
    const { rows } = await pool.query(queryText, [product.product_id]);
    expect(rows.length).toBe(1);
    // expect(rows[0]).toMatchObject(product);
    await pool.query('DELETE FROM Products where product_id = 101');
  });

  it('should return an error if a product with the same product_id already exists', async () => {
    const existingProduct = {
      product_id: 100,
      name: 'Existing Product',
      description: 'This is an existing product',
      price: 30,
      image_url: 'https://example.com/existing-product.jpg',
      qt: 5,
      category: 'Existing Category'
    };

    const a1 = await pool.query("INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('100', 'Existing Product', 'This is an existing product', 30, 'https://example.com/existing-product.jpg', 5, 'Existing Category') RETURNING product_id");

    const response = await request(app)
      .post('/add_product')
      .send(existingProduct)
      .expect(400);

    expect(response.body.error).toBe('There is another product for this product_id');

    const queryText = 'SELECT * FROM Products WHERE product_id = $1';
    const { rows } = await pool.query(queryText, [existingProduct.product_id]);
    expect(rows.length).toBe(1);
    expect(rows[0]).toMatchObject(existingProduct);
    await pool.query('DELETE FROM Products where product_id = 100');
  });

//   it('should return an error if there is a server error', async () => {
//     // Simulate a server error by dropping the Products table
//     await pool.query('DROP TABLE Products');

//     const product = {
//       product_id: 789,
//       name: 'Test Product',
//       description: 'This is a test product',
//       price: 50,
//       image_url: 'https://example.com/test-product.jpg',
//       quantity: 10,
//       category: 'Test Category'
//     };

//     const response = await request(app)
//       .post('/add_product')
//       .send(product)
//       .expect(500);

//     expect(response.text).toBe('Server error');

//     // Recreate the Products table for subsequent tests
//     await pool.query('CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price INTEGER, image_url VARCHAR(255), qt INTEGER, category VARCHAR(255))');
//   });
});
