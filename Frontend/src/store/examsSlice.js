import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchExams = createAsyncThunk('exams/fetchExams', async () => {
  const response = await axios.get('/exams');
  return response.data;
});

export const addExam = createAsyncThunk('exams/addExam', async (newExam) => {
  const response = await axios.post('/exams', newExam);
  return response.data;
});

export const updateExam = createAsyncThunk('exams/updateExam', async ({ id, updatedExam }) => {
  const response = await axios.put(`/exams/${id}`, updatedExam);
  return response.data;
});

export const deleteExam = createAsyncThunk('exams/deleteExam', async (id) => {
  await axios.delete(`/exams/${id}`);
  return id;
});

const examsSlice = createSlice({
  name: 'exams',
  initialState: {
    exams: {
      data: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams.data = action.payload.data;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.exams.data.push(action.payload.data);
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.exams.data.findIndex(exam => exam._id === action.payload.data._id);
        if (index !== -1) {
          state.exams.data[index] = action.payload.data;
        }
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exams.data = state.exams.data.filter(exam => exam._id !== action.payload);
      });
  },
});

export const selectAllExams = (state) => state.exams.exams.data;
export default examsSlice.reducer;
