import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SharedLayout } from './layouts/SharedLayout';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import store from './store/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Registration from './components/Registration';
import Login from './components/Login';
// import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="AdminDashboard/*" element={<AdminDashboard />} /> */}
        {/* <Route path="StudentDashboard/*" element={<AdminDashboard />} /> */}
         <Route exact path='/'  element={<ProtectedRoute  allowedRoles={['admin', 'user']}/>}>
            <Route exact path='AdminDashboard/*' element={<AdminDashboard/>}/>
        </Route> 
         <Route exact path='/'  element={<ProtectedRoute  allowedRoles={['admin', 'user']}/>}>
            <Route exact path='StudentDashboard/*' element={<AdminDashboard/>}/>
        </Route> 
      </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login/>} />
        {/* <Route exact path='/'  element={<ProtectedRoute  allowedRoles={['admin', 'user']}/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
        </Route>                            */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
  );
};

export default App;
