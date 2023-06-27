// displays all known trips

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function DashboardPage() {
  const { username } = useParams();

  useEffect(() => {
    console.log('******THIS IS THE:', username);
  }, []);
}
export default DashboardPage;
