import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk('results/fetchResults', async () => {
  const response = await axios.get('/api/results');
  return response.data;
});

const resultsSlice = createSlice({
  name: 'results',
  initialState: { results: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default resultsSlice.reducer;
export const selectAllResults = (state) => state.results.results;
