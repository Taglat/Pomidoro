import { LONG_BREAK, POMODORO, SHORT_BREAK } from "./constants";
import { createSlice } from "@reduxjs/toolkit";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const initialState = {
    mode: POMODORO, 
    modes: {
        [POMODORO]: {
            id: POMODORO,
            time: 25 * 60,
            icon: <SportsKabaddiIcon />,
        }, 
        [SHORT_BREAK]: {
            id: SHORT_BREAK,
            time: 10 * 60,
            icon: <SportsEsportsIcon />,
        },
        [LONG_BREAK]: {
            id: LONG_BREAK,
            time: 5 * 60,
            icon: <BedtimeIcon />,
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
    }
});

export const {
    setMode,
    updateTimeLeft
} = timerSlice.actions;

export default timerSlice.reducer;