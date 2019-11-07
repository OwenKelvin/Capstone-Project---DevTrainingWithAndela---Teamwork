const { AuthService } = require('../services/auth.service');

const AuthRoute = {
  login(req, res, done) {
    AuthService.authenticate(req.body)
      .then(response => res.status(200).send({ status: 'success', data: response }))
      .catch(e => res.status(401).send({ status: 'fail', message: e }))
      .finally(() => done());
  },
};

module.exports = { AuthRoute };
