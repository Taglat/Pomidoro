import { LONG_BREAK, POMODORO, SHORT_BREAK } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: POMODORO, 
    modes: {
        [POMODORO]: {
            id: POMODORO,
            time: 25 * 60, 
        }, 
        [SHORT_BREAK]: {
            id: SHORT_BREAK,
            time: 10 * 60,
        },
        [LONG_BREAK]: {
            id: LONG_BREAK,
            time: 5 * 60,
        },
    },
}

export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload; 
        }
    }
});

export const {
    setMode
} = timerSlice.actions;

export default timerSlice.reducer;