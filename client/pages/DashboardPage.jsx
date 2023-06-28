// displays all known trips
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TopContainer from '../public/components/TopContainer.jsx';
import BottomContainer from '../public/components/BottomContainer.jsx';

function DashboardPage() {
  const { username } = useParams();
  const [user, setUser] = useState(username);
  const [trips, setTrips] = useState([]);

  async function getData() {
    const res = await axios.get(`/api/trip/${username}`);
    const data = res.data;
    setTrips(data);
  }

  useEffect(() => {
    getData();
    // setTrips(['here']);
  }, []);

  return (
    <div>
      <TopContainer data={trips} />
      <BottomContainer data={trips} />
    </div>
  );
}
export default DashboardPage;
