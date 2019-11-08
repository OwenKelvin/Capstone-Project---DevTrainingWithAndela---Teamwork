const bcrypt = require('bcrypt');
const { pool } = require('../../config/db.config');

const saltRounds = 12;
const pool2 = pool;
const pool3 = pool;
const UserService = {
  async deleteUser(data) {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          return err;
        }
        const { email } = data;
        const text = 'DELETE FROM users WHERE "email"=$1';
        client
          .query(text, [email])
          .then(response => {
            resolve(response);
          })
          .catch(e => reject(e))
          .finally(() => {
            done();
          });
        return done();
      });
    });
  },
  async createUser(data) {
    return new Promise((resolve, reject) => {
      pool2.connect((err, client, done) => {
        if (err) {
          return err;
        }
        if (data) {
          const {
            firstName,
            lastName,
            email,
            password,
            address,
            jobRole,
            gender,
            department,
          } = data;
          const text = 'INSERT INTO users( "firstName", "lastName", "email", "password", "address", "jobRole", "gender", "department") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

          bcrypt.hash(password, saltRounds).then(hash => {
            const values = [
              firstName,
              lastName,
              email,
              hash,
              address,
              jobRole,
              gender,
              department,
            ];

            client
              .query(text, values)
              .then(res => {
                if (res.rows.length > 0) {
                  resolve(res.rows[0]);
                }
                reject();
              })
              .catch(e => {
                reject(e);
              })
              .finally(() => {
                // done();
              });
          });
        }
        return done();
      });
    });
  },
  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      pool3.connect((err, client, done) => {
        if (err) {
          return err;
        }
        const text = 'SELECT * FROM users WHERE id=$1';
        client
          .query(text, [userId])
          .then(res => {
            if (res.rows.length > 0) {
              resolve(res.rows[0]);
            }
            reject();
          })
          .catch(e => {
            reject(e);
          })
          .finally(() => {
            // done();
          });
        return done();
      });
    });
  },
};
module.exports = { UserService };
