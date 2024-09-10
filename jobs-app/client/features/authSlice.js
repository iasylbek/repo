// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../src/axiosConfig';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get('http://localhost:5000/api/jobs');
  return response.data;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      userData
    );

    debugger;

    console.log('response', response);
    localStorage.setItem('token', response.data.token); // Store the token
    console.log('Token stored:', response.data.token); // Log token

    // return response.data;
    return { token: response.data.token, user: response.data.user };
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (userData) => {
//     const response = await axios.post(
//       'http://localhost:5000/api/auth/login',
//       userData
//     );
//     return response.data;
//   }
// );

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
        debugger;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('User state after login:', state.user);
        console.log('state', state);
        console.log('action', action);
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(state, action);
        // Assuming you have a jobs slice, handle the jobs data here
        // e.g., state.jobs = action.payload;
      });
  },
});

export default authSlice.reducer;
