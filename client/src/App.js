import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import HistoryList from "./components/History/HistoryList";
import SideBar from "./components/UI/SideBar";
import ScrambleProvider from "./store/ScrambleContext";
import DbProvider from "./store/DbContext";

function App() {
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <DbProvider>
      {/* <main className={`app-container ${ready ? "ready" : "not-ready"}`}> */}
      <main className="app-container not-ready">
        <aside className="side-bar">
          <SideBar ready={ready}>
            <HistoryList />
          </SideBar>
        </aside>
        <ScrambleProvider>
          <header className="scramble">
            <Scramble running={ready} />
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
        <footer className="average">
          <Average averageOf={5} running={ready} />
          <Average averageOf={12} running={ready} />
        </footer>
      </main>
    </DbProvider>
  );
}

export default App;
