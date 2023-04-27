import Lendsqrlogo from "./LendsqrLogo"
import employeeAvatar from "../images/pexels.jpg"
import {FiSearch} from 'react-icons/fi'
import {RiMenu2Line,RiCloseCircleFill} from 'react-icons/ri'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineFilterList} from 'react-icons/md'
import {CgCloseR} from 'react-icons/cg'
import { useSelector,useDispatch} from "react-redux"
import { selectUsersBySearch,updateMoreMenuOpenState } from "../features/users/usersSlice"
import { useNavigate, useLocation } from 'react-router-dom'
import { logOut } from "../features/auth/authSlice" 

// ***search page REGEX***
const SEARCH_USERS_REGEX = /^\/users\/search-results(\/)?$/

const DashHeader = ({toggleLogout,setToggleLogout,search,setSearch,toggleEmployeeMenu,setToggleEmployeeMenu,toggleMainMenu,setToggleMainMenu}) => {
  //***required states***
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // ***component functions***
  const handleToggleLogout = ()=>{
    setToggleLogout(prev=> !prev)
  }

  const handleToggleMenu = ()=>{
    // hide||show main menu component
    setToggleMainMenu(prev=> !prev)
    //hide more menu component if open
    dispatch(updateMoreMenuOpenState(false))
  }

  const handleToggleEmployeeMenu = ()=>{
    setToggleEmployeeMenu(prev=> !prev)
    //hide more menu component if open
    dispatch(updateMoreMenuOpenState(false))
  }

  // send search to usersSlice for logic
  useSelector(state => selectUsersBySearch(state, search)) 

  // *** Handle search btn clicked ***
  const handleSearch = (e)=>{
    e.preventDefault();
    
    if(!search) return // <<< search cant be empty

    if(!SEARCH_USERS_REGEX.test(pathname)){
      navigate('/users/search-results') 
    }
  }

  // *** Handle employee sign out ***
  const signOut = ()=>{
    dispatch(logOut())
  }

  const content = (
    <header className='dash-header'>
      <div className="dash-header__container">

        {/* menu bars start*/}
        <button 
          className={toggleMainMenu?"dash-header__bars rotate":"dash-header__bars" } 
          title="menu button"
          onClick={handleToggleMenu}
          disabled={toggleEmployeeMenu? true:false}
        >
          {toggleMainMenu? <CgCloseR/>: <RiMenu2Line/>}
        </button>
        {/* menu bars ends*/}

        {/* logo */}
        <div className="dash-header__logo">
            <Lendsqrlogo/>
        </div>
        {/* logo ends*/}

        {/* search bar*/}
        <div className="dash-header__search">
          <form onSubmit={handleSearch}>
            <label htmlFor="search">Search</label>
            <input 
              id="search"
              type="text" 
              placeholder="Search for users"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button><FiSearch/></button>
          </form>
        </div>
        {/* search bar ends*/}

        {/* right side info*/}
        <div
          className={toggleEmployeeMenu ?"dash-header__info open"
            :"dash-header__info" 
          }
        >
          <span className="dash-header__info-close"
            onClick={handleToggleEmployeeMenu}
          >
              <RiCloseCircleFill/>
          </span>

          <div className="dash-header__info-bar">
            <a 
              href="https://github.com/femiaros/lendsqr-dashapp" 
              className="docs" 
              aria-label='check out documentation on github'
              title="docs on github🌐"
            >
              Docs
            </a>
            <div className="alarm" tabIndex='0' aria-label='check out notifications'>
              <IoMdNotificationsOutline/>
            </div>
            <div className="avatar" tabIndex='0' aria-label='user picture'>
              <img src={employeeAvatar} alt="avatar" />
            </div>
          </div>

          <div className="dash-header__info-user"
            tabIndex='0' 
            aria-label='log out toggle'
          >
            <span className={toggleLogout?"username open":"username" }
              onClick={(e)=>handleToggleLogout(e)}
            >
              <small>employee</small>
              <MdOutlineFilterList/>
            </span>
            <span 
              className={toggleLogout?"logout open": "logout"}
              onClick={signOut}
            >
              <i>Logout</i>
            </span>
          </div>

        </div>
        {/* right side info ends*/}

        {/* profile toggle start*/}
        <button 
          className= "dash-header__employee"
          onClick={handleToggleEmployeeMenu}
          disabled={toggleMainMenu? true:false}
        >
          <img src={employeeAvatar} alt="avatar" />
        </button>
        {/* profile toggle ends*/}

      </div>
    </header>
  )

  return content
}

export default DashHeader