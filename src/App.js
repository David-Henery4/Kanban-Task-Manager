import { useEffect } from "react";
import {Navbar} from "./components";

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
    </div>
  );
}

export default App;
