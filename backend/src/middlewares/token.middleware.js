const jwt = require('jwt-simple');
const { passportSecret } = require('../../config/env.config');

const TokenMiddleware = (req, res, next) => {
  if (req.url === '/api/v1/auth/signin') {
    return next();
  }
  let token = req.headers['x-access-token'] || req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      const decoded = jwt.decode(token, passportSecret);
      if (decoded && decoded.exp < Date.now()) {
        return res.end('token expired', 401);
      }
      return next();
    } catch (err) {
      res.status(401);
      return res.send('Authorization token provided is invalid');
    }
  } else {
    return res.status(401).send({
      success: false,
      message: 'User is not authenticated',
    });
  }
};

module.exports = { TokenMiddleware };
