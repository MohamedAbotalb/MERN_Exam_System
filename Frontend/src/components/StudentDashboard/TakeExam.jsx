import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/exams/${examId}`)
      .then(response => {
        setExam(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the exam!', error);
      });
  }, [examId]);

  const handleChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      examId: examId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }))
    };

    axios.post(`http://localhost:5000/api/v1/exams/${examId}/submit`, payload)
      .then(response => {
        navigate('/StudentDashboard/results');
      })
      .catch(error => {
        console.error('There was an error submitting the exam!', error);
      });
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div>
      <h2>{exam.name}</h2>
      <form onSubmit={handleSubmit}>
        {exam.questions.map(question => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.options.map(option => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={() => handleChange(question.id, option)}
                    required
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Exam</button>
      </form>
    </div>
  );
};

export default TakeExam;
