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
      <ul>
        {results.map((result) => (
          <li key={result.examId}>
            <h3>{result.examName}</h3>
            <p>Score: {result.score}</p>
          </li>
        ))}
      </ul>
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
