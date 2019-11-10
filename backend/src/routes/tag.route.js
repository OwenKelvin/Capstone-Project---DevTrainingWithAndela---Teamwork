const { TagService } = require('../services/tag.service');

const TagRoute = {
  store(req, res, done) {
    TagService.createTag(req.body)
      .then(response => {
        const message = 'Tag successfully posted';
        const tagId = response.id;
        return res.status(201).send({
          status: 'success',
          data: { tagId, message, ...response },
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

module.exports = { TagRoute };
