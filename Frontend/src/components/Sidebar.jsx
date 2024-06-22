import React from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const role = localStorage.getItem('role');

  return (
    <div className='sidebar bg-dark text-white p-3 pt-5 min-vh-100'>
      <h4 className='sideHeader text-center mb-4'>Dashboard</h4>
      <ul className='nav flex-column'>
        {role === 'admin' && (
          <>
            <li className='nav-item'>
              <NavLink className='nav-link text-white' to='/AdminDashboard/'>
                Dashboard
              </NavLink>
            </li>
            <li className='nav-item rounded '>
              <NavLink
                className='nav-link text-white'
                to='/AdminDashboard/Exams'
              >
                Exams
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link text-white'
                to='/AdminDashboard/Results'
              >
                Results
              </NavLink>
            </li>
          </>
        )}
        {role === 'user' && (
          <>
            <li className='nav-item'>
              <NavLink className='nav-link text-white' to='/StudentDashboard/'>
                Dashboard
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link text-white'
                to='/StudentDashboard/Exams'
              >
                Available Exams
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link text-white'
                to='/StudentDashboard/ViewResults'
              >
                My Results
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
