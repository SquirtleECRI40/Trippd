import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Page Imports
import SplashPage from './pages/SplashPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CreateTripPage from './pages/CreateTripPage.jsx';

//TO DO: Could be redundant
import Public from './public/components/TripCard.jsx';

//importing pages and components REQUIRED FOR ALL REACT COMPONENTS AND PAGES
//usage: import <your page> from <file path>;
//example: import HomePage from './pages/HomePage';
//note can be used for individual pages/components or entire folders

const App = () => {
  return (
    // for returning a single div
    <>
      <Routes>
        {/* INPUT ROUTES HERE */}
        {/* EXAMPLE: <Route path="/" element={<HomePage />} />  */}
        {/* TODO: CURRENT PAGES ARE STAND IN NAMES */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tripDashboard/:username" element={<DashboardPage />} />
        <Route path="/createTrip/:username" element={<CreateTripPage />} />
      </Routes>
    </>
  );
};

export default App;
