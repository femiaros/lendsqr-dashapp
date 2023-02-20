import { useParams } from 'react-router-dom'
import UserInfoHeader from "./UserInfoHeader"
import UserInfoBody from "./UserInfoBody"
import { useSelector,useDispatch} from "react-redux"
import { selectUserById,updateMoreMenuOpenState,getUsersStatus, getUsersError} from "../users/usersSlice"
import {useEffect} from "react";
import AutoPageUp from '../../components/AutoPageUp'

const UserInfo = () => {
    //***required states && functions***
    const { userId } = useParams()
    const dispatch = useDispatch()
     
    useEffect(() => { 
        //when component loads hide search bar
        AutoPageUp()
        // close more state
        dispatch(updateMoreMenuOpenState(false))
    }, [])

    const user = useSelector(state => selectUserById(state, userId))
    const usersStatus = useSelector(getUsersStatus)
    const error = useSelector(getUsersError)

    let content

    if (usersStatus === 'loading') {
        content = <p>...Loading ...Loading ...UsersList</p>
    }else if(usersStatus === 'succeeded'){

        content = (
            <div className='userinfo'>
                <UserInfoHeader title={'User Details'} user={user}/>
                <UserInfoBody user={user}/>
            </div>
        )

    }else if(usersStatus === 'failed'){
        content = <p>{error}</p>
    }


  return content
}

export default UserInfo