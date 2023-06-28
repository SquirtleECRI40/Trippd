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
  // const tripQuery = `
  //   SELECT 
  //     t._id AS trip_id,
  //     t.title AS title,
  //     t.start_location AS start_location,
  //     l.location AS location,
  //     t.start_date AS start_date, 
  //     t.end_date AS end_date, 
  //     t.notes AS notes
  //   FROM 
  //     trips t
  //   INNER JOIN 
  //     locations l ON t.location = l._id
  //   INNER JOIN 
  //     users u ON t._id = ANY(u.trips)
  //   WHERE
  //     u.username = $1;
  // `;

tripController.getTrips = async (req, res, next) => {

  const username = req.params.username;
  console.log(username);

  const tripQuery = `
    SELECT 
      trips
    FROM
      users
    WHERE
      username = $1
  `;

  const joinTripsQuery = 'SELECT * FROM trips WHERE _ID = ANY($1)';

  try {
    const tripsResult = await db.query(tripQuery, [username]);
    console.log(tripsResult);
    const tripsArray = tripsResult.rows[0].trips;
    console.log(tripsArray);

    const tripsData = await db.query(joinTripsQuery, [tripsArray]);
    console.log('trips data', tripsData);
    const tripRows = tripsData.rows;

    // const processedTrips = tripsData.map((trip) => {
    //   return {
    //     trip_id: trip.trip_id,
    //     title: trip.title,
    //     start_location: trip.start_location,
    //     location: trip.location,
    //     start_date: trip.start_date,
    //     end_date: trip.end_date,
    //     notes: trip.notes,
    //   };
    // });

    res.locals.trips = tripRows;
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
  const { title, start_location, location, start_date, end_date, notes } = req.body;
  const username = req.params.username;

  try {
    // check if location exists in location table 
    const checkLocationQuery = 'SELECT * FROM locations WHERE location = $1';
    const existingLocation = await db.query(checkLocationQuery, [location]);

    // if location doesnt exist add to the loaction table
    if (existingLocation.rows.length === 0) {
      const addLocationQuery = 'INSERT INTO locations (location) VALUES ($1) RETURNING _id';
      const insertedLocation = await db.query(addLocationQuery, [location]);
      let locationId = insertedLocation.rows[0]._id;
    } else {
      let locationId = existingLocation.rows[0]._id;
    }

    //get location of the newly added location
    // const getLocationIdQuery = 'SELECT _id FROM locations WHERE location = $1';
    // const locationIdResult = await db.query(getLocationIdQuery, [location]);


    //add trips to trip table
    const addTripQuery = 
    'INSERT INTO trips (title, start_location, location, start_date, end_date, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING _id';
    const insertTrip = await db.query(addTripQuery, 
      [title, 
        start_location,
        location,
        start_date, 
        end_date, 
        notes]);
    const tripId = insertTrip.rows[0]._id;

    //update the users trips column in the users table
    const updateUserQuery = 'UPDATE users SET trips = array_append(trips, $1) WHERE username = $2';
    await db.query(updateUserQuery, [tripId, username]);

    return next();
  } catch(err) {
    return next({ log: `Error in adding trip: ${err}`});
  }
};

tripController.deleteTrip = async (req, res, next) => {
  const tripId = req.params.tripId;
  const username = req.params.username;
  console.log(tripId);
  try {
    // reteive users trips array 
    const getUserTripsQuery = 'SELECT trips FROM users WHERE username = $1';
    const userTripsResult = await db.query(getUserTripsQuery, [username]);
    console.log(userTripsResult);
    const userTrips = userTripsResult.rows[0].trips;

    // check if trip exists in the user's trip array 
    const tripIndex = userTrips.indexOf(tripId);
    if (tripIndex === -1) {
      return next({ status: 404, message: 'Trip not found.'});
    }

    // remove the trip from the user's trips array 
    userTrips.splice(tripIndex, 1);

    //update the users trips array in the users table
    const updateUserTripsQuery = 'UPDATE users SET trips = $1 WHERE username = $2';
    await db.query(updateUserTripsQuery, [userTrips, username]);

    // delete trip from trips table
    const deleteTripQuery = 'DELETE FROM trips WHERE _id = $1';
    await db.query(deleteTripQuery, [tripId]);

    return next();
  } catch(err) {
    return next({ log: `Error in deleting trip ${err}`});
  }
};

module.exports = tripController;