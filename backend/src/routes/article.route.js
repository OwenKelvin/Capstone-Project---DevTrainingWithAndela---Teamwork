const { ArticleService } = require('../services/article.service');

const ArticleRoute = {
  store(req, res, done) {
    ArticleService.createArticle(req.body, req.auth.id)
      .then(response => {
        const message = 'Article successfully posted';
        const articleId = response.id;
        return res.status(201).send({
          status: 'success',
          data: { articleId, message, ...response },
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
  update(req, res, done) {
    ArticleService.updateArticle(req.body, req.params.articleId)
      .then(response => {
        const message = 'Article successfully updated';
        const articleId = response.id;
        return res.status(202).send({
          status: 'success',
          data: { articleId, message, ...response },
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
};

module.exports = { ArticleRoute };
