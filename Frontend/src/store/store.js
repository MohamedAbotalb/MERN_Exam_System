import { configureStore } from '@reduxjs/toolkit';
import examsReducer from './examsSlice';
import questionsReducer from './questionsSlice';
import resultsReducer from './resultsSlice';

export default configureStore({
  reducer: {
    exams: examsReducer,
    questions: questionsReducer,
    results: resultsReducer,
  },
});
