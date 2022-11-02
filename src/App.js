import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar, Board, Sidebar, Overlay } from "./components";

function App() {
  const { isLightMode } = useSelector((store) => store.theme);
  //
  useEffect(() => {
    if (!isLightMode) document.documentElement.className = "darkMode";
    if (isLightMode) document.documentElement.className = "lightMode";
  }, [isLightMode]);
  //
  return (
    <div className="App overall-layout">
      <Overlay />
      <Sidebar />
      <div className="main-content-layout">
        <Navbar />
        <Board />
      </div>
    </div>
  );
}

export default App;
