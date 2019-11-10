const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route');
const { ArticleRoute } = require('./article.route');
const { ArticleCommentRoute } = require('./article-comment.route');
const { GifCommentRoute } = require('./gif-comment.route');
const { GifRoute } = require('./gif.route');
const { TagRoute } = require('./tag.route');
const { FeedRoute } = require('./feed.route');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);
Router.post('/auth/create-user', AuthRoute.createUser);

// Articles Routes
Router.post('/articles', ArticleRoute.store);
Router.patch('/articles/:articleId', ArticleRoute.update);
Router.delete('/articles/:articleId', ArticleRoute.destroy);
Router.get('/articles/:articleId', ArticleRoute.show);

// Article Comments
Router.post('/articles/:articleId/comment', ArticleCommentRoute.store);

// Gifs Routes
Router.post('/gifs', GifRoute.store);
Router.patch('/gifs/:gifId', GifRoute.update);
Router.delete('/gifs/:gifId', GifRoute.destroy);

// Gif Comments
Router.post('/gifs/:gifId/comment', GifCommentRoute.store);

// Feed
Router.get('/feed', FeedRoute.index);

// Tags
Router.post('/tags', TagRoute.store);
Router.patch('/tags/:tagId', TagRoute.update);

module.exports = Router;
