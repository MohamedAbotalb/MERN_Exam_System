import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExams } from '../../store/examsSlice';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  const examStatus = useSelector((state) => state.exams.status);
  const error = useSelector((state) => state.exams.error);

  useEffect(() => {
    if (examStatus === 'idle') {
      dispatch(fetchExams());
    }
  }, [examStatus, dispatch]);

  let content;

  if (examStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (examStatus === 'succeeded') {
    content = (
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            <Link to={`/StudentDashboard/exams/${exam.id}`}>{exam.name}</Link>
          </li>
        ))}
      </ul>
    );
  } else if (examStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Available Exams</h2>
      {content}
    </div>
  );
};

export default Exams;
