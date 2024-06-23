import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Async actions for fetching, adding, updating, and deleting exams
export const fetchExams = createAsyncThunk('exams/fetchExams', async () => {
  const response = await axios.get('/exams');
  return response.data;
});

export const addExam = createAsyncThunk('exams/addExam', async (newExam) => {
  const response = await axios.post('/exams', newExam);
  return response.data;
});

export const updateExam = createAsyncThunk(
  'exams/updateExam',
  async ({ id, updatedExam }) => {
    const response = await axios.put(`/exams/${id}`, updatedExam);
    return response.data;
  }
);

export const deleteExam = createAsyncThunk('exams/deleteExam', async (id) => {
  await axios.delete(`/exams/${id}`);
  return id;
});

export const fetchExamById = createAsyncThunk(
  'exams/fetchExamById',
  async (id) => {
    const response = await axios.get(`/exams/${id}`);
    return response.data;
  }
);

export const fetchAvailableExamsForUser = createAsyncThunk(
  'exams/fetchAvailableExamsForUser',
  async (userId) => {
    const response = await axios.get(`/exams/available/${userId}`);
    return response.data.data;
  }
);

const examsSlice = createSlice({
  name: 'exams',
  initialState: {
    exams: {
      data: [],
      status: 'idle',
      error: null,
    },
    currentExam: {
      data: null,
      status: 'idle',
      error: null,
    },
    answers: {},
    submissionStatus: 'idle',
    submissionError: null,
  },
  reducers: {
    updateAnswers: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetExamState: (state) => {
      state.currentExam = { data: null, status: 'idle', error: null };
      state.answers = {};
      state.submissionStatus = 'idle';
      state.submissionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing cases
      .addCase(fetchExams.pending, (state) => {
        state.exams.status = 'loading';
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams.status = 'succeeded';
        state.exams.data = action.payload.data;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.exams.status = 'failed';
        state.exams.error = action.error.message;
      })
      // Additional cases for other async thunks...
      .addCase(fetchExamById.pending, (state) => {
        state.currentExam.status = 'loading';
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.currentExam.status = 'succeeded';
        state.currentExam.data = action.payload.data;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.currentExam.status = 'failed';
        state.currentExam.error = action.error.message;
      })
      // Cases for fetching available exams for user
      .addCase(fetchAvailableExamsForUser.pending, (state) => {
        state.exams.status = 'loading';
      })
      .addCase(fetchAvailableExamsForUser.fulfilled, (state, action) => {
        state.exams.status = 'succeeded';
        state.exams.data = action.payload; // Directly setting the payload as data
      })
      .addCase(fetchAvailableExamsForUser.rejected, (state, action) => {
        state.exams.status = 'failed';
        state.exams.error = action.error.message;
      });
  },
});

// Selectors
export const selectAllExams = (state) => state.exams.exams.data;
export const selectCurrentExam = (state) => state.exams.currentExam.data;
export const selectExamStatus = (state) => state.exams.currentExam.status;
export const selectAnswers = (state) => state.exams.answers;
export const selectSubmissionStatus = (state) => state.exams.submissionStatus;
export const selectSubmissionError = (state) => state.exams.submissionError;
export const selectAvailableExams = (state) => state.exams.exams.data;
export const selectAvailableExamsStatus = (state) => state.exams.exams.status;
export const selectAvailableExamsError = (state) => state.exams.exams.error;

export const { updateAnswers, resetExamState } = examsSlice.actions;

export default examsSlice.reducer;
