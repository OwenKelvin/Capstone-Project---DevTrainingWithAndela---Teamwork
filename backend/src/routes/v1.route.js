const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route.js');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);

module.exports = Router;
