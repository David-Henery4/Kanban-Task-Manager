import { useEffect } from "react";
import { Navbar, Board, Sidebar, Overlay } from "./components";
import {ShowSidebarIcon} from "./assets";

function App() {
  //
  useEffect(() => {
    // ONLY TEMP TILL PROPER THEME SETUP
    document.documentElement.className = "darkMode";
  }, []);
  //
  return (
    <div className="App overall-layout">
      <Overlay/>
      <Sidebar/>
      <div className="main-content-layout">
        <Navbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
