const db = require('../models/tripModel');
// import format from 'pg-format';

const tripController = {};

/* 
users
_id - INT - serial/required
username - varchar - required
password - varchar - required 
trips - int[] - not required
*/

/*
LOCATION 
_id - INT - serial/required
location - varchar - required
*/

/*
trips
_id - INT - serial/required
title - varchar - required
location - INT - required 
start_date - varchar - not required 
end_date - varchar - not required 
notes - varchar - not required 
*/

tripController.getTrips = async (req, res, next) => {

  const username = req.params.username;

  const tripQuery = `
    SELECT 
      t._id AS trip_id,
      t.title AS title,
      t.start_location AS start_location,
      l.location AS location,
      t.start_date AS start_date, 
      t.end_date AS end_date, 
      t.notes AS notes
    FROM 
      users u,
      unnest(u.trips) AS trip_id
    INNER JOIN 
      trips t ON trip_id = t.id
    INNER JOIN 
      locations l ON t.location = l._id
    WHERE
      u.username = $1;
  `;

  try {
    const trips = await db.query(tripQuery, [username]);
    res.locals.trips = await trips.rows;
    return next();
  } catch (err) {
    return next({
      log: 'Error in getItem',
      status: 400,
      message: 'Error retreiving items.',
    });
  }
};

tripController.addTrip = async (req, res, next) => {
  console.log("req params: ", req.params);
  const { title, start_location, location, start_date, end_date, notes } = req.body;
  try {
    // check if location exists in location table 
    const checkLocationQuery = 'SELECT * FROM locations WHERE location = $1';
    const existingLocation = await db.query(checkLocationQuery, [location]);

    // if location doesnt exist add to the loaction table
    if (existingLocation.rows.length === 0) {
      const addLocationQuery = 'INSERT INTO locations (location) VALUES ($1)';
      await db.query(addLocationQuery, [location]);
    }

    //get location of the newly added location
    const getLocationIdQuery = 'SELECT _id FROM locations WHERE location = $1';
    const locationIdResult = await db.query(getLocationIdQuery, [location]);
    const locationId = locationIdResult.rows[0]._id;


    //add trips to trip table
    const addTripQuery = 'INSERT INTO trips (title, start_location, location, start_date, end_date, notes) VALUES ($1, $2, (SELECT _id FROM locations WHERE location = $3), $4, $5, $6)';
    await db.query(addTripQuery, [title, start_location, location, start_date, end_date, notes]);

    //update the users trips column in the users table
    const userId = req.params.id;
    const updateUserQuery = 'UPDATE users SET trips = array_append(trips, $1) WHERE _id = $2';
    await db.query(updateUserQuery, [locationId, userId]);

    return next();
  } catch(err) {
    return next({ log: `Error in adding trip: ${err}`});
  }
};

tripController.deleteTrip = async (req, res, next) => {
  const tripId = res.params.tripId;

  try {
    // reteive users trips array 
    const userId = req.params.id;
    const getUserTripsQuery = 'SELECT trips FROM users WHERE _id = $1';
    await db.query(getUserTripsQuery, [userId]);
    const userTrips = userTrips.row[0].trips;

    // check if trip exists in the user's trip array 
    const tripIndex = userTrips.indexOf(tripId);
    if (tripIndex === -1) {
      return next({ status: 404, message: 'Trip not found.'});
    }

    // remove the trip from the user's trips array 
    userTrips.splice(tripIndex, 1);

    //update the users trips array in the users table
    const updateUserTripsQuery = 'UPDATE users SET trips = $1 WHERE _id = $2';
    await db.query(updateUserTripsQuery, [userTrips, userId]);

    // delete trip from trips table
    const deleteTripQuery = 'DELETE FROM trips WHERE _id = $1';
    await db.query(deleteTripQuery, [tripId]);

    return next();
  } catch(err) {
    return next({ log: `Error in deleting trip ${err}`});
  }
};

module.exports = tripController;