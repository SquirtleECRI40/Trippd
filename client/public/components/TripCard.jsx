import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = (props) => {
  //destructure props
  //TO DO: do I need to get description for modal here?? or somewhere else
  const { name, startLocation, endLocation, startDate, endDate } = props;

  return (
    <div className='trip-card'>
      <h3>{name}</h3>
      <h3>
        {startLocation} to {endLocation}
      </h3>
      <h3>
        {startDate} to {endDate}
      </h3>
      <button className = 'details-button'>More Details</button>
    </div>
  );
};

export default TripCard;