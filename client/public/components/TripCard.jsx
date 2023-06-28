import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

//import pages
import TripModal from '../../pages/TripModal.jsx';

Modal.setAppElement('#root');

const TripCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  //destructure props
  //TO DO: do I need to get description for modal here?? or somewhere else
  const { _id, name, start_Location, location, start_Date, end_Date, notes } =
    props;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='trip-card'>
      <h3>{name}</h3>
      <h3>
        {start_Location} to {location}
      </h3>
      <h3>
        {start_Date} to {end_Date}
      </h3>
      <button onClick={openModal} className='details-button'>
        More Details
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <TripModal
          className='trip-modal'
          _id = {_id}
          closeModal={closeModal}
          name={name}
          startLocation={start_Location}
          endLocation={location}
          startDate={start_Date}
          endDate={end_Date}
          notes={notes}
        />
      </Modal>{' '}
    </div>
  );
};

export default TripCard;
