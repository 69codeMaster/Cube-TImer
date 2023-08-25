import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import Average from "./components/Average";
import HistoryList from "./components/HistoryList";
import SideBar from "./components/UI/SideBar";
import ScrambleProvider from "./store/ScrambleContext";
import DbProvider from "./store/DbContext";

// TODO : turn history to a scrollable table with header

function App() {
  const [running, setRunning] = useState(false);
  return (
    <DbProvider>
      <aside className="side-bar">
        <SideBar>{/* <HistoryList /> */}</SideBar>
      </aside>
      <main className="app-container">
        <ScrambleProvider>
          <header className="scramble">
            <Scramble running={running} />
          </header>
          <div className="timer">
            <Timer running={running} setRunning={setRunning} />
          </div>
        </ScrambleProvider>
        <footer className="average">
          <Average averageOf={5} running={running} />
          <Average averageOf={12} running={running} />
        </footer>
      </main>
    </DbProvider>
  );
}

export default App;
