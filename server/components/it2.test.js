const request = require('supertest');
const app = require('../index'); // or wherever your express app is located
const { getUserByEmailDb, createUserDb } = require('./helper');
const { OAuth2Client } = require('google-auth-library');
const pool = require('./db');

describe('POST /googleLogin', () => {

  it('should create a new user if the user does not exist', async () => {
    global.getUserByEmailDb = jest.fn();

    var createUserDbMock = jest.fn().mockResolvedValue(null);
    global.createUserDb = createUserDbMock;

    const mockUser = {
      email: 'test694@example.com',
      name: 'Test User694',
    };

    const mockToken = 'mock_token';

    // Mock the verifyIdToken method to return the mock user's email and name
    OAuth2Client.prototype.verifyIdToken = jest.fn().mockResolvedValue({
      getPayload: () => mockUser,
    });

    // Mock the getUserByEmailDb function to return null, indicating that the user does not exist in the database
    global.getUserByEmailDb.mockResolvedValue(null);

    const res = await request(app)
      .post('/googleLogin')
      .send({ token: mockToken });

    expect(res.status).toBe(200);
    console.log(res.status);
    expect(res.body.user.email).toEqual(mockUser.email);

    OAuth2Client.prototype.verifyIdToken.mockRestore();
    global.getUserByEmailDb.mockRestore();
    const a = mockUser.email;
    console.log(a);
    await pool.query('DELETE FROM Users where email = $1',[a]);
    console.log("1");

    createUserDbMock = jest.fn().mockResolvedValue(null);
    global.createUserDb = createUserDbMock;

    delete global.getUserByEmailDb;

  });

//   afterAll(() => {
//     delete global.getUserByEmailDb;
//   });
});