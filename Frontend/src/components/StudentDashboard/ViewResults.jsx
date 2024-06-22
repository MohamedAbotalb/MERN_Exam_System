import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../../store/resultsSlice';

const ViewResults = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results);
  const resultsStatus = useSelector((state) => state.results.status);
  const error = useSelector((state) => state.results.error);

  useEffect(() => {
    if (resultsStatus === 'idle') {
      dispatch(fetchResults());
    }
  }, [resultsStatus, dispatch]);

  let content;

  if (resultsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (resultsStatus === 'succeeded') {
    content = (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Exam Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.examId}>
              <td>{result.studentName}</td>
              <td>{result.examName}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (resultsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Results</h2>
      {content}
    </div>
  );
};

export default ViewResults;
