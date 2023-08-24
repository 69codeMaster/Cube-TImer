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
      <div className="app-container">
        <ScrambleProvider>
          <Scramble running={running} />
          <Timer running={running} setRunning={setRunning} />
        </ScrambleProvider>
        <div className="averages-container">
          <Average averageOf={5} running={running} />
          <Average averageOf={12} running={running} />
        </div>
      </div>
      {/* <SideBar>
        <HistoryList />
      </SideBar> */}
    </DbProvider>
  );
}

export default App;
