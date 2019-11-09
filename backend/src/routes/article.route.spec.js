/* eslint-disable no-undef */

const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { ArticleService } = require('../services/article.service');

describe('ARTICLES ROUTE: ', () => {
  describe('POST /articles', () => {
    describe('By an authenticated user', () => {
      let token;
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
          done();
        });
      });
      const data = { data: null };
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const postData = {
          title: 'Some article title',
          article: 'Some article body',
        };
        axios
          .post(`${apiBase}/articles`, postData, config)
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
      it('should have a body with status as "success"', () => {
        expect(data.body.status).toBe('success');
      });
    });
    describe('By an Unauthenticated user', () => {
      const data = { data: null };
      beforeAll(done => {
        const postData = {
          title: 'Some article title',
          article: 'Some article body',
        };
        axios
          .post(`${apiBase}/articles`, postData)
          .then(response => {
            data.status = response.status;
          })
          .catch(e => {
            data.status = e.response.status;
          })
          .finally(() => done());
      });
      it('should retutn status code of 401 (Unauthoried)', () => {
        expect(data.status).toBe(401);
      });
    });
  });
  describe('PATCH /articles', () => {
    let articleId;
    describe('By an authenticated user', () => {
      let token;
      let userId;
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
        ArticleService.createArticle(
          { title: 'Some Title', article: 'article' },
          userId,
        ).then(response => {
          articleId = response.id;
          done();
        });
      });
      const data = { data: null };
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const postData = {
          title: 'Some article title',
          article: 'Some article body',
        };
        axios
          .patch(`${apiBase}/articles/${articleId}`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .finally(() => done());
      });
      it('should have a status code of 202', () => {
        expect(data.status).toBe(202);
      });
      it('should return object with id', () => {
        expect(data.body.data.id).toBeDefined();
      });
      it('should have a body with status as "success"', () => {
        expect(data.body.status).toBe('success');
      });
    });
    describe('By an Unauthenticated user', () => {
      const data = { data: null };
      beforeAll(done => {
        const postData = {
          title: 'Some article title',
          article: 'Some article body',
        };
        axios
          .patch(`${apiBase}/articles/${articleId}`, postData)
          .then(response => {
            data.status = response.status;
          })
          .catch(e => {
            data.status = e.response.status;
          })
          .finally(() => done());
      });
      it('should retutn status code of 401 (Unauthoried)', () => {
        expect(data.status).toBe(401);
      });
    });
  });
  describe('DELETE /articles', () => {
    let articleId;
    let userId;
    let token;
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
    describe('By an authenticated user', () => {
      beforeAll(done => {
        ArticleService.createArticle(
          { title: 'Some Title', article: 'article' },
          userId,
        ).then(response => {
          articleId = response.id;
          done();
        });
      });

      const data = { data: null };
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        axios
          .delete(`${apiBase}/articles/${articleId}`, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .catch(() => {})
          .finally(() => done());
      });
      it('should have a status code of 202', () => {
        expect(data.status).toBe(202);
      });
      it('should have a body with status as "success"', () => {
        expect(data.body.status).toBe('success');
      });
    });
    describe('By an Unauthenticated user', () => {
      beforeAll(done => {
        ArticleService.createArticle(
          { title: 'Some Title', article: 'article' },
          userId,
        ).then(response => {
          articleId = response.id;
          done();
        });
      });
      const data = { data: null };
      beforeAll(done => {
        const postData = {
          title: 'Some article title',
          article: 'Some article body',
        };
        axios
          .delete(`${apiBase}/articles/${articleId}`, postData)
          .then(response => {
            data.status = response.status;
          })
          .catch(e => {
            data.status = e.response.status;
          })
          .finally(() => done());
      });
      it('should retutn status code of 401 (Unauthoried)', () => {
        expect(data.status).toBe(401);
      });
    });
  });
});
