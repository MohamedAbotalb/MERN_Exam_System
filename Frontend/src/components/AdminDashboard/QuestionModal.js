import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addQuestion, updateQuestion } from '../../store/questionsSlice';

const QuestionModal = ({ show, onHide, examId, questionToEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (questionToEdit) {
      setName(questionToEdit.name);
      setOptions([...questionToEdit.options]);
      setCorrectAnswer(questionToEdit.correctAnswer);
    }
  }, [questionToEdit]);

  const handleAddOrUpdateQuestion = () => {
    const newQuestion = {
      name,
      options,
      correctAnswer,
      examId,
    };

    if (questionToEdit) {
      dispatch(updateQuestion({ ...questionToEdit, ...newQuestion }));
    } else {
      dispatch(addQuestion({ examId, ...newQuestion }));
    }

    onHide();
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {questionToEdit ? 'Edit Question' : 'Add Question'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Options</Form.Label>
            {options.map((option, index) => (
              <Form.Control
                key={index}
                type='text'
                className='my-2'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type='text'
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleAddOrUpdateQuestion}>
          {questionToEdit ? 'Update Question' : 'Add Question'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
