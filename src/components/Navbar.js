import React from 'react'
import {MobileNav} from "../components/modal-components";
import {MobileLogo, DownArrow, AddTaskMobile, EditDeleteIcon} from "../assets";

const Navbar = () => {
  return (
    <nav className="navbar">
      <MobileNav/>
      <div className="navbar-left">
      <MobileLogo className="navbar__logo" />
      <h1 className="navbar__board-name heading-l">Platform Launch</h1>
      <DownArrow className="navbar__drop-down-icon" />
      </div>
      <div className="navbar-right">
      <div className="navbar-add-task">
        <AddTaskMobile className="navbar-add-task__icon" />
      </div>
      <EditDeleteIcon className="navbar__edit-delete-icon" />
      </div>
    </nav>
  );
}

export default Navbar