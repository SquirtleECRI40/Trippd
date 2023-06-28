import { React, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const TripModal = (props) => {
  const {
    closeModal,
    _id,
    name,
    startLocation,
    endLocation,
    startDate,
    endDate,
    notes,
  } = props;

  //setting up hooks
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedStartLocation, setEditedStartLocation] = useState(startLocation);
  const [editedEndLocation, setEditedEndLocation] = useState(endLocation);
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedEndDate, setEditedEndDate] = useState(endDate);
  const [editedNotes, setEditedNotes] = useState(notes);

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleDeleteClick = () => {
    //delete request

    //close modal
    closeModal();
  };

  const handleConfirmClick = async () => {
    // Perform the logic to send the PUT request with the updated values
    // ...
    const updatedTrip = {
      _id: _id,
      name: editedName,
      startLocation: editedStartLocation,
      endLocation: editedEndLocation,
      startDate: editedStartDate,
      endDate: editedEndDate,
      notes: editedNotes,
    };
    try {
      const response = await axios.put(`/api/trip/update${_id}`,updatedTrip);
      if (response.ok) {
        setIsEditMode(false);
      } else {
        throw new Error('Error: Could not update');
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  const handleCancelClick = () => {
    // Reset the edited values to the original values
    setEditedName(name);
    setEditedStartLocation(startLocation);
    setEditedEndLocation(endLocation);
    setEditedStartDate(startDate);
    setEditedEndDate(endDate);
    setEditedNotes(notes);

    setIsEditMode(false);
  };

  return (
    <div>
      <button onClick={closeModal}>Close</button>

      <h2>Trip Details</h2>
      {!isEditMode ? (
        <>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Start Location:</strong> {startLocation}
          </p>
          <p>
            <strong>End Location:</strong> {endLocation}
          </p>
          <p>
            <strong>Start Date:</strong> {startDate}
          </p>
          <p>
            <strong>End Date:</strong> {endDate}
          </p>
          <p>
            <strong>Notes:</strong> {notes}
          </p>
          <button onClick={handleEditClick} className='edit-button'>
            Edit
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong>{' '}
            <input
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </p>
          <p>
            <strong>Start Location:</strong>{' '}
            <input
              type='text'
              value={editedStartLocation}
              onChange={(e) => setEditedStartLocation(e.target.value)}
            />
          </p>
          <p>
            <strong>End Location:</strong>{' '}
            <input
              type='text'
              value={editedEndLocation}
              onChange={(e) => setEditedEndLocation(e.target.value)}
            />
          </p>
          <p>
            <strong>Start Date:</strong>{' '}
            <input
              type='text'
              value={editedStartDate}
              onChange={(e) => setEditedStartDate(e.target.value)}
            />
          </p>
          <p>
            <strong>End Date:</strong>{' '}
            <input
              type='text'
              value={editedEndDate}
              onChange={(e) => setEditedEndDate(e.target.value)}
            />
          </p>
          <p>
            <strong>Notes:</strong>{' '}
            <textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
            ></textarea>
          </p>
          <div className='edit-buttons'>
            <button onClick={handleConfirmClick} className='confirm-button'>
              Confirm
            </button>
            <button onClick={handleCancelClick} className='cancel-button'>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TripModal;