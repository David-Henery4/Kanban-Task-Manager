import { useEffect } from "react";
import {Navbar, Board} from "./components";

function App() {
  //
  useEffect(() => {
    // ONLY TEMP TILL PROPER THEME SETUP
    document.documentElement.className = "darkMode";
  },[])
  //
  return (
    <div className="App">
      <Navbar/>
      <Board/>
    </div>
  );
}

export default App;
