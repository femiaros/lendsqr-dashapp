import { Outlet } from 'react-router-dom'
import { useState } from "react"
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import DashNav from './DashNav'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getEditFormState,getMoreMenuState} from '../features/users/usersSlice'

const SEARCH_USERS_REGEX = /^\/users\/search-results(\/)?$/

const DashLayout = ({search,setSearch}) => {
  //***required states***
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [toggleLogout, setToggleLogout] = useState(false)
  const [toggleOrganization, setToggleOrganization] = useState(false)
  const [toggleEmployeeMenu, setToggleEmployeeMenu] = useState(false)
  const [toggleMainMenu, setToggleMainMenu] = useState(false)

  const {open: formOpen} = useSelector(getEditFormState) // <<< to-toggle overlay
  const {open: moreMenuOpen} = useSelector(getMoreMenuState) // <<< to-toggle overlay

  //component functions
  const handleSearch = (e)=>{
    e.preventDefault();
    // autoPageUp();
    if(!search) return // <<< search cant be empty

    if(!SEARCH_USERS_REGEX.test(pathname)){
      navigate('/users/search-results') 
    }
  }

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
          handleSearch = {handleSearch}
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