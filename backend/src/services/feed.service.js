const { pool } = require('../../config/db.config');

const FeedService = {
  async getFeeds() {
    return new Promise((resolve, reject) => {
      const text = `SELECT 
                        id as "articleId", NULL AS gifId, title, article, NULL as url, "createdAt" as "createdOn"
                        FROM articles
                    UNION
                    SELECT
                        NULL, id as "gifId", title, NULL, url, "createdAt" as "createdOn"
                    FROM gifs
                    ORDER BY
                    "createdOn" DESC;`;
      pool.connect((err, client, done) => {
        if (err) {
          reject(err);
        }
        client
          .query(text)
          .then(response => {
            if (response.rows.length > 0) {
              resolve(response.rows);
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

module.exports = { FeedService };
