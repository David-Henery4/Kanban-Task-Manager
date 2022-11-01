import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { closeSidebar } from "../features/sidebar/sidebarSlice";
import { openAddNewBoardModal } from "../features/modals/modalsSlice";
import { openOverlay } from "../features/overlay/overlaySlice";
import { changeActiveBoard } from "../features/data/dataSlice";
import {
  LogoLight,
  LogoDark,
  BoardIcon,
  DarkIcon,
  LightIcon,
  HideSidebarIcon,
} from "../assets";

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
      <div className="sidebar-top">
        {isLightMode ? (
          <LogoDark className="sidebar__logo" />
        ) : (
          <LogoLight className="sidebar__logo" />
        )}
        <div className="board-container">
          <div className="board-container-header">
            <h4 className="board-container-header__title heading-s">
              {/* NEED DYNAMIC BOARD NUMBER */}
              ALL BOARDS ({overallData && overallData.length})
            </h4>
          </div>
          {overallData.map((board, i) => {
            const { name, id } = board;
            return (
              <div
                className={
                  i === activeBoardIndex
                    ? "board-container-board active-board-style"
                    : "board-container-board"
                }
                key={id}
                onClick={() => handleBoardSwitch(i)}
              >
                <BoardIcon className="board-container-board__icon" />
                <p className="board-container-board__name heading-m">{name}</p>
              </div>
            );
          })}
          <div className="board-container-board">
            <BoardIcon className="board-container-board__icon" />
            <button
              className="board-container-board__btn heading-m"
              onClick={() => {
                dispatch(openAddNewBoardModal());
                dispatch(closeSidebar());
                dispatch(openOverlay());
              }}
            >
              <span className="board-container-board__icon--plus">+</span>
              Create New Board
            </button>
          </div>
        </div>
      </div>
      {/***/}
      <div className="sidebar-bottom">
        <div className="sidebar-bottom-theme">
          <div className="theme-toggle">
            <LightIcon />
            <div
              className="mob-nav-toggle theme-toggle-switch"
              onClick={() => dispatch(toggleTheme())}
            >
              {/* switch-light-mode-active */}
              <div
                className={
                  isLightMode
                    ? "theme-toggle-switch__ball switch-light-mode-active"
                    : "theme-toggle-switch__ball"
                }
              ></div>
            </div>
            <DarkIcon />
          </div>
        </div>
        {/**/}
        <div
          className="sidebar-hide-sidebar"
          onClick={() => dispatch(closeSidebar())}
        >
          <HideSidebarIcon className="sidebar-hide-sidebar__icon" />
          <p className="sidebar-hide-sidebar__text heading-m">Hide Sidebar</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
