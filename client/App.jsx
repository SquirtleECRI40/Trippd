import React from 'react';
import { Route, Routes } from 'react-router-dom';

//importing pages and components REQUIRED FOR ALL REACT COMPONENTS AND PAGES
//usage: import <your page> from <file path>;
//example: import HomePage from './pages/HomePage';
//note can be used for individual pages/components or entire folders

const App = () => {
    return (
        <>
      <Routes>
        {/* INPUT ROUTES HERE */}
        {/* EXAMPLE: <Route path="/" element={<HomePage />} />  */}
        {/* TODO: CURRENT PAGES ARE STAND IN NAMES */}
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/login" element = {<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage />} />
        <Route path = "/tripDashboard" element = {<DashboardPage/>} />
        <Route path = "/createTrip" element = {<CreateTripPage/>} />
        <Route path = "/updateTrip" element = {<UpdateTripPage/>} />

      </Routes>
    </>
    )
}


export default App;