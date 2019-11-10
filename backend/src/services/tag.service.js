const { pool } = require('../../config/db.config');

const TagService = {
  async createTag(data) {
    const { name } = data;
    const values = [name];
    return new Promise((resolve, reject) => {
      const text = `INSERT INTO tags( "name") 
                    VALUES($1) RETURNING *`;
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
  async updateTag(tagId, data) {
    const { name } = data;
    const values = [name, tagId];
    return new Promise((resolve, reject) => {
      const text = 'UPDATE tags SET name = $1 WHERE id=$2 RETURNING *';
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

module.exports = { TagService };
