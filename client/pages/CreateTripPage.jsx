// opens as a new page from the "create" button from empty page and home page

import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../styles/createTrip.css';
import axios from 'axios';


function CreateTripPage(){
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  //   const [tripTitle, setTripTitle] = useState(null);
  //   const [startLocation, setStartLocation] = useState(null);
  //   const [location, setLocation] = useState(null);
  //   const [notes, setNotes] = useState(null);


  //   const newTrip = async () => {
  //     // sending to the database (make fetch request, post)
  //     try {
  //       const tripData = {
  //         startDate: startDate,
  //         endDate: endDate,
  //         tripTitle: tripTitle,
  //         startLocation: startLocation,
  //         location: location,
  //         notes: notes,
  //       };
  //       await fetch('api/trip/create', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({tripData}),
  //       });
  //       // navigate to dashboard after successful trip creation
  //       navigate('/tripDashboard');
  //     } catch(err){
  //       console.log('Error when creating a trip: ', err);
  //     }
  //   };

  //   return(
  //     <div className = "createtripwrapper">
  //       <form>
  //         <label>Trip Title </label>
  //         <input></input>
  //         <label>Flying From: </label>
  //         <input></input>
  //         <label>Flying To: </label>
  //         <input></input>
  //         <DatePicker label="Start" value={startDate} onChange={(newValue)=> setStartDate(newValue)}/>
  //         <DatePicker label = "End" value={endDate} onChange={(newValue)=> setEndDate(newValue)}/>
  //         <label>Notes: </label>
  //         <input></input>
  //       </form>
  //       <div className = "createtripbuttonwrapper">
  //         <button onClick={() => navigate('/tripDashboard')}>Cancel</button>
  //         <button onClick={newTrip}>Create</button>
  //       </div>
  //     </div>
  //   );

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    try {
      console.log(data);
      const {tripTitle, startDate, endDate, startLocation, location, notes} = data;
    //   const formattedStartDate = 

    }catch(err){
      console.log('Error in submitting form: ', err);
    }
  };

  return (
    <div className = "createTripFormWrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Trip Title" {...register('tripTitle', {required: true})} />
        {/* <DatePicker label="Start" value={startDate} onChange={(newValue)=> setStartDate(newValue)}/>
        <DatePicker label = "End" value={endDate} onChange={(newValue)=> setEndDate(newValue)}/> */}
        <input type="datetime-local" placeholder="Start Date" {...register('startDate', {required: true})} />
        <input type="datetime-local" placeholder="End Date" {...register('endDate', {required: true})} />
        <input type="text" placeholder="Flying From" {...register('startLocation', {required: true})} />
        <input type="text" placeholder="Flying To" {...register('location', {required: true})} />
        <input id = "notes" type="text" placeholder="Notes" {...register('notes', {required: true})} />
        {/* needs to be "Submit" otherwise the form creator won't work */}
        <input type="Submit" />
      </form>
    </div>
  );


}
export default CreateTripPage;