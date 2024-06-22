import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './layouts/SharedLayout';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import store from './store/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="AdminDashboard/*" element={<AdminDashboard />} />
          <Route path="StudentDashboard/*" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
