import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function TopContainer(data) {
  const { username } = useParams();
  const navigate = useNavigate();
  console.log('username is:', username);
  useEffect(() => {
    console.log('data is:', data.data);
  }, []);

  return data.data.length === 0 ? (
    <p>Hi {username}, welcome to Trippd!</p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <p>Hi {username}, welcome back!</p>
      <div>
        <p style={{font: 'strong'}}>New Trip???</p>
        {/* <Link to = {`/createTrip/${username}`} className="create" id="create"> */}
        <button className="newTripButton" id="newTripButton" onClick = {() => {navigate(`/createTrip/${username}`);}}>
            Create New Trip
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default TopContainer;
