import React from 'react';
import { NavBar } from '../components/NavBar';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export function SharedLayout() {
  return (
    <>
      <NavBar />

    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar/>
        </div>
        <div className="col-10">
          <Outlet/>
        </div>
      </div>
    </div>
    </>
  );
}
