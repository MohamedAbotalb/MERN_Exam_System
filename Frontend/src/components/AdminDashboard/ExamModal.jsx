import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addExam, updateExam } from '../../store/examsSlice';

const ExamModal = ({ show, onHide, exam }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    if (exam) {
      setName(exam.name);
    } else {
      setName('');
    }
  }, [exam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (exam) {
      dispatch(updateExam({ id: exam.id, updatedExam: { name } }));
    } else {
      dispatch(addExam({ name }));
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{exam ? 'Edit Exam' : 'Add Exam'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Exam Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {exam ? 'Update Exam' : 'Add Exam'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExamModal;
