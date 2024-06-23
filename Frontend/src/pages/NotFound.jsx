import React from 'react';

export default function NotFound() {
  return (
    <>
      <div className='text-center my-5 py-5'>
        <h1 className='fs-1'>404 - Not Found</h1>
        <p className='fs-4'>The page you are looking for does not exist.</p>
        <a className='btn btn-primary mt-3' href='/'>
          Go to Home
        </a>
      </div>
    </>
  );
}
