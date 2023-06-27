import express from 'express';
import authController from '../controllers/authController';

const usersRouter = express.Router();

usersRouter.post('/register', authController.register, (req, res) => {
  res.status(200).send({ message: 'Registration successful'});
});

usersRouter.post('/login', authController.login, (req, res) => {
  res.status(200).send({ message: 'Login successful.'});
});

// add logout feature after?

export default usersRouter;