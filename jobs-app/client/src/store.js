import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/authSlice';
import jobsReducer from '../features/jobsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/authSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    jobs: jobsReducer,
  },
});

export const persistor = persistStore(store);
