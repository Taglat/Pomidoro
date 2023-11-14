import st from './Display.module.css';
import { useSelector } from "react-redux";

const Display = () => {
    const {mode, modes} = useSelector(state => state.timer)

  return (
    <div className={st.time}>
        {modes[mode].time}
    </div>
  )
}

export default Display