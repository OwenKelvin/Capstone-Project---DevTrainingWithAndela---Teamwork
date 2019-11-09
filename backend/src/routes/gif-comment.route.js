const { GifCommentService } = require('../services/gif-comment.service');

const GifCommentRoute = {
  store(req, res, done) {
    GifCommentService.createGifComment(req.params.gifId, req.body)
      .then(response => {
        const message = 'Comment successfully created';
        return res.status(201).send({
          status: 'success',
          message,
          data: {
            gifCommentId: response.id,
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

module.exports = { GifCommentRoute };
