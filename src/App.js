import { useEffect } from "react";
import { Navbar, Board, Sidebar } from "./components";

function App() {
  //
  useEffect(() => {
    // ONLY TEMP TILL PROPER THEME SETUP
    document.documentElement.className = "darkMode";
  }, []);
  //
  return (
    <div className="App overall-layout">
      <Sidebar/>
      <div className="main-content-layout">
        <Navbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
