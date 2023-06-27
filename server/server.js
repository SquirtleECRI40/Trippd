import express from 'express';
import path from 'path';
import tripRouter from './routes/tripRoutes';

const app = express();

// assign constants
const PORT = 3000;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request to router
app.use('/trip', tripRouter);

//catch-all route handler for any requests

app.use((req, res) => res.status(404).send('This page does not exist'));

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;