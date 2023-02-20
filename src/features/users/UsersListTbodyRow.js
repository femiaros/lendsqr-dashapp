import { useSelector } from "react-redux"
import { selectUserById } from "./usersSlice"
import {RiMore2Fill} from 'react-icons/ri'
import { updateMoreMenuOpenState,updateMoreMenuIdState } from "./usersSlice"
import { useDispatch} from "react-redux"

const UsersListTbodyRow = ({userId}) => {
    // ***required states***
    const user = useSelector(state => selectUserById(state, userId))
    const dispatch = useDispatch()

    // component functions
    const handleShowMore = (id)=>{
        dispatch(updateMoreMenuOpenState(true))
        dispatch(updateMoreMenuIdState({id}))
    }
    
  return (
    <tr >

        <td className="organization-item" >
            <>{user.orgName.slice(0,16)}</>
        </td>
        <td className="username-item">
            <>{user.userName}</>
        </td>
        <td className="email-item">
            <>{user.email}</>
        </td>    
        <td className="phone-item">
            <>{user.phoneNumber.split('x')[0]}</>
        </td>
        <td className="date-item">
            <span id="month">
                {
                    new Date(user.createdAt).toString().split(' ')[1]
                }
            </span>
            <>
                {
                    ` ${new Date(user.createdAt).getDate()}, ${new Date(user.createdAt).getFullYear()} ${new Date(user.createdAt).getHours()
                    }:${new Date(user.createdAt).getMinutes()} ${new Date(user.createdAt).getHours() < 12 ? 'AM':'PM'
                    }`
                }
            </>
        </td>
        <td className="status-item">
            
            {
                user.status?.blacklist ? 
                <span className="indicator blacklist"> 
                    blacklisted 
                </span>
                    : user.status?.active ?
                        <span className="indicator active"> 
                            active 
                        </span>
                        :<span className="indicator"> 
                            inactive
                        </span>
            }
            
        </td>
        <td className="more"
            onClick={(e)=>handleShowMore(user.id)}
            role='button' tabIndex='0' 
            aria-label='more on user'
        >
            <RiMore2Fill/>
        </td>
        
    </tr>
  )
}

export default UsersListTbodyRow