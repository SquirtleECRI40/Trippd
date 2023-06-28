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
      <button>Create</button>
    </div>
  ) : (
    <div>
      <p>Hi {username}, welcome back!</p>
      <div>
        <p>New Trip???</p>
        <button>Create</button>
      </div>
    </div>
  );
}

export default BottomContainer;
