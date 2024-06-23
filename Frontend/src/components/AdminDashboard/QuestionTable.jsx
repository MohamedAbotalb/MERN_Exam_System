import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../store/questionsSlice';
import { Table, Button } from 'react-bootstrap';
import QuestionModal from './QuestionModal';
import DeleteModal from '../DeleteModal';

const QuestionTable = ({ questions, examId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (questionId) => {
    dispatch(deleteQuestion(questionId));
    setShowDeleteModal(false);
  };

  const handleShowModal = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setShowModal(false);
  };

  const handleDeleteModalOpen = (question) => {
    setItemToDelete(question);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
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
                <Button
                  variant='info'
                  className='mx-1'
                  onClick={() => handleShowModal(question)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant='danger'
                  className='mx-1'
                  onClick={() => handleDeleteModalOpen(question)}
                >
                  Delete
                </Button>
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
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleDelete={() => handleDelete(itemToDelete._id)}
        itemName='question'
      />
    </div>
  );
};

export default QuestionTable;
