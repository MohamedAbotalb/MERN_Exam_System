import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsByExamId } from '../store/questionsSlice';
import QuestionTable from '../components/AdminDashboard/QuestionTable';
import { useParams } from 'react-router-dom';

const ViewQuestions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);

  useEffect(() => {
    dispatch(fetchQuestionsByExamId(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2 className='my-3'>Questions for Exam </h2>
      <QuestionTable questions={questions} examId={id} />
    </div>
  );
};

export default ViewQuestions;
