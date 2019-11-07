const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route.js');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);
Router.post('/auth/create-user', AuthRoute.createUser);

module.exports = Router;
