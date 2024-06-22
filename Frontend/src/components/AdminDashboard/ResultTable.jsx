import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults, selectAllResults } from '../../store/resultsSlice';
import { Table } from 'react-bootstrap';

const ResultTable = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectAllResults);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Exam</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result.user.username}</td>
              <td>{result.exam.name}</td>
              <td>{result.score}</td>
              <td>{result.status}</td>
              <td>{new Date(result.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultTable;
