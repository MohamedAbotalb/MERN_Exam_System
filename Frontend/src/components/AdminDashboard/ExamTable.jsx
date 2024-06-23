import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllExams, fetchExams, deleteExam } from '../../store/examsSlice';
import { Button, Table } from 'react-bootstrap';
import ExamModal from './ExamModal';
import QuestionModal from './QuestionModal';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal'; // Import the DeleteModal component

const ExamTable = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete modal
  const [examToDelete, setExamToDelete] = useState(null); // State to hold the exam to be deleted

  const handleDelete = (id) => {
    dispatch(deleteExam(id)).then(() => {
      dispatch(fetchExams());
      setShowDeleteModal(false); // Close the delete modal after deletion
    });
  };

  const handleShowAddModal = () => {
    setSelectedExam(null);
    setShowExamModal(true);
  };

  const handleShowEditModal = (exam) => {
    setSelectedExam(exam);
    setShowExamModal(true);
  };

  const handleShowQuestionModal = (examId) => {
    setSelectedExam(examId);
    setShowQuestionModal(true);
  };

  const handleCloseModals = () => {
    setShowExamModal(false);
    setShowQuestionModal(false);
    setShowDeleteModal(false); // Close delete modal when other modals close
  };

  const handleDeleteModalOpen = (exam) => {
    setExamToDelete(exam);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <Button className='mb-3 ms-auto' onClick={handleShowAddModal}>
        Add Exam
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Total Marks</th>
            <th>Pass Marks</th>
            <th>Total Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>{exam.totalMarks}</td>
              <td>{exam.passMarks}</td>
              <td>{exam.totalQuestions}</td>
              <td>
                <Button
                  variant='info'
                  className='mx-1'
                  onClick={() => handleShowEditModal(exam)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant='primary'
                  className='mx-1'
                  onClick={() => handleShowQuestionModal(exam._id)}
                >
                  Add Question
                </Button>{' '}
                <Link to={`ViewQuestions/${exam._id}`} className='mx-1'>
                  <Button variant='success'>View Questions</Button>{' '}
                </Link>
                <Button
                  variant='danger'
                  className='mx-1'
                  onClick={() => handleDeleteModalOpen(exam)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ExamModal
        show={showExamModal}
        onHide={handleCloseModals}
        exam={selectedExam}
      />
      <QuestionModal
        show={showQuestionModal}
        onHide={handleCloseModals}
        examId={selectedExam}
      />
      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemName='exam'
        handleDelete={() => handleDelete(examToDelete._id)}
      />
    </div>
  );
};

export default ExamTable;
