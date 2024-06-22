import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axiosConfig';
import { fetchExamById, updateAnswers, selectCurrentExam, selectAnswers, selectExamStatus, resetExamState } from '../../store/examsSlice';
import '../../css/TakeExam.css';

const TakeExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(60 * 60); 
  const [error, setError] = useState('');

  const exam = useSelector(selectCurrentExam);
  const answers = useSelector(selectAnswers);
  const examStatus = useSelector(selectExamStatus);

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
    dispatch(updateAnswers({ questionId, answer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer
    }));

    const payload = {
      examId: examId,
      answers: formattedAnswers
    };

    try {
      await axios.post(`http://localhost:5000/api/v1/exams/${examId}/submit`, payload);
      navigate('/StudentDashboard/ViewResults');
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

  if (examStatus === 'loading') return <div>Loading...</div>;
  if (examStatus === 'failed') return <div>Failed to load exam</div>;
  if (!exam) return null;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="take-exam-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="timer">
          <span>Time remaining:</span>
          <strong>{formatTime(timer)}</strong>
        </div>
        <h2>{exam.name}</h2>
        <div className="profile">
          <img src="profile_picture_url" alt="Profile" className="profile-pic" />
          <span>Burhanul Islam</span>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="exam-form">
        <div className="question-container">
          <p>Question {currentQuestion + 1} of {exam.questions.length}</p>
          <p>{exam.questions[currentQuestion].text}</p>
          {exam.questions[currentQuestion].options.map(option => (
            <div key={option} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name={exam.questions[currentQuestion].id}
                value={option}
                onChange={() => handleChange(exam.questions[currentQuestion].id, option)}
                checked={answers[exam.questions[currentQuestion].id] === option}
                required
              />
              <label className="form-check-label">
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button type="button" className="btn btn-outline-secondary" onClick={prevQuestion} disabled={currentQuestion === 0}>
            Prev
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={nextQuestion} disabled={currentQuestion === exam.questions.length - 1}>
            Next
          </button>
        </div>
        <div className="pagination mt-4">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`btn btn-outline-primary ${index === currentQuestion ? 'active' : ''}`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button type="submit" className="btn btn-success mt-4">Submit</button>
      </form>
    </div>
  );
};

export default TakeExam;
