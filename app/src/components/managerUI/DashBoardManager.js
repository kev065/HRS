import React from 'react'
import HeaderManager from './HeaderManager'
import HomeManager from './HomeManager'
import SideNavManager from './SideNavManager'
import FooterManager from './FooterManager'

const DashBoardManager = () => {
  return (
    <div>
        <HeaderManager />
        <HomeManager />
        <SideNavManager />
        <FooterManager />
      
    </div>
  )
}

export default DashBoardManager
