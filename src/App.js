import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Board, Sidebar, Overlay } from "./components";
import { sortTasks } from "./features/data/dataSlice";
import {ShowSidebarIcon} from "./assets";

function App() {
  const dispatch = useDispatch()
  const { isLightMode } = useSelector((store) => store.theme);
  const {activeBoardData} = useSelector((store) => store.data)
  //
  useEffect(() => {
    if (!isLightMode) document.documentElement.className = "darkMode";
    if (isLightMode) document.documentElement.className = "lightMode";
  }, [isLightMode]);
  //
  const handleGetAllCurrentBoardTasks = () => {
    if (activeBoardData && activeBoardData.columns) {
      const allTasks = []
      activeBoardData.columns.forEach((col) => {
        allTasks.push(col.tasks)
      });
      dispatch(sortTasks(allTasks.flat()))
    }
  }
  //
  useEffect(() => {
    handleGetAllCurrentBoardTasks()
  }, [activeBoardData])
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
