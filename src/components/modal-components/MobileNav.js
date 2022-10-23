import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddNewBoardModal } from "../../features/modals/modalsSlice";
import { toggleTheme } from "../../features/theme/themeSlice";
import { closeSidebar } from "../../features/sidebar/sidebarSlice";
import { changeActiveBoard } from "../../features/data/dataSlice";
import { BoardIcon, AddTaskMobile, LightIcon, DarkIcon } from "../../assets";

const MobileNav = () => {
  const {isLightMode} = useSelector(store => store.theme)
  const { overallData } = useSelector((store) => store.data);
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();
  //
  const handleNewBoardClick = () => {
    dispatch(openAddNewBoardModal());
    dispatch(closeSidebar());
  };
  //
  const handleBoardSwitch = (id) => {
    dispatch(changeActiveBoard(id))
  }
  //
  return (
    <div className={isSidebarOpen ? "mob-nav-active mob-nav" : "mob-nav"}>
      <h4 className="mob-nav__title heading-s">ALL BOARDS (4)</h4>
      <div className="board-container">
        {overallData.map((board, i) => {
          const { name, id } = board;
          // active-board
          return (
            <div
              className="board-container-board"
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
            onClick={handleNewBoardClick}
          >
            <span>
              <AddTaskMobile className="board-container-board__icon" />
            </span>
            Create New Board
          </button>
        </div>
      </div>
      <div className="mob-nav-theme-section">
        <div className="theme-toggle">
          <DarkIcon />
          <div className="theme-toggle-switch" onClick={() => dispatch(toggleTheme())}>
            <div
              className={
                isLightMode
                  ? "theme-toggle-switch__ball switch-light-mode-active"
                  : "theme-toggle-switch__ball"
              }
            ></div>
          </div>
          <LightIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
