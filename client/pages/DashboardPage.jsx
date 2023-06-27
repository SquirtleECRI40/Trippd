// displays all known trips
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function DashboardPage() {
  const { username } = useParams();
  const [user, setUser] = useState(username);
  const [trips, setTrips] = useState([]);

  async function getData() {
    const res = await axios.get(`/api/tripDashboard/${user}`);
    const data = res.data;
    setTrips(data);
  }

  useEffect(() => {
    console.log('******THIS IS THE:', username);
    getData();
  }, []);
}
export default DashboardPage;
