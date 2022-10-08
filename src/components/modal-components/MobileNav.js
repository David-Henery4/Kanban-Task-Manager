import React from "react";
import { BoardIcon, AddTaskMobile, LightIcon, DarkIcon } from "../../assets";

const MobileNav = () => {
  return (
    <div className="mob-nav">
      <h4 className="mob-nav__title heading-s">ALL BOARDS (4)</h4>
      <div className="mob-nav-board-container">
        <div className="mob-nav-board active-board">
          <BoardIcon className="mob-nav-board__icon" />
          <p className="mob-nav-board__name heading-m">Platform Launch</p>
        </div>
        <div className="mob-nav-board">
          <BoardIcon className="mob-nav-board__icon" />
          <p className="mob-nav-board__name heading-m">Platform Launch</p>
        </div>
        <div className="mob-nav-board">
          <BoardIcon className="mob-nav-board__icon" />
          <p className="mob-nav-board__name heading-m">Platform Launch</p>
        </div>
        <div className="mob-nav-create-board">
          <BoardIcon className="mob-nav-board__icon" />
          <button className="mob-nav-create-board__btn heading-m">
            <span>
              <AddTaskMobile className="mob-nav-create-board__icon" />
            </span>
            Create New Board
          </button>
        </div>
      </div>
      <div className="mob-nav-theme-section">
        <div className="mob-nav-theme">
          <DarkIcon />
          <div className="mob-nav-toggle">TOGGLE</div>
          <LightIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
