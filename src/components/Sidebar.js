import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {closeSidebar} from "../features/sidebar/sidebarSlice";
import { LogoLight, BoardIcon, AddTaskMobile, DarkIcon, LightIcon, HideSidebarIcon } from "../assets";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  const dispatch = useDispatch()
  //
  return (
    <aside className={isSidebarOpen ? "sidebar sidebar-active" : "sidebar"}>
      <div className="sidebar-top">
        <LogoLight className="sidebar__logo" />
        <div className="board-container">
          <div className="board-container-header">
            <h4 className="board-container-header__title heading-s">
              ALL BOARDS (4)
            </h4>
          </div>
          <div className="board-container-board active-board">
            <BoardIcon className="board-container-board__icon" />
            <p className="board-container-board__name heading-m">
              Platform Launch
            </p>
          </div>
          <div className="board-container-board">
            <BoardIcon className="board-container-board__icon" />
            <p className="board-container-board__name heading-m">
              Platform Launch
            </p>
          </div>
          <div className="board-container-board">
            <BoardIcon className="board-container-board__icon" />
            <p className="board-container-board__name heading-m">
              Platform Launch
            </p>
          </div>
          <div className="board-container-board">
            <BoardIcon className="board-container-board__icon" />
            <button className="board-container-board__btn heading-m">
              <span>
                <AddTaskMobile className="board-container-board__icon" />
              </span>
              Create New Board
            </button>
          </div>
        </div>
      </div>
      {/***/}
      <div className="sidebar-bottom">
        <div className="theme-toggle">
          <DarkIcon />
          <div className="mob-nav-toggle">TOGGLE</div>
          <LightIcon />
        </div>
        <div className="sidebar-hide-sidebar" onClick={() => dispatch(closeSidebar())}>
          <HideSidebarIcon className="sidebar-hide-sidebar__icon" />
          <p className="sidebar-hide-sidebar__text heading-m">Hide Sidebar</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
