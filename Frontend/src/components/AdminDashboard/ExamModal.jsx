import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addExam, updateExam } from '../../store/examsSlice';

const ExamModal = ({ show, onHide, exam }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [passMarks, setPassMarks] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');

  useEffect(() => {
    if (exam) {
      setName(exam.name);
      setTotalMarks(exam.totalMarks);
      setPassMarks(exam.passMarks);
      setTotalQuestions(exam.totalQuestions);
    } else {
      setName('');
      setTotalMarks('');
      setPassMarks('');
      setTotalQuestions('');
    }
  }, [exam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation check for positive numbers
    if (totalMarks <= 0 || passMarks <= 0 || totalQuestions <= 0) {
      alert('Please enter positive numbers for Total Marks, Pass Marks, and Total Questions.');
      return;
    }
    const examData = { name, totalMarks, passMarks, totalQuestions };
    if (exam) {
      dispatch(updateExam({ id: exam._id, updatedExam: examData }));
    } else {
      dispatch(addExam(examData));
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
          <Form.Group>
            <Form.Label>Total Marks</Form.Label>
            <Form.Control
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              required
              min="0" 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pass Marks</Form.Label>
            <Form.Control
              type="number"
              value={passMarks}
              onChange={(e) => setPassMarks(e.target.value)}
              required
              min="0" 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Questions</Form.Label>
            <Form.Control
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              required
              min="0" 
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
