// opens as a new page from the "create" button from empty page and home page

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../styles/createTrip.css';
import moment from 'moment';

function CreateTripPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  console.log('create trip username ', username);
  console.log('LOCATION IS:', location, 'YO!');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      tripTitle,
      startDateTime,
      endDateTime,
      startLocation,
      location,
      notes,
    } = data;
    let startDate = data.startDateTime.slice(0, 10);
    // let startTime = moment(data.startDateTime.slice(11), ['HH:mm']).format('h:mm A');
    let endDate = data.endDateTime.slice(0, 10);
    // let endTime = moment(data.endDateTime.slice(11), ['HH:mm']).format('h:mm A');
    console.log(data);
    try {
      console.log('HIT THIS CONSOLE.LOG!!!!');
      const response = await fetch(
        `${username}/api/trip/createTrip/${username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response.status);
      //   if (!response.ok) throw new Error ('Unable to submit form');
      console.log('before navigate');
      navigate(-1);
    } catch (err) {
      console.log('Error in submitting form: ', err);
    }
  };

  return (
    <div className="createTripFormWrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Trip Title"
          {...register('tripTitle', { required: true })}
        />
        {/* <DatePicker label="Start" value={startDate} onChange={(newValue)=> setStartDate(newValue)}/>
        <DatePicker label = "End" value={endDate} onChange={(newValue)=> setEndDate(newValue)}/> */}
        <input
          type="datetime-local"
          placeholder="Start Date"
          {...register('startDateTime')}
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          {...register('endDateTime')}
        />
        <input
          type="text"
          placeholder="Flying From"
          {...register('startLocation', { required: true })}
        />
        <input
          type="text"
          placeholder="Flying To"
          {...register('endLocation', { required: true })}
        />
        <input
          id="notes"
          type="text"
          placeholder="Notes"
          {...register('notes')}
        />
        {/* needs to be "Submit" otherwise the form creator won't work */}
        {/* <button>Cancel</button> */}
        <input type="Submit" />
      </form>
    </div>
  );
}
export default CreateTripPage;
