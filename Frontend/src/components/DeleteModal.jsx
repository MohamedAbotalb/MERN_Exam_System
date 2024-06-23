import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onHide, handleDelete, itemName }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this {itemName}?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
