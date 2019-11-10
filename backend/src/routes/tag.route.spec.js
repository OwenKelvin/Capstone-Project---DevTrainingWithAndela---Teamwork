/* eslint-disable no-undef */
const Axios = require('axios');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { TagService } = require('../services/tag.service');
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
  describe('PATCH /tags', () => {
    describe('by an admin', () => {
      let token;
      const data = {};
      let tagId;
      beforeAll(done => {
        const tagData = {
          name: `tagName${Math.random() * 100}`,
        };
        TagService.createTag(tagData)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => done());
      });
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
        Axios.patch(`${apiBase}/tags/${tagId}`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .finally(() => done());
      });

      it('should return status code 202', () => {
        expect(data.status).toBe(202);
      });
    });
    describe('by a non admin', () => {
      let token;
      const data = {};
      let tagId;
      beforeAll(done => {
        const tagData = {
          name: `tagName${Math.random() * 100}`,
        };
        TagService.createTag(tagData)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => done());
      });
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'employee',
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
        Axios.patch(`${apiBase}/tags/${tagId}`, postData, config)
          .catch(e => {
            data.status = e.response.status;
          })
          .finally(() => done());
      });

      it('should return status code 202', () => {
        expect(data.status).toBe(401);
      });
    });
  });
  describe('DELETE /tags', () => {
    describe('by an admin', () => {
      let token;
      const data = {};
      let tagId;
      beforeAll(done => {
        const tagData = {
          name: `tagName${Math.random() * 100}`,
        };
        TagService.createTag(tagData)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => done());
      });
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
        Axios.delete(`${apiBase}/tags/${tagId}`, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .finally(() => done());
      });

      it('should return status code 202', () => {
        expect(data.status).toBe(202);
      });
    });
    describe('by a non admin', () => {
      let token;
      const data = {};
      let tagId;
      beforeAll(done => {
        const tagData = {
          name: `tagName${Math.random() * 100}`,
        };
        TagService.createTag(tagData)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => done());
      });
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'employee',
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
        Axios.delete(`${apiBase}/tags/${tagId}`, config)
          .catch(e => {
            data.status = e.response.status;
          })
          .finally(() => done());
      });

      it('should return status code 202', () => {
        expect(data.status).toBe(401);
      });
    });
  });
});
