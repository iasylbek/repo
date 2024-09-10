import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import jobsReducer from '../features/jobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
});
