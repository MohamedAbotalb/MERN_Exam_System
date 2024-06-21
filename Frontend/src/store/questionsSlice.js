import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  questions: [],
  status: 'idle',
  error: null,
};

// Thunks
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get('/api/questions');
  return response.data;
});

export const addQuestion = createAsyncThunk('questions/addQuestion', async (newQuestion) => {
  const response = await axios.post('/api/questions', newQuestion);
  return response.data;
});

export const updateQuestion = createAsyncThunk('questions/updateQuestion', async (updatedQuestion) => {
  const response = await axios.put(`/api/questions/${updatedQuestion.id}`, updatedQuestion);
  return response.data;
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionId) => {
  await axios.delete(`/api/questions/${questionId}`);
  return questionId;
});

// Slice
const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(question => question.id === action.payload.id);
        state.questions[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(question => question.id !== action.payload);
      });
  },
});

// Selectors
export const selectAllQuestions = (state) => state.questions.questions;

export const selectQuestionsByExam = createSelector(
  [selectAllQuestions, (state, examId) => examId],
  (questions, examId) => questions.filter(question => question.examId === examId)
);

export default questionsSlice.reducer;
