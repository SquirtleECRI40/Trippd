import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TripCard from './TripCard.jsx';

function BottomContainer(data) {
  const { username } = useParams();
  console.log(data.data);
  //array to contain all trip cards
  const tripsArray = [];

  //iterate through data to create unique trip cards
  for (let i = 0; i < data.data.length; i++) {
    tripsArray.push(<TripCard key={i} trip={data.data[i]} />);
  }

  return data.data.length === 0 ? (
    <div>
      <p>Create trip to get started!</p>
      <Link to={`/createTrip/${username}`} className="create" id="create">
        <button className="newTripButton" id="newTripButton">
          Create New Trip
        </button>
      </Link>
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <p style={{fontSize: '20px'}}>Your Trips: </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tripsArray}
      </div>
    </div>
  );
}

export default BottomContainer;
