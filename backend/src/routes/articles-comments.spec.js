/* eslint-disable no-undef */
const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { ArticleService } = require('../services/article.service');

describe('ARTICLE COMMENTS ROUTE: ', () => {
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
  beforeAll(done => {
    ArticleService.createArticle(
      { title: 'Some Title', article: 'article' },
      userId,
    ).then(response => {
      articleId = response.id;
      done();
    });
  });
  describe('By authenticated user', () => {
    beforeAll(done => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const postData = {
        comment: 'Some comment',
      };
      axios
        .post(`${apiBase}/articles/${articleId}/comment`, postData, config)
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
});
