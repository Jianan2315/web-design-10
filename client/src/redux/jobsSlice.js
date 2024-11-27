import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const response = await axios.get('/get/jobs');
    return response.data.jobs;
});

export const addJob = createAsyncThunk('jobs/addJob', async (jobData) => {
    await axios.post('/create/job', jobData);
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: { list: [], loading: false },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchJobs.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default jobsSlice.reducer;
