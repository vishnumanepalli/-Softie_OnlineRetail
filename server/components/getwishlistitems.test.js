const request = require("supertest");
const app = require("../index");
const pool = require("./db");

describe("GET /get_wishlist", () => {

  it("returns wishlist items when user has items in their wishlist", async () => {
    // insert a product and a wishlist item for the user
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test578@example.com', 'password578', 'Test User578', 'testuser578') RETURNING user_id"
      );
      const userId = userRes.rows[0].user_id;
    const productRes = await pool.query(
        "INSERT INTO Products (product_id, name, description, price, image_url, qt, category) VALUES ('112', 'Test Product', 'This is a test product', 50, 'https://i.ibb.co/TB3vQy2/Wasabi-Paste.jpg', 40, 'Clothing') RETURNING product_id"
      );
    const productId = productRes.rows[0].product_id;
    
    await pool.query(
        "INSERT INTO Wishlists (user_id, product_id) VALUES ($1, $2)",
        [userId, productId]
    );

    const response = await request(app).post("/get_wishlist").send({
      userId: userId,
    });
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("product_id", 112);
    const clean = await pool.query(
        "DELETE  FROM Wishlists where user_id = $1",[userId]
      );
    const clean1 = await pool.query(
        "DELETE  FROM Products where product_id = $1",[112]
    );
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
  });

//   it("returns an error when there's an internal server error", async () => {
//     // temporarily drop the products table to cause an internal server error
//     await pool.query("DROP TABLE Products");

//     const response = await request(app).post("/get_wishlist").send({
//       userId: 1,
//     });
//     expect(response.status).toBe(500);
//     expect(response.body).toHaveProperty("error", "Internal server error");

//     // recreate the products table for future tests
//     await pool.query("CREATE TABLE Products (product_id SERIAL PRIMARY KEY, name VARCHAR(255), price NUMERIC)");
//   });
});
