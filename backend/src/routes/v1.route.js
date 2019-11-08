const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route');
const { ArticleRoute } = require('./article.route');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);
Router.post('/auth/create-user', AuthRoute.createUser);

// Articles Routes
Router.post('/articles', ArticleRoute.store);
Router.patch('/articles/:articleId', ArticleRoute.update);
Router.delete('/articles/:articleId', ArticleRoute.destroy);

module.exports = Router;
