import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllExams } from '../../store/examsSlice';
import { selectAllResults } from '../../store/resultsSlice';

const Dashboard = () => {
  const exams = useSelector(selectAllExams);
  const results = useSelector(selectAllResults);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Exams</h3>
          <p>10</p>
          {/* <p>{exams.length}</p> */}

        </div>
        <div className="stat-card">
          <h3>Total Results</h3>
          {/* <p>{results.length}</p> */}
          <p>20</p>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
