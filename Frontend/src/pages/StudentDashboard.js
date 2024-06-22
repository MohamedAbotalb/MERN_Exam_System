import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Exams from '../components/StudentDashboard/Exams';
import TakeExam from '../components/StudentDashboard/TakeExam';
import ViewResults from '../components/StudentDashboard/ViewResults';

const StudentDashboard = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='Exams'>Exams</Link>
          </li>
          <li>
            <Link to='ViewResults'>View Results</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='Exams' element={<Exams />} />
        <Route path='Exams/:examId' element={<TakeExam />} />
        <Route path='Results' element={<ViewResults />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
