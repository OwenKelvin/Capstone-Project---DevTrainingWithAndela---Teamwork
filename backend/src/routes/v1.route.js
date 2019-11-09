const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route');
const { ArticleRoute } = require('./article.route');
const { ArticleCommentRoute } = require('./article-comment.route');
const { GifRoute } = require('./gif.route');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);
Router.post('/auth/create-user', AuthRoute.createUser);

// Articles Routes
Router.post('/articles', ArticleRoute.store);
Router.patch('/articles/:articleId', ArticleRoute.update);
Router.delete('/articles/:articleId', ArticleRoute.destroy);

// Article Comments
Router.post('/articles/:articleId/comment', ArticleCommentRoute.store);

// Gifs Routes
Router.post('/gifs', GifRoute.store);
Router.patch('/gifs/:gifId', GifRoute.update);
Router.delete('/gifs/:gifId', GifRoute.destroy);

module.exports = Router;
