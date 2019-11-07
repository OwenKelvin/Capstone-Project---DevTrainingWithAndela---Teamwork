const { UserService } = require('../services/user.service');

// eslint-disable-next-line consistent-return
const AdminMiddleware = (req, res, next) => {
  if (req.path === '/api/v1/auth/create-user') {
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
