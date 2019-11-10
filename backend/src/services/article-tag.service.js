const { pool } = require('../../config/db.config');

const ArticleTagService = {
  async createArticleTag(data) {
    const { articleId, tagId } = data;
    const values = [articleId, tagId];
    return new Promise((resolve, reject) => {
      const text = `INSERT INTO article_tag ( "articleId", "tagId")
                    VALUES($1, $2) RETURNING *`;
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

module.exports = { ArticleTagService };
