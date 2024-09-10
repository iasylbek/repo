// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get('/api/jobs');
  return response.data;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await axios.post('/api/auth/login', userData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(state, action);
        // Assuming you have a jobs slice, handle the jobs data here
        // e.g., state.jobs = action.payload;
      });
  },
});

export default authSlice.reducer;
