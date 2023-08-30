import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import HistoryList from "./components/History/HistoryList";
import SideBar from "./components/UI/SideBar";
import ScrambleProvider from "./store/ScrambleContext";
import DbProvider from "./store/DbContext";

//TODO fix weird confetti bug
function App() {
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const hide = running || ready;
  return (
    <DbProvider>
      {/* <main className={`app-container ${ready ? "ready" : "not-ready"}`}> */}
      <main className="app-container gird-template">
        <aside className={`side-bar ${hide ? "hide" : "not-ready"}`}>
          <SideBar>
            <HistoryList />
          </SideBar>
        </aside>
        <ScrambleProvider>
          <header className={`scramble ${hide ? "hide" : "not-ready"}`}>
            <Scramble />
          </header>
          <div className="timer">
            <Timer
              running={running}
              setRunning={setRunning}
              ready={ready}
              setReady={setReady}
            />
          </div>
        </ScrambleProvider>
        <footer className={`average-container ${hide ? "hide" : "not-ready"}`}>
          <Average averageOf={5} />
          <Average averageOf={12} />
        </footer>
      </main>
    </DbProvider>
  );
}

export default App;
