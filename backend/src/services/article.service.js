const { pool } = require('../../config/db.config');

const ArticleService = {
  async createArticle(data, authUserId) {
    const { title, article } = data;
    const values = [title, article, authUserId];
    return new Promise((resolve, reject) => {
      const text = 'INSERT INTO articles( "title", "article", "userId") VALUES($1, $2, $3) RETURNING *';
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

module.exports = { ArticleService };
