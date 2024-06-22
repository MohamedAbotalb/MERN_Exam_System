import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { selectAllExams } from '../../store/examsSlice';
import { selectAllResults } from '../../store/resultsSlice';

const Dashboard = () => {
  const exams = useSelector(selectAllExams);
  const results = useSelector(selectAllResults);

  return (
    <Container className='dashboard my-5'>
      <h1 className='mb-4'>Overview</h1>
      <Row>
        <Col md={6}>
          <Card className='text-white bg-primary mb-3'>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <i className='bi bi-file-earmark-text-fill fs-1 me-3'></i>
                <div>
                  <Card.Title>Total Exams</Card.Title>
                  <Card.Text className='fs-2'>{exams.length}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='text-white bg-success mb-3'>
            <Card.Body>
              <div className='d-flex align-items-center'>
                <i className='bi bi-graph-up fs-1 me-3'></i>
                <div>
                  <Card.Title>Total Results</Card.Title>
                  <Card.Text className='fs-2'>{results.length}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
