import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, deleteExam } from '../../store/slices/examSlice';
import ExamTable from './ExamTable';
import ExamModal from './ExamModal';

const Exams = () => {
    const dispatch = useDispatch();
    const exams = useSelector(state => state.exams.items);

    useEffect(() => {
        dispatch(fetchExams());
    }, [dispatch]);

    return (
        <div className="container-fluid">
            <h1 className="mt-4">Exams</h1>
            <button className="btn btn-primary" data-toggle="modal" data-target="#examModal">Add Exam</button>
            <ExamTable exams={exams} onDelete={(id) => dispatch(deleteExam(id))} />
            <ExamModal />
        </div>
    );
};

export default Exams;
