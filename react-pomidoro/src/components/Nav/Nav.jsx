import st from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/timerSlice";
import { useCallback } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const { mode, modes } = useSelector((state) => state.timer);

  const jumpTo = useCallback((id) => {
    dispatch(setMode(id));
  }, [dispatch]);

  console.log(mode)

  return (
    <nav className={st.nav}>
      {Object.values(modes).map(({ id }) => (
        <button
          key={id}
          active={id === mode}
          id={id}
          onClick={() => jumpTo(id)}
          className={st.btn}
        >
          {id}
        </button>
      ))}
      <p>{mode}</p>
    </nav>
  );
};

export default Nav;
