const express = require('express');
const authController = require('../controllers/authController');

const usersRouter = express.Router();

usersRouter.post('/register', authController.register, (req, res) => {
  res.sendStatus(200);
});

usersRouter.post('/login', authController.login, (req, res) => {
  res.sendStatus(200);
});

// add logout feature after?

module.exports = usersRouter;