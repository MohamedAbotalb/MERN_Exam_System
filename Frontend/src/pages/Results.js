import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults, selectAllResults } from '../store/resultsSlice';
import ResultTable from '../components/AdminDashboard/ResultTable';

const Results = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectAllResults);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  return (
    <div>
      <h2>Results</h2>
      <ResultTable results={results} />
    </div>
  );
};

export default Results;
