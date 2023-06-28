const express = require('express');
const tripController = require('../controllers/tripController');

const tripRouter = express.Router();

tripRouter.get('/:id', tripController.getTrips, (req, res) => {
  res.sendStatus(200).json(res.locals.message);
});

tripRouter.post('/createTrip/:id', tripController.addTrip, (req, res) => {
  res.sendStatus(200);
});

tripRouter.delete('/deleteTrip/:id', tripController.deleteTrip, (req, res) => {
  res.sendStatus(200);
});

module.exports = tripRouter;