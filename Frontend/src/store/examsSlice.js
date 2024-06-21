import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExams = createAsyncThunk('exams/fetchExams', async () => {
  const response = await axios.get('/api/exams');
  return response.data;
});

export const addExam = createAsyncThunk('exams/addExam', async (newExam) => {
  const response = await axios.post('/api/exams', newExam);
  return response.data;
});

export const updateExam = createAsyncThunk('exams/updateExam', async ({ id, updatedExam }) => {
  const response = await axios.put(`/api/exams/${id}`, updatedExam);
  return response.data;
});

export const deleteExam = createAsyncThunk('exams/deleteExam', async (id) => {
  await axios.delete(`/api/exams/${id}`);
  return id;
});

const examsSlice = createSlice({
  name: 'exams',
  initialState: { exams: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.findIndex(exam => exam.id === action.payload.id);
        state.exams[index] = action.payload;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams = state.exams.filter(exam => exam.id !== action.payload);
      });
  },
});

export default examsSlice.reducer;
export const selectAllExams = (state) => state.exams.exams;
