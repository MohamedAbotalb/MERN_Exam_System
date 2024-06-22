import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../store/questionsSlice';
import { Table, Button } from 'react-bootstrap';
import QuestionModal from './QuestionModal';
const QuestionTable = ({ questions, examId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleDelete = (questionId) => {
    dispatch(deleteQuestion(questionId));
  };

  const handleShowModal = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setShowModal(false);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>

            <th>Option1</th>
            <th>Option2</th>
            <th>Option3</th>
            <th>Option4</th>


            <th>Correct Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.name}</td>
              {/* Render each option in a separate column */}
              {question.options.map((option, index) => (
                <td key={index}>{option}</td>
              ))}
              <td>{question.correctAnswer}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(question)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(question._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <QuestionModal show={showModal} onHide={handleCloseModal} examId={examId} questionToEdit={selectedQuestion} />
    </div>
  );
};

export default QuestionTable;
