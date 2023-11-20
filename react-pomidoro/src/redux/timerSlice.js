import { LONG_BREAK, POMODORO, SHORT_BREAK } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: POMODORO, 
    volume: true,
    modes: {
        [POMODORO]: {
            id: POMODORO,
            time: 25 * 60,
            iconName: 'SportsKabaddiIcon', 
        }, 
        [SHORT_BREAK]: {
            id: SHORT_BREAK,
            time: 10 * 60,
            iconName: 'SportsEsportsIcon',
        },
        [LONG_BREAK]: {
            id: LONG_BREAK,
            time: 5 * 60,
            iconName: 'BedtimeIcon',
        },
    },
}

export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload; 
        },
        setVolume: (state) => {
            state.volume = !state.volume;
        }
    }
});

export const {
    setMode,
    setVolume
} = timerSlice.actions;

export default timerSlice.reducer;