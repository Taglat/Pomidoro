import cl from './Timer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setMode } from "../../redux/timerSlice";
import { formatTime } from '../../helpers/formatTime';
import { styled } from 'styled-components';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import useCountdown from '../../hooks/useCountdown';
import '../../styles/fonts/Cracked\ Code.ttf';

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

const Timer = () => {
    const {mode, modes} = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const {ticking, start, stop, reset, timeLeft} = useCountdown({
        minutes: modes[mode].time,
        leftMinutes: modes[mode].timeLeft,
        onStart: () => {},
        onStop: () => {},
        onComplete: () => {},
    });

    const jumpTo = useCallback((id) => {
        dispatch(setMode(id));
    }, [dispatch]);


    const toggleTimer = useCallback(() => {
        if (ticking) {
            stop(); 
        } else {
            start();
        }
    }, [start, stop, ticking]);

    const resetTimer = useCallback(() => {
        reset();
    }, [modes])

  return (
    <div className={cl.container}>
        <nav className={cl.nav}>
            {Object.values(modes).map(({id, icon, time}) => {
                return <button className={`${cl.modeBtn} ${id === mode ? cl.modeBtn_active : ''}`} key={id} active={id === mode} id={id} onClick={() => jumpTo(id)} title={`${id} : ${time / 60} min`} >{icon}</button> 
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
    </div>
  )
}

export default Timer