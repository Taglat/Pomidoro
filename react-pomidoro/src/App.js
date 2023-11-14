import st from "./App.module.css";
import Display from "./components/Display/Display";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className={st.container}>
      <Nav />
      <Display />
    </div>
  );
}

export default App;
