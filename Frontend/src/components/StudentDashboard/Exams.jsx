import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchAvailableExamsForUser,
  selectAvailableExams,
  selectAvailableExamsStatus,
  selectAvailableExamsError,
} from '../../store/examsSlice';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAvailableExams);
  const examStatus = useSelector(selectAvailableExamsStatus);
  const error = useSelector(selectAvailableExamsError);

  const { userId } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (examStatus === 'idle' && userId) {
      dispatch(fetchAvailableExamsForUser(userId));
    }
  }, [examStatus, dispatch, userId]);

  let content;

  if (examStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (examStatus === 'succeeded') {
    if (exams.length === 0) {
      content = <p>No available exams at the moment.</p>;
    } else {
      content = (
        <Container>
          <Row>
            {exams.map((exam) => (
              <Col key={exam._id} md={4} className='mb-4'>
                <Card className='text-center'>
                  <Card.Body>
                    <Card.Title>{exam.name}</Card.Title>
                    <Link
                      to={`/StudentDashboard/Exams/${exam._id}`}
                      className='btn btn-primary'
                    >
                      Open Exam
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  } else if (examStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container className='my-4'>
      <h2>Available Exams</h2>
      {content}
    </Container>
  );
};

export default Exams;
