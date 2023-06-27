import db from '../models/tripModel';
import format from 'pg-format';

const tripController = {};

tripController.getTrips = async (req, res, next) {
  const tripQuery = '';

  try {
    const trips = await db.query(tripQuery);
    await trips.rows.forEach(element => {})
  } catch (err) {

  }
};

module.exports = exampleController;