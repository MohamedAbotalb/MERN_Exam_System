import React from 'react';
import { NavLink } from 'react-router-dom';


export function Sidebar() {
  const userType = 'admin';

  return (
    <div className="sidebar bg-dark text-white p-3 pt-5 min-vh-100">
      <h4 className="sideHeader text-center mb-4">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/AdminDashboard/">Dashboard</NavLink>
        </li>
        {userType === 'admin' && (
          <>
            <li className="nav-item rounded " >
              <NavLink className="nav-link text-white" to="/AdminDashboard/Exams">Exams</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/AdminDashboard/Results">Results</NavLink>
            </li>
          </>
        )}
        {userType === 'student' && (
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/StudentDashboard/Results">Results</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
