const { ArticleTagService } = require('../services/article-tag.service');

const ArticleTagRoute = {
  store(req, res, done) {
    ArticleTagService.createArticleTag({
      ...req.body,
      articleId: req.params.articleId,
    })
      .then(response => {
        const message = 'Article successfully posted';
        return res.status(201).send({
          status: 'success',
          message,
          data: response,
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
  destroy(req, res, done) {
    ArticleTagService.deleteArticleTag({
      articleId: req.params.articleId,
      tagId: req.params.tagId,
    })
      .then(() => {
        const message = 'Article Tag Successfully deleted';
        return res.status(202).send({
          status: 'success',
          message,
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

module.exports = { ArticleTagRoute };
