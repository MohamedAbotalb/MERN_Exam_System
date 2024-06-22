import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <Container className='home my-5 col-8'>
      <Row className='mb-4'>
        <Col>
          <h2 className='text-center'>Online Exam System</h2>
          <p className='text-center fs-5'>
            Welcome to the Online Exam System. This platform provides a
            comprehensive solution for conducting and managing online exams
            efficiently and effectively. Whether you are a student looking to
            take an exam or an admin managing the process, our system has got
            you covered.
          </p>
        </Col>
      </Row>
      <Row className='text-center'>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>For Students</Card.Title>
              <Card.Text>
                Register to access your exams and view your results.
              </Card.Text>
              <NavLink to='/register'>
                <Button variant='primary'>Student</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>For Admins</Card.Title>
              <Card.Text>
                Log in to manage exams, monitor results, and oversee the system.
              </Card.Text>
              <NavLink to='/login'>
                <Button variant='secondary'>Admin</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
