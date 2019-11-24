const { AuthService } = require('../services/auth.service');
const { UserService } = require('../services/user.service');

const AuthRoute = {
  createUser(req, res, done) {
    UserService.createUser(req.body)
      .then(response =>
        res.status(201).send({ status: 'success', data: response })
      )
      .catch(e => res.status(401).send({ status: 'fail', message: e }))
      .finally(() => done());
  },
  login(req, res, done) {
    AuthService.authenticate(req.body)
      .then(response =>
        res.status(200).send({ status: 'success', data: response })
      )
      .catch(e => res.status(401).send({ status: 'fail', message: e }))
      .finally(() => done());
  },
  user(req, res, done) {
    UserService.getUserById(req.auth.id)
      .then(response =>
        res.status(200).send({ 
          status: 'success', 
          data: {...response, password: null, isAdmin: response.jobRole === 'admin'} })
      )
      .catch(e => res.status(500).send({ status: 'fail', message: e }))
      .finally(() => done());
  }
};

module.exports = { AuthRoute };
