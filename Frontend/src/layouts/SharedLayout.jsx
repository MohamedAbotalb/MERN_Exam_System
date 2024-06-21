import React from 'react'
import { NavBar } from '../components/NavBar';
import { Outlet } from 'react-router-dom';
export  function SharedLayouts() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}