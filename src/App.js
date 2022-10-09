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
    <div className="App">
      <Navbar />
      {/* <Sidebar/> */}
      <Board />
    </div>
  );
}

export default App;
