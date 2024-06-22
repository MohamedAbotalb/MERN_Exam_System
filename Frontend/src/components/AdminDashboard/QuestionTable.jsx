import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion } from '../../store/questionsSlice';
import { Table, Button } from 'react-bootstrap';
import QuestionModal from './QuestionModal'; 

const QuestionTable = ({ questions,examId }) => {

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
            <td>
                <Button variant="warning" onClick={() => handleShowModal(question)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(question._id)}>Delete</Button>
              </td>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <QuestionModal
        show={showModal}
        onHide={handleCloseModal}
        examId={examId}
        questionToEdit={selectedQuestion}
      />
    </div>
  );
};

export default QuestionTable;
