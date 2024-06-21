import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectAllQuestions } from '../store/questionsSlice';
import QuestionTable from '../components/AdminDashboard/QuestionTable';
import { useParams } from 'react-router-dom';

const ViewQuestions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);

  useEffect(() => {
    dispatch(fetchQuestions(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Questions</h2>
      <QuestionTable questions={questions} />
    </div>
  );
};

export default ViewQuestions;
