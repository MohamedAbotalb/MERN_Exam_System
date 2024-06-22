import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllResults } from '../../store/resultsSlice';
import { Table } from 'react-bootstrap';

const ResultTable = () => {
  const results = useSelector(selectAllResults);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Exam Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.studentName}</td>
            <td>{result.examName}</td>
            <td>{result.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultTable;
