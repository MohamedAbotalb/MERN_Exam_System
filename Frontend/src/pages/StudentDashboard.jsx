import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Exams from '../components/StudentDashboard/Exams';
import TakeExam from '../components/StudentDashboard/TakeExam';
import ViewResults from '../components/StudentDashboard/ViewResults';

const StudentDashboard = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Navigate to='Exams' />} />
        <Route index path='Exams' element={<Exams />} />
        <Route path='Exams/:examId' element={<TakeExam />} />
        <Route path='ViewResults' element={<ViewResults />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
