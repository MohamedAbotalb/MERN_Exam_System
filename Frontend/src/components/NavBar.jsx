import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar bg='dark' variant='dark'>
      <div className='container-fluid px-5'>
        <Navbar.Brand>Online Exam System</Navbar.Brand>
        <Nav className='ms-auto'>
          <NavLink className='nav-link'>{user.username}</NavLink>
          {isLoggedIn ? (
            <Nav.Link className='nav-link' onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <NavLink className='nav-link' to='/login'>
              Login
            </NavLink>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}
