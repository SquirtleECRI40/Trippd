import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

//import pages
import TripModal from './pages/TripModal.jsx';


Modal.setAppElement('#root');


const TripCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

  //destructure props
  //TO DO: do I need to get description for modal here?? or somewhere else
  const { id, name, startLocation, endLocation, startDate, endDate, notes } = props;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="trip-card">
      <h3>{name}</h3>
      <h3>
        {startLocation} to {endLocation}
      </h3>
      <h3>
        {startDate} to {endDate}
      </h3>
      <button onClick={openModal} className = 'details-button'>More Details</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <TripModal className = "trip-modal" closeModal = {closeModal} name = {name} startLocation = {startLocation} endLocation = {endLocation} startDate={startDate} endDate={endDate} notes={notes}/>
      </Modal>    </div>
  );
};

export default TripCard;
