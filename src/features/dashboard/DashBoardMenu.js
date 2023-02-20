import {HiUsers} from 'react-icons/hi'
import {FaUsers,FaCoins} from 'react-icons/fa'
import {MdNoteAdd} from 'react-icons/md'
import { useSelector} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom'
import { selectAllUsers,selectActiveUsers } from '../users/usersSlice'

const USERS_REGEX = /^\/users(\/)?$/
const ACTIVE_USERS_REGEX = /^\/users\/actives(\/)?$/
const SEARCH_USERS_REGEX = /^\/users\/search-results(\/)?$/

const DashBoardMenu = ({title,searchUsersLenght}) => {
    // ***required states***
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const AllUsers = useSelector(selectAllUsers)
    const ActiveUsers = useSelector(selectActiveUsers)

    // component functions
    const handleDisplayAllUser = ()=>{
        if(!USERS_REGEX.test(pathname)){
            navigate('/users') 
        } 
    }

    const handleDisplayActiveUser = ()=>{
        if(!ACTIVE_USERS_REGEX.test(pathname)){
            navigate('/users/actives') 
        }
    }

    // content to be displayed
    const content =(
        <div className="dashboard-menu">
            <div className="dashboard-menu__container">
                <div className="dashboard-menu__title">
                    <>{title}</>
                    <span 
                        className={SEARCH_USERS_REGEX.test(pathname)?'search-count show':
                        'search-count'
                    }
                    >
                        {searchUsersLenght}
                    </span>
                </div>
                <div className="dashboard-menu__stats">
                    <div className="dashboard-menu__stats__box"
                        onClick={handleDisplayAllUser}
                        role='button' tabIndex='0' 
                        aria-label='all users button'
                    >
                        <span className="icon">
                            <HiUsers/>
                        </span>
                        <span className='state'>users</span>
                        <span className='count'>{AllUsers.length}</span>
                    </div>

                    <div className="dashboard-menu__stats__box"
                        onClick={handleDisplayActiveUser}
                        role='button' tabIndex='0' 
                        aria-label='active users button'
                    >
                        <span className="icon">
                            <FaUsers/>
                        </span>
                        <span className='state'>active users</span>
                        <span className='count'>{//Add extra '0' prefix if needed
                                ActiveUsers.length.toString().length === 1 
                                    ? `0${ActiveUsers.length}`
                                        :ActiveUsers.length
                            }
                        </span>
                    </div>

                    <div className="dashboard-menu__stats__box"
                        role='button' tabIndex='0' 
                        aria-label='users with loan button'
                    >
                        <span className="icon">
                            <MdNoteAdd/>
                        </span>
                        <span className='state'>users with loans</span>
                        <span className='count'>100</span>
                    </div>

                    <div className="dashboard-menu__stats__box"
                        role='button' tabIndex='0' 
                        aria-label='user with savings button'
                    >
                        <span className="icon">
                            <FaCoins/>
                        </span>
                        <span className='state'>users with saving</span>
                        <span className='count'>100</span>
                    </div>
                </div>
            </div>    
        </div>
    )

  return content
}

export default DashBoardMenu