import cl from './Timer.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setMode } from "../../redux/timerSlice";
import { formatTime } from '../../helpers/formatTime';

const Timer = () => {
    const {mode, modes} = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const jumpTo = useCallback((id) => {
        dispatch(setMode(id));
    }, [dispatch]);
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
    </div>
  )
}

export default Timer