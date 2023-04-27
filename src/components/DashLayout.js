import { Outlet } from 'react-router-dom'
import { useState } from "react"
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import DashNav from './DashNav'
import { useSelector } from 'react-redux'
import { getEditFormState,getMoreMenuState} from '../features/users/usersSlice'

const DashLayout = ({search,setSearch}) => {
  
  //***required states***
  const [toggleLogout, setToggleLogout] = useState(false)
  const [toggleOrganization, setToggleOrganization] = useState(false)
  const [toggleEmployeeMenu, setToggleEmployeeMenu] = useState(false)
  const [toggleMainMenu, setToggleMainMenu] = useState(false)

  const {open: formOpen} = useSelector(getEditFormState) // <<< to-toggle overlay
  const {open: moreMenuOpen} = useSelector(getMoreMenuState) // <<< to-toggle overlay


  return (
     <>
        <DashHeader 
          toggleLogout={toggleLogout}
          setToggleLogout={setToggleLogout}
          toggleEmployeeMenu={toggleEmployeeMenu}
          setToggleEmployeeMenu={setToggleEmployeeMenu}
          toggleMainMenu={toggleMainMenu}
          setToggleMainMenu={setToggleMainMenu}
          search = {search}
          setSearch = {setSearch}
        />
        <div className="dash-container">

            <DashNav 
              toggleOrganization={toggleOrganization} 
              setToggleOrganization={setToggleOrganization}
              toggleMainMenu={toggleMainMenu}
              setToggleMainMenu={setToggleMainMenu}
            />

            <main className='dash-content'>
              <Outlet />
            </main>

        </div>
        <DashFooter />

        {/* *** App Overlays *** */}
        <div className={formOpen ? "dash-overlay show": "dash-overlay"}></div>
        <div className={toggleEmployeeMenu ? "dash-overlay-transparent show": "dash-overlay-transparent"}></div>
        <div className={toggleMainMenu ? "dash-overlay-transparent show": "dash-overlay-transparent"}></div>
        <div className={moreMenuOpen ? "dash-overlay-transparent show": "dash-overlay-transparent"}></div>
    </>
  )
}

export default DashLayout