import React from 'react'
import {openSidebar} from "../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from 'react-redux'; 
import {ShowSidebarIcon} from "../assets";

const ShowSidebarBtn = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.sidebar);
  // hide-show-sidebar
  return (
    <div
      className={
        isSidebarOpen ? "show-sidebar hide-show-sidebar" : "show-sidebar"
      }
      onClick={() => dispatch(openSidebar())}
    >
      <ShowSidebarIcon className="show-sidebar__icon" />
    </div>
  );
}

export default ShowSidebarBtn