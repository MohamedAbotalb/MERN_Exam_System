import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SharedLayout } from './layouts/SharedLayout';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './pages/Home';
// import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Registration />} />

      <Route element={<SharedLayout />}>
        <Route
          path='AdminDashboard/*'
          element={<ProtectedRoute allowedRoles={['admin']} />}
        >
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route
          path='StudentDashboard/*'
          element={<ProtectedRoute allowedRoles={['user']} />}
        >
          <Route index element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
