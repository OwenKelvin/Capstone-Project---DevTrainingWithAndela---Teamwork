/* eslint-disable no-undef */
const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');

const adminEmail = `admin${Date.now()}@gmail.com`;
let password = 'password';

describe('AUTH ROUTE: ', () => {
  beforeAll(done => {
    const adminUserData = {
      email: adminEmail,
      firstName: 'firstName',
      lastName: 'lastName',
      jobRole: 'admin',
      password,
    };
    password = 'password';
    UserService.createUser(adminUserData)
      .then(() => {
        done();
      })
      .catch(() => {});
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

describe('AUTH ROUTE: ', () => {
  describe('POST /auth/create-user', () => {
    let token;
    describe('By an admin user', () => {
      const userPassword = String(Math.random());
      const email = `email${Math.random() * 1000}@gmail.com`;
      beforeAll(done => {
        const data = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email,
          password: userPassword,
          jobRole: 'admin',
        };
        UserService.createUser(data).then(res => {
          token = res;
          token = AuthService.tokenForUSer({ id: res.id });
          done();
        });
      });
      const data = {};
      const employeeEmail = `employee${Date.now()}@gmail.com`;
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const postData = {
          email: employeeEmail,
          firstName: 'firstName',
          lastName: 'lastName',
          jobRole: 'employee',
          password,
        };
        axios
          .post(`${apiBase}/auth/create-user`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .catch(() => {})
          .finally(() => done());
      });
      it('should have a status code of 201', () => {
        expect(data.status).toBe(201);
      });
      it('should return object with id', () => {
        expect(data.body.data.id).toBeDefined();
      });
      it('should return object with correct email', () => {
        expect(data.body.data.email).toBe(employeeEmail);
      });
      it('should have a body with status as "success"', () => {
        expect(data.body.status).toBe('success');
      });
    });
    describe('By a non admin user', () => {
      const userPassword = String(Math.random());
      const email = `email${Math.random() * 1000}@gmail.com`;
      beforeAll(done => {
        const data = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email,
          password: userPassword,
          jobRole: 'employee',
        };
        UserService.createUser(data).then(res => {
          token = res;
          token = AuthService.tokenForUSer({ id: res.id });
          done();
        });
      });
      const data = {};
      const employeeEmail = `employee${Date.now()}@gmail.com`;
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const postData = {
          email: employeeEmail,
          firstName: 'firstName',
          lastName: 'lastName',
          jobRole: 'employee',
          password,
        };
        axios
          .post(`${apiBase}/auth/create-user`, postData, config)
          .then(response => {
            data.status = response.status;
          })
          .catch(error => {
            data.status = error.response.status;
          })
          .finally(() => done());
      });
      it('should have a status code of 401', () => {
        expect(data.status).toBe(401);
      });
    });
  });
});
