/* eslint-disable no-undef */
const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const userService = require('../services/user.service');

const adminEmail = `admin${Date.now()}@gmail.com`;
let password = 'password';

describe('Server', () => {
  beforeAll(done => {
    const adminUserData = {
      email: adminEmail,
      firstName: 'firstName',
      lastName: 'lastName',
      jobRole: 'admin',
      password,
    };
    password = 'password';
    userService
      .createUser(adminUserData)
      .then(() => {
        done();
      })
      .catch(() => { });
  });

  describe('POST /auth/signin', () => {
    const data = {};
    const postData = {
      email: adminEmail,
      password,
    };

    beforeEach(done => {
      axios
        .post(`${apiBase}/auth/signin`, postData)
        .then(response => {
          data.body = response.data;
          data.status = response.status;
          done();
        })
        .catch(() => {});
    });
    it('should have a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it("should have a body with status of 'success'", () => {
      expect(data.body.status).toBe('success');
    });
    it('should have a body with token', () => {
      expect(data.body.data.token).toBeDefined();
    });
    it('should have a body with a userId', () => {
      expect(data.body.data.userId).toBeDefined();
    });
  });
});
