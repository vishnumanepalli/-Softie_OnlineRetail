const request = require('supertest');
const app = require('../index');
const pool = require('./db');

describe('POST /update_user', () => {
  let userId;

  beforeAll(async () => {
    // create a test user for updating
    const userRes = await pool.query(
      "INSERT INTO Users (email, password, fullname, username) VALUES ('test579@example.com', 'password579', 'Test User579', 'testuser579') RETURNING user_id"
    );
    userId = userRes.rows[0].user_id;
  });

  afterAll(async () => {
    // delete the test user after the tests complete
    await pool.query("DELETE FROM Users WHERE user_id = $1", [userId]);
  });

  it('should update the user with the given user ID', async () => {
    const updatedUser = {
      user_id: userId,
      username: 'newusername',
      address: 'newaddress',
      city: 'newcity',
      state: 'newstate',
      country: 'newcountry',
      password: 'newpassword'
    };

    const response = await request(app)
      .post('/update_user')
      .send(updatedUser)
      .expect(200);

    // check if the response contains the updated user data
    expect(response.body).toHaveLength(1);
    expect(response.body[0].user_id).toEqual(userId);
    expect(response.body[0].username).toEqual(updatedUser.username);
    expect(response.body[0].address).toEqual(updatedUser.address);
    expect(response.body[0].city).toEqual(updatedUser.city);
    expect(response.body[0].state).toEqual(updatedUser.state);
    expect(response.body[0].country).toEqual(updatedUser.country);
    expect(response.body[0].password).toEqual(updatedUser.password);
  });
});
