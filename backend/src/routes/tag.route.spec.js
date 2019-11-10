/* eslint-disable no-undef */
const Axios = require('axios');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { apiBase } = require('../../config/env.config');

describe('TAGS ROUTE: ', () => {
  describe('POST /tags', () => {
    describe('by an admin', () => {
      let token;
      const data = {};
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'admin',
        };
        UserService.createUser(userData)
          .then(res => {
            token = res;
            token = AuthService.tokenForUSer({ id: res.id });
            userId = res.id;
          })
          .finally(() => done());
      });
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const postData = {
          name: `newTag${Math.random() * 10000}`,
        };
        Axios.post(`${apiBase}/tags`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .finally(() => done());
      });

      it('should return status code 201', () => {
        expect(data.status).toBe(201);
      });
    });
    describe('by a non admin', () => {
      let token;
      const data = {};
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'employee',
        };
        UserService.createUser(userData).then(res => {
          token = res;
          token = AuthService.tokenForUSer({ id: res.id });
          userId = res.id;
          done();
        });
      });
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const postData = {
          name: `newTag${Math.random() * 10000}`,
        };
        Axios.post(`${apiBase}/tags`, postData, config).catch(e => {
          data.status = e.response.status;
          done();
        });
      });

      it('should return status code 401', () => {
        expect(data.status).toBe(401);
      });
    });
  });
});
