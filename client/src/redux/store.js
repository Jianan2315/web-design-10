import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import jobsReducer from './jobsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        jobs: jobsReducer
    }
});
