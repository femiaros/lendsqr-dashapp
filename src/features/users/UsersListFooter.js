import {IoIosArrowDown} from 'react-icons/io'
import { useSelector} from "react-redux"
import { getDisplayIds} from "./usersSlice"

const UsersListFooter = ({allUsersIds}) => {
    const displayIds = useSelector(getDisplayIds)

  return (
    <div className='userslist__footer'>
        <div className="userslist__footer__container">
            <div className="Showing">
                <span className="Showing__text">Showing</span>
                <span className="Showing__filter">
                    <>{displayIds.length}</> <IoIosArrowDown/>
                </span>
                <span className="Showing__text">{`out of ${allUsersIds.length}`}</span>
            </div>
             {/* coasterBtns    */}
        </div>
    </div>
  )
}

export default UsersListFooter