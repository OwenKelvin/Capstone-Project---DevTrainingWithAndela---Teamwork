const Express = require('express');

const Router = Express.Router();
const { AuthRoute } = require('./auth.route');
const { ArticleRoute } = require('./article.route');
const { ArticleCommentRoute } = require('./article-comment.route');
const { GifCommentRoute } = require('./gif-comment.route');
const { GifRoute } = require('./gif.route');
const { TagRoute } = require('./tag.route');
const { FeedRoute } = require('./feed.route');
const { ArticleTagRoute } = require('./article-tag.route');

// Auth Routes
Router.post('/auth/signin', AuthRoute.login);
Router.post('/auth/create-user', AuthRoute.createUser);
Router.get('/auth/user', AuthRoute.user);

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
Router.delete('/tags/:tagId', TagRoute.destroy);

// Article Tags
Router.post('/articles/:articleId/tags', ArticleTagRoute.store);
Router.delete('/articles/:articleId/tags/:tagId', ArticleTagRoute.destroy);

module.exports = Router;
