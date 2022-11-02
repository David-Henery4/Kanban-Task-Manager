import React from 'react'
import { useDispatch } from 'react-redux';
import { openAddNewBoardModal } from '../features/modals/modalsSlice';
import { closeSidebar } from '../features/sidebar/sidebarSlice';
import { openOverlay } from '../features/overlay/overlaySlice';
import { LogoDark, LogoLight , BoardIcon} from '../assets';

const SidebarTop = ({sidebarTopData}) => {
  const dispatch = useDispatch()
  const {isLightMode, overallData, activeBoardIndex, handleBoardSwitch} = sidebarTopData
  return (
    <div className="sidebar-top">
      {isLightMode ? (
        <LogoDark className="sidebar__logo" />
      ) : (
        <LogoLight className="sidebar__logo" />
      )}
      <div className="board-container">
        <div className="board-container-header">
          <h4 className="board-container-header__title heading-s">
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
  );
}

export default SidebarTop