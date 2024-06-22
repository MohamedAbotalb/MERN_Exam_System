import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

const initialState = {
  questions: [],
  status: 'idle',
  error: null,
};

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get('/questions');
  return response.data;
});

export const fetchQuestionsByExamId = createAsyncThunk('questions/fetchQuestionsByExamId', async (examId) => {
  const response = await axios.get(`/exams/${examId}/questions`);
  return response.data; // Ensure to extract 'data' from the response
});


export const addQuestion = createAsyncThunk('questions/addQuestion', async ({ examId, newQuestion }) => {
  const response = await axios.post(`/exams/${examId}/questions`, newQuestion);
  return response.data;
});

export const updateQuestion = createAsyncThunk('questions/updateQuestion', async ({ questionId, updatedQuestion }) => {
  const response = await axios.put(`/questions/${questionId}`, updatedQuestion);
  return response.data;
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionId) => {
  await axios.delete(`/questions/${questionId}`);
  return questionId;
});

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
        state.questions = action.payload.data;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchQuestionsByExamId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionsByExamId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload.data;
      })
      .addCase(fetchQuestionsByExamId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(question => question._id === action.payload._id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(question => question._id !== action.payload);
      });
  },
});

export const selectAllQuestions = (state) => state.questions.questions;


export default questionsSlice.reducer;
