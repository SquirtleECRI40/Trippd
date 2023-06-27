const express = require('express');
const exampleController = require('../controllers/exampleController');

const tripRouter = express.Router();

tripRouter.get('/', exampleController.getMessage, (req, res) => {
  res.status(200).json(res.locals.message);
});

module.exports = tripRouter;