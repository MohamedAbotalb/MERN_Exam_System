import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './layouts/SharedLayout';
import AdminDashboard from './pages/AdminDashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="AdminDashboard/*" element={<AdminDashboard />} />
        <Route path="StudentDashboard/*" element={<AdminDashboard />} />

      </Route>
    </Routes>
  );
};

export default App;
