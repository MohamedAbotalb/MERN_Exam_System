import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, deleteExam } from '../../store/slices/examSlice';
import ExamTable from './ExamTable';
import ExamModal from './ExamModal';
import QuestionModal from './QuestionModal';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.items);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  const handleShowQuestionModal = (examId) => {
    setSelectedExamId(examId);
    setShowQuestionModal(true);
  };

  const handleCloseQuestionModal = () => {
    setSelectedExamId(null);
    setShowQuestionModal(false);
  };

  return (
    <div className='container-fluid '>
      <div>
        <h2>Exams</h2>
        <button
          className='btn btn-primary '
          onClick={() => handleShowQuestionModal(null)}
        >
          Add Exam
        </button>
      </div>
      <ExamTable
        exams={exams}
        onDelete={(id) => dispatch(deleteExam(id))}
        onAddQuestion={handleShowQuestionModal}
      />
      <ExamModal />
      <QuestionModal
        show={showQuestionModal}
        onHide={handleCloseQuestionModal}
        examId={selectedExamId}
      />
    </div>
  );
};

export default Exams;
