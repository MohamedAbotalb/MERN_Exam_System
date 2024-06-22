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
          <li><Link to="exams">Exams</Link></li>
          <li><Link to="results">View Results</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="exams" element={<Exams />} />
        <Route path="exams/:examId" element={<TakeExam />} />
        <Route path="results" element={<ViewResults />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
