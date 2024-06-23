import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, selectAllExams } from '../store/examsSlice';
import ExamTable from '../components/AdminDashboard/ExamTable';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  return (
    <div>
      <h2 className='my-3'>Exams</h2>
      <ExamTable />
    </div>
  );
};

export default Exams;
