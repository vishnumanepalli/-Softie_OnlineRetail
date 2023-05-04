const request = require("supertest");
const app = require("../index");
const pool = require("./db");

describe("Test GET /get_cartitems", () => {
it("should return status 200 and cart items details when a valid user_id is provided", async () => {
const res = await request(app)
.post("/get_cartitems")
.send({ user_id: 1 });
expect(res.status).toEqual(200);
expect(res.body.length).toBeGreaterThan(0);
expect(res.body[0]).toHaveProperty("quantity");
expect(res.body[0]).toHaveProperty("product_id");
expect(res.body[0]).toHaveProperty("name");
expect(res.body[0]).toHaveProperty("price");
});

it("should return status 404 and error message when an invalid user_id is provided", async () => {
const res = await request(app)
.post("/get_cartitems")
.send({ user_id: 999 });
expect(res.status).toEqual(404);
expect(res.body).toHaveProperty("error", "Cart not found");
});

it("should return status 500 and error message when an error occurs in the server", async () => {
jest.spyOn(pool, "query").mockImplementation(() => {
throw new Error("Server error");
});
const res = await request(app)
  .post("/get_cartitems")
  .send({ user_id: 1 });
expect(res.status).toEqual(500);
expect(res.body).toHaveProperty("error", "Internal server error");
});
});