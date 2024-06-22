import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllExams, deleteExam } from '../../store/examsSlice';
import { Button, Table } from 'react-bootstrap';
import ExamModal from './ExamModal';

const ExamTable = () => {
  const dispatch = useDispatch();
  const exams = useSelector(selectAllExams);
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteExam(id));
  };

  const handleShowAddModal = () => {
    setSelectedExam(null);
    setShowModal(true);
  };

  const handleShowEditModal = (exam) => {
    setSelectedExam(exam);
    setShowModal(true);
  };

  return (
    <div>
      <Button onClick={handleShowAddModal}>Add Exam</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>
                <Button onClick={() => handleShowEditModal(exam)}>Edit</Button>
                <Button onClick={() => handleDelete(exam.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ExamModal show={showModal} onHide={() => setShowModal(false)} exam={selectedExam} />
    </div>
  );
};

export default ExamTable;
