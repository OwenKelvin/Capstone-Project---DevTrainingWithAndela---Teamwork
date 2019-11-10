/* eslint-disable arrow-body-style */
const Express = require('express');

const IndexRouter = Express.Router();

// eslint-disable-next-line no-unused-vars
IndexRouter.get('/', (req, res, next) => {
  return res.status(200).render('index.pug', {
    title: 'Teamwork Api - DevCTraining Andela',
    heading: 'DevCTraining with Andela Capstone project Backend',
    version: 'v1',
    author: 'Owen Kelvin',
    summary: 'The backend for DevCTrainingWithAndela Capstone Project',
  });
});

module.exports = IndexRouter;
