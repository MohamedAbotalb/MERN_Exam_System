import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  addQuestion,
  updateQuestion,
  fetchQuestionsByExamId,
} from '../../store/questionsSlice';

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

    const action = questionToEdit
      ? updateQuestion({ examId, questionId: questionToEdit._id, newQuestion })
      : addQuestion({ examId, newQuestion });

    dispatch(action).then(() => {
      dispatch(fetchQuestionsByExamId(examId));
      onHide();
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop='static'>
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
              className='my-2'
              placeholder='Enter Question Name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Options</Form.Label>
            {options.map((option, index) => (
              <Form.Group key={index}>
                <Form.Control
                  type='text'
                  placeholder={`Enter option ${index + 1}`}
                  className='my-2'
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Form.Group>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type='text'
              value={correctAnswer}
              placeholder='Enter Correct Answer'
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
