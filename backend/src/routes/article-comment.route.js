const { ArticleCommentService } = require('../services/article-comment.service');

const ArticleCommentRoute = {
  store(req, res, done) {
    ArticleCommentService.createArticleComment(req.params.articleId, req.body)
      .then(response => {
        const message = 'Comment successfully created';
        return res.status(201).send({
          status: 'success',
          message,
          data: {
            articleCommentId: response.id,
            ...response,
          },
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

module.exports = { ArticleCommentRoute };
