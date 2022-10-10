import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {openSidebar} from "../features/sidebar/sidebarSlice";
import { MobileNav } from "../components/modal-components";
import {
  MobileLogo,
  DownArrow,
  AddTaskMobile,
  EditDeleteIcon,
  LogoDark,
  LogoLight,
} from "../assets";

const Navbar = () => {
  const {isSidebarOpen} = useSelector((store) => store.sidebar)
  const dispatch = useDispatch()
  // remove-nav-logo
  return (
    <nav className="navbar">
      <MobileNav/>
      <div className="navbar-left">
        <MobileLogo className="navbar__logo" />
        <div
          className={
            isSidebarOpen
              ? "navbar__logo--tab-section remove-nav-logo"
              : "navbar__logo--tab-section"
          }
        >
          <LogoLight className="navbar__logo--tab" />
        </div>
        <h1 className="navbar__board-name heading-l">Platform Launch</h1>
        <DownArrow className="navbar__drop-down-icon" onClick={() => dispatch(openSidebar())}/>
      </div>
      <div className="navbar-right">
        <div className="navbar-add-task">
          <AddTaskMobile className="navbar-add-task__icon" />
          <p className="navbar-add-task__text heading-m">Add new task</p>
        </div>
        <EditDeleteIcon className="navbar__edit-delete-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
