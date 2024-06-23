import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async () => {
    try {
      const response = await axios.get('/results');
      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

// Async thunk action to fetch a result by ID
export const fetchResultById = createAsyncThunk(
  'results/fetchResultById',
  async (id) => {
    try {
      const response = await axios.get(`/results/${id}`);
      return response.data.data; // Return the result data from the response
    } catch (error) {
      throw Error(error.response.data.message); // Throw error with error message
    }
  }
);

// Async thunk action to submit a result
export const submitResult = createAsyncThunk(
  'results/submitResult',
  async ({ examId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/results/submit', { examId, answers });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to fetch results for a specific user
export const fetchUserResults = createAsyncThunk(
  'results/fetchUserResults',
  async (userId) => {
    try {
      const response = await axios.get(`/results/user/${userId}`);
      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

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
      })
      // Fetch result by ID reducers
      .addCase(fetchResultById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResultById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = [action.payload]; // Store the single result in an array
      })
      .addCase(fetchResultById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch user results reducers
      .addCase(fetchUserResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchUserResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default resultsSlice.reducer;
export const selectAllResults = (state) => state.results.results;
