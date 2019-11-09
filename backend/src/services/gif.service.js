const { pool } = require('../../config/db.config');

const GifService = {
  async createGif(data, authUserId) {
    const { title, url } = data;
    const values = [title, authUserId, url];
    return new Promise((resolve, reject) => {
      const text = 'INSERT INTO gifs( "title", "userId", "url") VALUES($1, $2, $3) RETURNING *';
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
  async updateGif(data, gifId) {
    const { title } = data;
    const values = [title, gifId];
    return new Promise((resolve, reject) => {
      const text = 'UPDATE gifs SET "title"=$1 WHERE "id"=$2 RETURNING *';
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
  async deleteGif(gifId) {
    const values = [gifId];
    return new Promise((resolve, reject) => {
      const text = 'DELETE FROM gifs WHERE "id"=$1';
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
  async updateGifUrl(gifId, url) {
    const values = [url, gifId];
    return new Promise((resolve, reject) => {
      // console.log(`UPDATE gifs SET "url"=${url} WHERE "id"=${} RETURNING *`);
      const text = 'UPDATE gifs SET "url"=$1 WHERE "id"=$2 RETURNING *';
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

module.exports = { GifService };
