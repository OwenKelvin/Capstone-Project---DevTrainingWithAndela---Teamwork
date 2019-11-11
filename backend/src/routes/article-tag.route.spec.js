/* eslint-disable no-undef */

const axios = require('axios');
const { apiBase } = require('../../config/env.config');
const { UserService } = require('../services/user.service');
const { AuthService } = require('../services/auth.service');
const { ArticleService } = require('../services/article.service');
const { TagService } = require('../services/tag.service');
const { ArticleTagService } = require('../services/article-tag.service');

describe('ARTICLE TAGS: ', () => {
  describe('POST /articles/:articleId/tags', () => {
    describe('By Article Creator', () => {
      let token;
      let userId;
      let articleId;
      let tagId;
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'employee',
        };
        UserService.createUser(userData).then(res => {
          userId = res.id;
          token = AuthService.tokenForUSer({ id: res.id });
          done();
        });
      });
      const data = { data: null };
      beforeAll(done => {
        ArticleService.createArticle(
          { title: 'tile', article: 'article' },
          userId,
        )
          .then(res => {
            articleId = res.id;
          })
          .finally(() => {
            done();
          });
      });
      beforeAll(done => {
        TagService.createTag({ name: `TagName${Math.random() * 1000}` }, userId)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => {
            done();
          });
      });
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const postData = {
          tagId,
        };
        axios
          .post(`${apiBase}/articles/${articleId}/tags`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
            done();
          })
          .catch(() => {
            done();
          })
          .finally(() => done());
      });
      it('should return status code 201', () => {
        expect(data.status).toBe(201);
      });
    });
  });
  describe('DELETE /articles/:articleId/tags/:tagId', () => {
    describe('By Article Creator', () => {
      let token;
      let userId;
      let articleId;
      let tagId;
      beforeAll(done => {
        const userData = {
          firstName: `firtName${Math.random() * 100}`,
          lastName: `lastName${Math.random() * 100}`,
          email: `email${Math.random() * 1000}@gmail.com`,
          password: String(Math.random()),
          jobRole: 'employee',
        };
        UserService.createUser(userData).then(res => {
          userId = res.id;
          token = AuthService.tokenForUSer({ id: res.id });
          done();
        });
      });
      const data = { data: null };
      beforeAll(done => {
        ArticleService.createArticle(
          { title: 'tile', article: 'article' },
          userId,
        )
          .then(res => {
            articleId = res.id;
          })
          .finally(() => {
            done();
          });
      });
      beforeAll(done => {
        TagService.createTag({ name: `TagName${Math.random() * 1000}` }, userId)
          .then(res => {
            tagId = res.id;
          })
          .finally(() => {
            done();
          });
      });
      beforeAll(done => {
        ArticleTagService.createArticleTag({ tagId, articleId })
          .then(() => {})
          .finally(() => {
            done();
          });
      });
      beforeAll(done => {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios
          .delete(`${apiBase}/articles/${articleId}/tags/${tagId}`, config)
          .then(response => {
            data.status = response.status;
            done();
          })
          .catch((e) => {
            console.log(e.response.data)
            done();
          })
          .finally(() => done());
      });
      it('should return status code 202', () => {
        expect(data.status).toBe(202);
      });
    });
  });
});
