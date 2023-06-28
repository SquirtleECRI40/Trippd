const express = require('express');
const tripController = require('../controllers/tripController');

const tripRouter = express.Router();

tripRouter.get('/:username', tripController.getTrips, (req, res) => {
  res.sendStatus(200).json(res.locals.message);
});

tripRouter.post('/:username', tripController.addTrip, (req, res) => {
  res.sendStatus(200);
});

tripRouter.delete('/deleteTrip', tripController.deleteTrip, (req, res) => {
  res.sendStatus(200);
});

module.exports = tripRouter;