const jwt = require('jwt-simple');
const { PASSPORT_SECRET } = require('../../config/env.config');

const TokenMiddleware = (req, res, next) => {
  if (req.url === '/api/v1/auth/signin') {
    return next();
  }
  let token = req.headers['x-access-token'] || req.headers.authorization || '';
  if (token.toLowerCase().startsWith('bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const decoded = jwt.decode(token, PASSPORT_SECRET);
      if (decoded && decoded.exp < Date.now()) {
        return res.end('token expired', 401);
      }
      req.auth = { ...decoded, id: decoded.sub };
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
