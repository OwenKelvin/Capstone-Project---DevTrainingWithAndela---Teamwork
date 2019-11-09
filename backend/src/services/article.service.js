const { pool } = require('../../config/db.config');

const ArticleService = {
  async createArticle(data, authUserId) {
    const { title, article } = data;
    const values = [title, article, authUserId];
    return new Promise((resolve, reject) => {
      const text =
        'INSERT INTO articles( "title", "article", "userId") VALUES($1, $2, $3) RETURNING *';
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
  async updateArticle(data, articleId) {
    const { title, article } = data;
    const values = [title, article, articleId];
    return new Promise((resolve, reject) => {
      const text =
        'UPDATE articles SET "title" = $1, "article" = $2 WHERE "id"=$3 RETURNING *';
      pool.connect((err, client, done) => {
        if (err) {
          reject(err);
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
  async deleteArticle(articleId) {
    const values = [articleId];
    return new Promise((resolve, reject) => {
      const text = 'DELETE FROM articles WHERE "id"=$1';
      pool.connect((err, client, done) => {
        if (err) {
          reject(err);
        }
        client
          .query(text, values)
          .then(() => {
            resolve();
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
  async getArticleById(articleId) {
    const values = [articleId];
    return new Promise((resolve, reject) => {
      const text = 'SELECT * FROM articles WHERE "id"=$1';
      pool.connect((err, client, done) => {
        if (err) {
          reject(err);
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
