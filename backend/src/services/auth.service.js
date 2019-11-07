const jwt = require('jwt-simple');
const bcrpt = require('bcrypt');
const { pool } = require('../../config/db.config');

const { PASSPORT_SECRET } = require('../../config/env.config');

const AuthService = {
  tokenForUSer(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, PASSPORT_SECRET);
  },
  async authenticate(credentials) {
    const { email, password } = credentials;
    return new Promise((resolve, reject) => {
      const text = 'SELECT * FROM users where email=$1';
      pool.connect((err, client, done) => {
        client.query(text, [email]).then(response => {
          if (response.rows.length > 0) {
            const user = response.rows[0];

            const token = AuthService.tokenForUSer(user);
            const userId = user.id;
            bcrpt.compare(password, user.password).then(validPassword => {
              if (validPassword) {
                resolve({ token, userId });
              } else {
                reject();
              }
            });
          }
          done();
        });
      });
    });
  },
};

module.exports = { AuthService };
