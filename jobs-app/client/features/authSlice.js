import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../src/axiosConfig';

export const BASE_URL = 'http://localhost:5000';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(`${BASE_URL}/api/jobs`);
  return response.data;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
    localStorage.setItem('token', response.data.token);

    return { token: response.data.token, user: response.data.user };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(state, action);
      });
  },
});

export default authSlice.reducer;
