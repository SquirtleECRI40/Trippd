import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

//import pages
import TripModal from '../../pages/TripModal.jsx';

Modal.setAppElement('#root');

const TripCard = (props) => {
  console.log('PROPS IS:', props);
  const [isOpen, setIsOpen] = useState(false);

  //destructure props
  //TO DO: do I need to get description for modal here?? or somewhere else
  const { _id, title, start_location, location, start_date, end_date, notes } =
    props.trip;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="trip-card">
      <h3>{title}</h3>
      <h3>
        {start_location} to {location}
      </h3>
      <h3>
        {start_date} to {end_date}
      </h3>
      <button onClick={openModal} className="details-button">
        More Details
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <TripModal
          className="trip-modal"
          _id={_id}
          closeModal={closeModal}
          name={title}
          startLocation={start_location}
          endLocation={location}
          startDate={start_date}
          endDate={end_date}
          notes={notes}
        />
      </Modal>{' '}
    </div>
  );
};

export default TripCard;
