const request = require('supertest');
const app = require('../index'); 
const pool = require('./db');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await pool.query('DELETE FROM Users');
});

afterAll(async () => {
  await pool.end();
});

describe('POST /signup', () => {
  it('should be able to create a new user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password',
      fullname: 'Test User',
      username: 'testuser',
    };
    const response = await request(app)
      .post('/signup')
      .send(user)
      .expect(201);
    
    expect(response.body.user.user_id).toBeTruthy();
    expect(response.body.user.fullname).toBe(user.fullname);
    expect(response.body.user.username).toBe(user.username);
    expect(response.body.user.email).toBe(user.email);

    const dbUser = await pool.query('SELECT * FROM Users WHERE email = $1', [user.email]);
    expect(dbUser.rows.length).toBe(1);
    expect(dbUser.rows[0].email).toBe(user.email);
    expect(await bcrypt.compare(user.password, dbUser.rows[0].password)).toBe(true);
  });


  it('should return an error if a required field is missing', async () => {
    const user = {
      email: 'test@example.com',
      fullname: 'Test User',
      username: 'testuser',
    };
    const response = await request(app)
      .post('/signup')
      .send(user)
      .expect(401);
    expect(response.body.message).toBe('This fields required');
  });

  // it('should return an error if the email is already taken', async () => {
  //   const user = {
  //     email: 'test@example.com',
  //     password: 'password',
  //     fullname: 'Test User',
  //     username: 'testuser',
  //   };
  //   await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', [user.email, await bcrypt.hash(user.password, 10), user.fullname, user.username]);
  //   const response = await request(app)
  //     .post('/signup')
  //     .send(user)
  //     .expect(401);
  //   expect(response.body.message).toBe('email taken already');
  // });

  // it('should return an error if the username is already taken', async () => {
  //   const user = {
  //     email: 'test@example.com',
  //     password: 'password',
  //     fullname: 'Test User',
  //     username: 'testuser',
  //   };
  //   await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', [user.email, await bcrypt.hash(user.password, 10), user.fullname, user.username]);
  //   const response = await request(app)
  //     .post('/signup')
  //     .send({ ...user, email: 'test2@example.com' })
  //     .expect(401);
  //   expect(response.body.message).toBe('username taken already');
  // });

  // it('should return an error if input validation fails', async () => {
  //   const user = {
  //     email: 'invalid-email',
  //     password: 'short',
  //     fullname: 'Test User',
  //     username: 'testuser',
  //   };
  //   const response = await request(app)
  //     .post('/signup')
  //     .send(user)
  //     .expect(401);
  //   expect(response.body.message).toBe('Input validation error');
  // });
});
