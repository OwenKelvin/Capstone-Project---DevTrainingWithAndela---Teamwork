const Express = require('express');

const IndexRouter = Express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
IndexRouter.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Teamwork - The Backend',
    author: 'Owen Kelvin',
    description: 'The backend for DevCTrainingWithAndela Capstone Project',
  });
});

module.exports = IndexRouter;
