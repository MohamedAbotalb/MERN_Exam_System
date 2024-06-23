import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserResults, selectAllResults } from '../../store/resultsSlice';
import { Table } from 'react-bootstrap';

const ViewResults = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectAllResults);
  const resultsStatus = useSelector((state) => state.results.status);
  const error = useSelector((state) => state.results.error);
  const { userId } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (resultsStatus === 'idle' && userId) {
      dispatch(fetchUserResults(userId));
    }
  }, [dispatch, userId, resultsStatus]);

  let content;

  if (resultsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (resultsStatus === 'succeeded') {
    if (results.length === 0) {
      content = <p>No results available at the moment.</p>;
    } else {
      content = (
        <div>
          <h2 className='my-3'>My Results</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope='col'>Exam Name</th>
                <th scope='col'>Total Marks</th>
                <th scope='col'>Pass Marks</th>
                <th scope='col'>Score</th>
                <th scope='col'>Status</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.exam._id}>
                  <td>{result.exam.name}</td>
                  <td>{result.exam.totalMarks}</td>
                  <td>{result.exam.passMarks}</td>
                  <td>{result.score}</td>
                  <td>{result.status}</td>
                  <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  } else if (resultsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default ViewResults;
