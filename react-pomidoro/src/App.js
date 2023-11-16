import st from "./App.module.css";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <div className={st.container}>
       <Timer />
    </div>
  );
}

export default App;
