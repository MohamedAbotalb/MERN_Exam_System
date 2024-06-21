import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectQuestionsByExam, deleteQuestion } from '../../store/questionsSlice';
import { Table, Button } from 'react-bootstrap';

const QuestionTable = ({ examId }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => selectQuestionsByExam(state, examId));
  const questionStatus = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);

  useEffect(() => {
    if (questionStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionStatus, dispatch]);

  const handleDelete = (questionId) => {
    dispatch(deleteQuestion(questionId));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Question</th>
          <th>Options</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id}>
            <td>{question.questionText}</td>
            <td>{question.options.join(', ')}</td>
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
