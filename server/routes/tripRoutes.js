const express = require('express');
const tripController = require('../controllers/tripController');

const tripRouter = express.Router();

tripRouter.get('/', tripController.getTrips, (req, res) => {
  res.status(200).json(res.locals.message);
});

tripRouter.post('/createTrip', tripController.addTrip, (req, res) => {
  res.status(200);
});

tripRouter.delete('/deleteTrip', tripController.deleteTrip, (req, res) => {
  res.status(200);
});

module.exports = tripRouter;