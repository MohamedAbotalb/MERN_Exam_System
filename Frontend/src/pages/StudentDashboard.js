import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Results from './Results';

const StudentDashboard = () => {
  return (
    <Routes>
      <Route path="Results" element={<Results />} />
    </Routes>
  );
};

export default StudentDashboard;
