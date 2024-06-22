// QuestionTable.jsx

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../store/questionsSlice';

const QuestionTable = ({ questions }) => {
  const dispatch = useDispatch();
  const handleDelete = (questionId) => {
    dispatch(deleteQuestion(questionId));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Question</th>
          <th>Options</th>
          <th>Correct Answer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id}>
            <td>{question.name}</td>
            <td>{question.options.join(', ')}</td>
            <td>{question.correctAnswer}</td>

            <td>
              <Button variant="warning" onClick={() => console.log('Edit', question.id)}>
                Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(question.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default QuestionTable;
