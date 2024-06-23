import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/AdminDashboard/Dashboard';
import Exams from './Exams';
import ViewQuestions from './ViewQuestions';
import Results from './Results';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="Exams" element={<Exams />} />
      <Route path="Exams/ViewQuestions/:id" element={<ViewQuestions />} />
      <Route path="Results" element={<Results />} />
    </Routes>
  );
};

export default AdminDashboard;
