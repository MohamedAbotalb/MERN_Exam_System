import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, selectAllExams } from '../store/examsSlice';
import ExamTable from '../components/AdminDashboard/ExamTable';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);

  useEffect(() => {
    if (exams.status === 'idle') {
      dispatch(fetchExams());
    }
  }, [exams.status, dispatch]);

  return (
    <div>
      <h2>Exams</h2>
      <ExamTable />
    </div>
  );
};

export default Exams;