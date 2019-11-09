const { pool } = require('../../config/db.config');

const GifCommentService = {
  async createGifComment(gifId, data) {
    const { comment } = data;
    const values = [comment, gifId];
    return new Promise((resolve, reject) => {
      const text = 'INSERT INTO gif_comments ("comment", "gifId") VALUES($1, $2) RETURNING *';
      pool.connect((err, client, done) => {
        if (err) {
          reject();
        }
        client
          .query(text, values)
          .then(response => {
            if (response.rows.length > 0) {
              resolve(response.rows[0]);
            } else {
              reject();
            }
          })
          .catch(err1 => {
            reject(err1);
          })
          .finally(() => {
            done();
          });
      });
    });
  },
};

module.exports = { GifCommentService };
