import React from "react";
import { useSelector } from "react-redux";
import { BoardIcon, AddTaskMobile, LightIcon, DarkIcon } from "../../assets";

const MobileNav = () => {
  const {isSidebarOpen} = useSelector((store) => store.sidebar)
  // mob-nav-active
  return (
    <div className={isSidebarOpen ? "mob-nav-active mob-nav" : "mob-nav"}>
      <h4 className="mob-nav__title heading-s">ALL BOARDS (4)</h4>
      <div className="board-container">
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
      <div className="mob-nav-theme-section">
        <div className="theme-toggle">
          <DarkIcon />
          <div className="theme-toggle-switch">TOGGLE</div>
          <LightIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
