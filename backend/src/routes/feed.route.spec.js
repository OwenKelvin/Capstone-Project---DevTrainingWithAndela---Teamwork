/* eslint-disable no-undef */

const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { ArticleService } = require('../services/article.service');

describe('FEED ROUTE: ', () => {
  describe('GET /feed', () => {
    describe('By authenticated user', () => {
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
        axios
          .get(`${apiBase}/feed`, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
          })
          .finally(() => done());
      });
      it('should have a status code of 200', () => {
        expect(data.status).toBe(200);
      });
    });
    describe('By an Unauthenticated user', () => {
      const data = { data: null };
      beforeAll(done => {
        axios
          .get(`${apiBase}/feed`)
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
