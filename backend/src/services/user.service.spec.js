/* eslint-disable no-undef */

const { UserService } = require('./user.service');

describe('USER SERVICE: ', () => {
  let userId;
  const email = `email${Math.random() * 1000}@gmail.com`;
  let userEmail;
  data = {};
  beforeAll(done => {
    const userPassword = String(Math.random());
    const data = {
      firstName: `firtName${Math.random() * 100}`,
      lastName: `lastName${Math.random() * 100}`,
      email,
      password: userPassword,
      jobRole: 'admin',
    };
    UserService.createUser(data).then(res => {
      userId = res.id;
      done();
    });
  });
  beforeAll(done => {
    UserService.getUserById(userId).then(user => {
      userEmail = user.email;
      done();
    });
  });
  describe('Function getUserById', () => {
    it('should return an object containing email', () => {
      expect(userEmail).toBe(email);
    });
  });
});
