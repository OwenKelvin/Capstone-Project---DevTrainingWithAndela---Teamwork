const { UserService } = require('../services/user.service');

// eslint-disable-next-line consistent-return
const AdminMiddleware = (req, res, next) => {
  const createUser = req.path === '/api/v1/auth/create-user' && req.method === 'POST';
  const postTags = req.path === '/api/v1/tags' && req.method === 'POST';
  const patchTags = /^\/api\/v1\/tags/.test(String(req.path)) && req.method === 'PATCH';

  if (createUser || postTags || patchTags) {
    UserService.getUserById(req.auth.sub).then(user => {
      if (user.jobRole === 'admin') {
        return next();
      }
      return res.status(401).send({
        status: 'fail',
        message:
          'User does not have neccessary privileges to perform this action',
      });
    });
  } else {
    return next();
  }
};

module.exports = { AdminMiddleware };
