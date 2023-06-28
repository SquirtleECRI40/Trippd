import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function BottomContainer(data) {
  const { username } = useParams();
  console.log('username is:', username);
  useEffect(() => {
    console.log('data is:', data.data);
  }, []);
  return data.data.length === 0 ? (
    <div>
      <p>Create trip to get started!</p>
      <Link to="/createTrip" className="create" id="create">
        <button className="newTripButton" id="newTripButton">
          Create New Trip
        </button>
      </Link>
    </div>
  ) : (
    <div></div>
  );
}

export default BottomContainer;
