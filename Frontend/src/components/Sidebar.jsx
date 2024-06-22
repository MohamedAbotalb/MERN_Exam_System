import React from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const userType = 'student';

  return (
    <div className="sidebar bg-dark text-white p-3 h-100">
      <h4 className="text-center">Dashboard Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/AdminDashboard">Dashboard</NavLink>
        </li>
        {userType === 'admin' && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/AdminDashboard/Exams">Exams</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/AdminDashboard/Results">Results</NavLink>
            </li>
          </>
        )}
        {userType === 'student' && (
          <>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/StudentDashboard/Exams">Available Exams</NavLink>
          </li>          
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/StudentDashboard/ViewResults">My Results</NavLink>
          </li>
          </>
        )}
      </ul>
    </div>
  );
}