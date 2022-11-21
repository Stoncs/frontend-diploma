import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/app/application.store';

export interface CounterState {
  value: number;
}

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncRandom.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const asyncRandom = createAsyncThunk('counter/asyncRandom', async () => {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(Math.round(Math.random() * 100 - 50));
    }, 1000);
  });
});

export const { increment, decrement } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export const counterReducer = counterSlice.reducer;
