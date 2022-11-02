import React from 'react'
import { HideSidebarIcon, LightIcon, DarkIcon } from '../assets';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import { closeSidebar } from '../features/sidebar/sidebarSlice';

const SidebarBottom = ({sidebarBottomData}) => {
  const dispatch = useDispatch()
  const {isLightMode} = sidebarBottomData
  return (
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
  );
}

export default SidebarBottom