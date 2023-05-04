const request = require('supertest');
const app = require('../index');
const pool = require('./db');

// beforeAll(async () => {
//   await pool.query('DELETE FROM Products');
// });

afterAll(async () => {
  await pool.end();
});

describe('POST /get_products', () => {
  it('should return all products if searchText is empty', async () => {
    const response = await request(app)
      .post('/get_products')
      .send({ searchText: '' })
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return matching products if searchText is not empty', async () => {
    const a1 = await pool.query("INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('456', 'test', 'This is an existing product', 30, 'https://example.com/existing-product.jpg', 5, 'Existing Category') RETURNING product_id");
    const a2 = await pool.query("INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('457', 'Existing Product', 'This is an existing test product', 30, 'https://example.com/existing-product.jpg', 5, 'Existing Category') RETURNING product_id");
    const a3 = await pool.query("INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('458', 'Existing Product', 'This is an existing product', 30, 'https://example.com/existing-product.jpg', 5, 'Existing test Category') RETURNING product_id");

    const response = await request(app)
      .post('/get_products')
      .send({ searchText: 'test' })
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);

    
    response.body.forEach(product => {
        expect(
            product.name.toLowerCase().includes('test') ||
            product.description.toLowerCase().includes('test') ||
            product.category.toLowerCase().includes('test')
          ).toBeTruthy();          
      });
      
    await pool.query('DELETE FROM Products where product_id = 456');
    await pool.query('DELETE FROM Products where product_id = 457');
    await pool.query('DELETE FROM Products where product_id = 458');
  });

//   it('should return an error if there is a server error', async () => {
//     // Simulate a server error by dropping the Products table
//     await pool.query('DROP TABLE Products');

//     const response = await request(app)
//       .post('/get_products')
//       .send({ searchText: 'test' })
//       .expect(500);

//     expect(response.text).toBe('Server error');

//     // Recreate the Products table for subsequent tests
//     await pool.query('CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price INTEGER, image_url VARCHAR(255), qt INTEGER, category VARCHAR(255))');
//   });
});
