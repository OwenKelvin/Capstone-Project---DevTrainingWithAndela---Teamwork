const { FeedService } = require('../services/feed.service');

const FeedRoute = {
  index(req, res, done) {
    FeedService.getFeeds()
      .then(response => {
        const message = 'Feed successfully rethrieved';
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
};

module.exports = { FeedRoute };
