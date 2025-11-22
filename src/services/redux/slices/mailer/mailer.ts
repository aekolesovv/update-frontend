import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IData, IEmailState } from '@/types/Mailer.types';
import { fetchSendEmail } from './mailerAPI';

export const sendEmailApi = createAsyncThunk(
    '@@email/sendEmail',
    async (data: IData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await fetchSendEmail(data);
            const responseData = { status: response.status, ok: response.ok };
            return fulfillWithValue(responseData);
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

const initialState: IEmailState = {
    status: 'idle',
    error: '',
    email: '',
};

export const emailSlice = createSlice({
    name: '@@email',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(sendEmailApi.fulfilled, state => {
                state.status = 'success';
                state.error = '';
            })
            .addCase(sendEmailApi.pending, state => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(sendEmailApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? String(action.payload) : 'Ошибка при отправке письма';
            });
    },
});

export const emailReducer = emailSlice.reducer;
