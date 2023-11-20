import cl from './Timer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect} from "react";
import { setMode, setVolume} from "../../redux/timerSlice";
import { formatTime } from '../../helpers/formatTime';
import { styled } from 'styled-components';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import useCountdown from '../../hooks/useCountdown';
import '../../styles/fonts/Cracked\ Code.ttf';
import { player } from '../../helpers/soundPlayer';
import { START_SOUND, TICK_SOUND, FINISH_SOUND, POMODORO, LONG_BREAK, SHORT_BREAK, LONG_BREAK_TICK, SHORT_BREAK_TICK, POMODORO_FINISH_SOUND } from '../../redux/constants';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const startSound = player({
    asset: START_SOUND,
});  
const tickingSound = player({
    asset: TICK_SOUND,
    loop: true,
});
const finishSound = player({
    asset: FINISH_SOUND,
});

const ToggleBtn = styled.button`
    padding: 5px 5px;
    cursor: pointer;
    background-color: ${props => props.ticking ? 'var(--pause-color)' : 'var(--primary-color)'}; /* Замените 'red' и 'green' на ваши цвета */
`
const StopBtn = styled.button`
    padding: 5px 5px;
    cursor: pointer;
    background-color: var(--reset-color)
`
const ToggleSoundBtn = styled.button`
    padding: 5px 5px;
    cursor: pointer;
    background-color: ${props => props.volume ? 'var(--primary-color)' : 'var(--reset-color)'};
`

const iconMap = {
    SportsKabaddiIcon: <SportsKabaddiIcon />,
    SportsEsportsIcon: <SportsEsportsIcon />,
    BedtimeIcon: <BedtimeIcon />,
}

const Timer = () => {
    const {mode, modes, volume} = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const {ticking, start, stop, reset, timeLeft} = useCountdown({
        minutes: modes[mode].time,
        onStart: () => {
            if (mode === POMODORO) {
                tickingSound.play();
            } 
        },
        onStop: () => {
            tickingSound.stop();
        },
        onComplete: () => {
            if (mode === POMODORO) {
                tickingSound.stop();
            }
            finishSound.play();
        },
    });

    const jumpTo = useCallback((id) => {
        dispatch(setMode(id));
        reset();
    }, [dispatch, reset]);


    const toggleTimer = useCallback(() => {
        startSound.play()
        if (ticking) {
            stop(); 
        } else {
            start();
        }
    }, [start, stop, ticking]);

    const resetTimer = useCallback(() => {
        reset();
    }, [mode])

    const toggleVolume = useCallback(() => {
        let newVolume;
        
        if (volume) {
            newVolume = 0;
        } else {
            newVolume = 50;
        }

        startSound.setVolume(newVolume);
        tickingSound.setVolume(newVolume);
        finishSound.setVolume(newVolume);
        
        dispatch(setVolume());
    }, [volume, startSound, tickingSound, finishSound, setVolume]);

    return (
    <div className={cl.container}>  
        <nav className={cl.nav}>
            {Object.values(modes).map(({id, iconName, time}) => {
                return <button className={`${cl.modeBtn} ${id === mode ? cl.modeBtn_active : ''}`} key={id} active={id === mode} id={id} onClick={() => jumpTo(id)} title={`${id} : ${time / 60} min`} >{iconMap[iconName]}</button> 
            })}
        </nav>
        <div className={cl.display}>
            {formatTime(timeLeft)}
        </div>
        <div className={cl.btns}>
            <ToggleBtn ticking={ticking} onClick={() => toggleTimer()}>
                {ticking ? <PauseCircleIcon /> : <PlayCircleIcon />}
            </ToggleBtn>
            <StopBtn onClick={() => resetTimer()}>
                <StopCircleIcon />
            </StopBtn>
        </div>
        <div className="setting-btns">
            <ToggleSoundBtn volume={volume} onClick={() => toggleVolume()}>{volume ? <VolumeDownIcon /> : <VolumeOffIcon />}</ToggleSoundBtn>
        </div>
    </div>
  )
}

export default Timer