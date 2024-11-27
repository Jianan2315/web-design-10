import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/user/getAll');
    return response.data.users;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: { list: [], loading: false },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default usersSlice.reducer;
