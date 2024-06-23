import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axiosConfig';
import {
  fetchExamById,
  updateAnswers,
  selectCurrentExam,
  selectAnswers,
  selectExamStatus,
  resetExamState,
} from '../../store/examsSlice';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import '../../css/TakeExam.css';

const TakeExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(60 * 60);
  const [error, setError] = useState('');

  const exam = useSelector(selectCurrentExam);
  const answers = useSelector(selectAnswers);
  const examStatus = useSelector(selectExamStatus);
  const { userId } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(fetchExamById(examId));

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      dispatch(resetExamState());
    };
  }, [dispatch, examId]);

  const handleChange = (questionId, answer) => {
    console.log(
      'Updating answer for question:',
      questionId,
      'with answer:',
      answer
    );
    dispatch(updateAnswers({ questionId, answer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    const payload = {
      userId,
      examId,
      answers: formattedAnswers,
    };

    try {
      await axios.post(`http://localhost:5000/api/v1/results/submit`, payload);
      window.location.href = '/StudentDashboard/ViewResults';
    } catch (error) {
      console.error('There was an error submitting the exam!', error);
      setError('Failed to submit the exam. Please try again.');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (examStatus === 'loading')
    return <div className='take-exam-container'>Loading...</div>;
  if (examStatus === 'failed')
    return <div className='take-exam-container'>Failed to load exam</div>;
  if (!exam) return null;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container className='take-exam-container mt-5'>
      <Row className='justify-content-between align-items-center mb-4'>
        <Col className='timer'>
          <span>Time remaining: </span>
          <strong>{formatTime(timer)}</strong>
        </Col>
        <Col className='text-center'>
          <h2>{exam.name}</h2>
        </Col>
        <Col className='text-end'>
          <Button
            type='submit'
            className='w-25'
            variant='success'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit} className='exam-form'>
        <Card>
          <Card.Body>
            <Card.Title>
              Question {currentQuestion + 1} of {exam.questions.length}
            </Card.Title>
            <Card.Text className='fs-3'>
              {exam.questions[currentQuestion].name}
            </Card.Text>
            {exam.questions[currentQuestion].options.map((option) => (
              <Form.Check
                key={option}
                type='radio'
                id={option}
                label={option}
                className='fs-5'
                checked={
                  answers[exam.questions[currentQuestion]._id] === option
                }
                onChange={() =>
                  handleChange(exam.questions[currentQuestion]._id, option)
                }
                required
              />
            ))}
          </Card.Body>
          <Card.Footer className='d-flex justify-content-between mt-4'>
            <Button
              variant='outline-secondary'
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              Prev
            </Button>
            <Button
              variant='outline-secondary'
              onClick={nextQuestion}
              disabled={currentQuestion === exam.questions.length - 1}
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
        <div className='pagination mt-4 mx-auto'>
          {exam.questions.map((_, index) => (
            <Button
              key={index}
              variant={`outline-primary ${
                index === currentQuestion ? 'active' : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </Form>
    </Container>
  );
};

export default TakeExam;
