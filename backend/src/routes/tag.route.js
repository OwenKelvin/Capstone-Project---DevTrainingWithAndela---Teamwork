const { TagService } = require('../services/tag.service');

const TagRoute = {
  index(req, res, done) {
    TagService.getTags(req.body)
      .then(response => {
        const message = 'Tag successfully retrieved';
        return res.status(200).send({
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
  update(req, res, done) {
    TagService.updateTag(req.params.tagId, req.body)
      .then(response => {
        const message = 'Tag successfully updated';
        const tagId = response.id;
        return res.status(202).send({
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
  destroy(req, res, done) {
    TagService.deleteTag(req.params.tagId)
      .then(response => {
        const message = 'Tag successfully deleted';
        const tagId = response.id;
        return res.status(202).send({
          status: 'success',
          data: { tagId, message },
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
