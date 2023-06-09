const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /get_s_user', () => {
  it('should return the correct user data for a given user ID', async () => {
    const userRes = await pool.query(
        "INSERT INTO Users (email, password, fullname, username) VALUES ('test577@example.com', 'password577', 'Test User577', 'testuser577') RETURNING user_id"
      );
    const userId = userRes.rows[0].user_id;
     const response = await request(app)
      .post('/get_s_user')
      .send({ user_id: userId })
      .expect(200);

    //check if the response contains the expected user data
    expect(response.body).toHaveLength(1);
    expect(response.body[0].user_id).toEqual(userId);
    const clean2 = await pool.query(
        "DELETE  FROM Users where user_id = $1",[userId]
    );
    // you can add more assertions here to check other properties of the user object if needed
  });

//   it('should handle errors properly', async () => {
//     // simulate an error by passing an invalid user ID
//     const response = await request(app)
//       .post('/get_s_user')
//       .send({ user_id: 'invalid_id' })
//       .expect(500);

//     //check if the response contains the expected error message
//     expect(response.body).toHaveProperty('error', 'Internal server error');
//   });
});
