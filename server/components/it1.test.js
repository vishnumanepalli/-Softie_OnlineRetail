const request = require('supertest');
const app = require('../index'); 
const pool = require('./db');
const bcrypt = require('bcrypt');

describe('POST /signup', () => {
  it('should be able to create a new user', async () => {
    //await pool.query('DELETE FROM Users');
    const user = {
      email: 'test690@example.com',
      password: 'password690',
      fullname: 'Test User690',
      username: 'testuser690',
    };
    const response = await request(app)
      .post('/signup')
      .send(user)
      .expect(201);
    
    expect(response.body.user.user_id).toBeTruthy();
    expect(response.body.user.fullname).toBe(user.fullname);
    expect(response.body.user.username).toBe(user.username);
    expect(response.body.user.email).toBe(user.email);
    console.log(response.body.user.email);

    // const dbUser = await pool.query('SELECT * FROM Users WHERE email = $1', [user.email]);
    // expect(dbUser.rows.length).toBe(1);
    // expect(dbUser.rows[0].email).toBe(user.email);
    // expect(await bcrypt.compare(user.password, dbUser.rows[0].password)).toBe(true);
    await pool.query('DELETE FROM Users where username = $1',['testuser690']);
  });


  it('should return an error if a required field is missing', async () => {
    //await pool.query('DELETE FROM Users');
    const user = {
      email: 'test691@example.com',
      fullname: 'Test User691',
      username: 'testuser691',
    };
    const response = await request(app)
      .post('/signup')
      .send(user)
      .expect(401);
    expect(response.body.message).toBe('This fields required');
  });

  it('should return an error if the email is already taken', async () => {
    const user = {
      email: 'test692@example.com',
      password: 'password692',
      fullname: 'Test User692',
      username: 'testuser692',
    };
    await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', [user.email, await bcrypt.hash(user.password, 10), user.fullname, user.username]);
    const response = await request(app)
      .post('/signup')
      .send(user)
      .expect(401);
    expect(response.body.message).toBe('email taken already');
    await pool.query('DELETE FROM Users where email = $1',[user.email]);
    
  });

  it('should return an error if the username is already taken', async () => {
    //await pool.query('DELETE FROM Users');
    const user = {
      email: 'test693@example.com',
      password: 'password693',
      fullname: 'Test User693',
      username: 'testuser693',
    };
    await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', [user.email, await bcrypt.hash(user.password, 10), user.fullname, user.username]);
    const user2 = {
        email: 'test992@example.com',
        password: 'password693',
        fullname: 'Test User693',
        username: 'testuser693',
      };
    const response = await request(app)
      .post('/signup')
      .send(user2)
      .expect(401);
    expect(response.body.message).toBe('username taken already');
    await pool.query('DELETE FROM Users where email = $1',[user.email]);
  });
});