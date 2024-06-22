import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import axiosInstance from '../../axiosConfig';

const Dashboard = () => {
  const [examCount, setExamCount] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const examCountResponse = await axiosInstance.get('/exams/count');
        const resultCountResponse = await axiosInstance.get('/results/count');
        console.log(examCountResponse);
        setExamCount(examCountResponse.data.data);
        setResultCount(resultCountResponse.data.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

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
                  <Card.Text className='fs-2'>{examCount}</Card.Text>
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
                  <Card.Text className='fs-2'>{resultCount}</Card.Text>
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
