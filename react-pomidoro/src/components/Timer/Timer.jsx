import cl from './Timer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { setMode } from "../../redux/timerSlice";
import { formatTime } from '../../helpers/formatTime';
import { styled } from 'styled-components';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const ToggleBtn = styled.button`
    padding: 5px 5px;
    cursor: pointer;
    background-color: ${props => props.ticking ? 'gray' : 'green'}; /* Замените 'red' и 'green' на ваши цвета */
`
const StopBtn = styled.button`
    padding: 5px 5px;
    cursor: pointer;
    background-color: red
`

const Timer = () => {
    const {mode, modes} = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const [ticking, setTicking] = useState(false);

    const jumpTo = useCallback((id) => {
        dispatch(setMode(id));
    }, [dispatch]);

    const handleToggle = () => {
        setTicking(!ticking);
    }

  return (
    <div className={cl.container}>
        <nav className={cl.nav}>
            {Object.values(modes).map(({id}) => {
                return <button className={cl.modeBtn} key={id} active={id === mode} id={id} onClick={() => jumpTo(id)}>{id}</button> 
            })}
        </nav>
        <div className={cl.display}>
            {formatTime(modes[mode].time)}
        </div>
        <div className={cl.btns}>
            <ToggleBtn ticking={ticking} onClick={handleToggle}>
                {ticking ? <PauseCircleIcon /> : <PlayCircleIcon />}
            </ToggleBtn>
            <StopBtn onClick={handleToggle}>
                <StopCircleIcon />
            </StopBtn>
        </div>
    </div>
  )
}

export default Timer