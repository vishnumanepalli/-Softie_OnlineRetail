const request = require('supertest');
const app = require('../index'); 
const pool = require('./db');
const bcrypt = require('bcrypt');

describe('POST /login', () => {
    beforeAll(async () => {
      // Create a user for testing
      const password = await bcrypt.hash('password', 10);
      await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', ['test@example.com', password, 'Test User', 'testuser']);
    });
  
    afterAll(async () => {
      await pool.query('DELETE FROM Users');
    });
  
    it('should be able to log in an existing user with correct credentials', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password',
      };
      const response = await request(app)
        .post('/login')
        .send(user)
        .expect(200);
      
      expect(response.body.user.user_id).toBeTruthy();
      expect(response.body.user.fullname).toBe('Test User');
      expect(response.body.user.username).toBe('testuser');
    });
});