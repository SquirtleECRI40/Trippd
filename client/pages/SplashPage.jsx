// introduction to our application, button to login/signup

import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function SplashComponent(){
  return (
  // for returning a single div
    <>
      <Routes>
        <Route path = "/" element = {<SplashPage />} />
        <Route path = "/login" element = {<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage />} />
        <Route path = "/tripDashboard" element = {<DashboardPage/>} />
        <Route path = "/createTrip" element = {<CreateTripPage/>} />
      </Routes>
    </>
  );
}
export default SplashComponent;