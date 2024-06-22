import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllExams, deleteExam } from '../../store/examsSlice';
import { Button, Table } from 'react-bootstrap';
import ExamModal from './ExamModal';
import QuestionModal from './QuestionModal'; 
import { Link } from 'react-router-dom';


const ExamTable = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteExam(id));
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
  };

  return (
    <div>
      <Button onClick={handleShowAddModal}>Add Exam</Button>
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
                <Button onClick={() => handleShowEditModal(exam)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(exam._id)}>Delete</Button>
                <Button variant="info" onClick={() => handleShowQuestionModal(exam._id)}>Add Question</Button>
                <Link to={`ViewQuestions/${exam._id}`}>
                  <Button variant="success">View Questions</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ExamModal show={showExamModal} onHide={handleCloseModals} exam={selectedExam} />
      <QuestionModal show={showQuestionModal} onHide={handleCloseModals} examId={selectedExam} />
    </div>
  );
};

export default ExamTable;
