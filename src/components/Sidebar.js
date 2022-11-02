import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveBoard } from "../features/data/dataSlice";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";

const Sidebar = () => {
  const { isLightMode } = useSelector((store) => store.theme);
  const { overallData, activeBoardIndex } = useSelector((store) => store.data);
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();
  //
  const handleBoardSwitch = (i) => {
    dispatch(changeActiveBoard(i));
  };
  //
  return (
    <aside className={isSidebarOpen ? "sidebar sidebar-active" : "sidebar"}>
      <SidebarTop
        sidebarTopData={{
          isLightMode,
          overallData,
          activeBoardIndex,
          handleBoardSwitch,
        }}
      />
      {/***/}
      <SidebarBottom sidebarBottomData={{ isLightMode }} />
    </aside>
  );
};

export default Sidebar;
