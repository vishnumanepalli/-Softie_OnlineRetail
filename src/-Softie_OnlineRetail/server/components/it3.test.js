const request = require('supertest');
const app = require('../index'); 
const pool = require('./db');
const bcrypt = require('bcrypt');

describe('POST /login', () => {
  
    it('should be able to log in an existing user with correct credentials', async () => {
        const password = await bcrypt.hash('password', 10);
        await pool.query('INSERT INTO Users (email, password, fullname, username) VALUES ($1, $2, $3, $4)', ['test695@nana.com', password, 'Test User695', 'testuse2r695']);
    const user = {
        email: 'test695@nana.com',
        password: 'password',
    };
      const response = await request(app)
        .post('/login')
        .send(user)
        .expect(200);
    // 
      expect(response.body.user.user_id).toBeTruthy();
      expect(response.body.user.fullname).toBe('Test User695');
      expect(response.body.user.username).toBe('testuse2r695');
      await pool.query('DELETE FROM Users where email = $1',[user.email]);
    });
});