import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    value: number
  }
  
  const initialState: CounterState = {
    value: 0,
  }

export const counter = createSlice({
    name: 'counter',
    initialState, 
    reducers:{
        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
        resetCount: (state) => {
            state.value = 0;
        }
    }
})

export const { increment, decrement, resetCount } = counter.actions

export default counter.reducer