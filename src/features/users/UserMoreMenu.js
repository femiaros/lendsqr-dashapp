import {Link as LinkR} from "react-router-dom"
import {RiUserFollowLine,RiUserUnfollowLine} from 'react-icons/ri'
import {FiEye,FiEdit} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import { useSelector,useDispatch} from "react-redux"
import { 
    selectUserById,
    getMoreMenuState,
    updateMoreMenuOpenState,
    updateBlacklist,
    updateActive,
    updateEditFormOpenState,
    updateEditFormIdState
} from "./usersSlice"

const UserMoreMenu = ({setFormValues}) => {
    // ***required states***
    const {open,id} = useSelector(getMoreMenuState)
    const user = useSelector(state => selectUserById(state, id))
    const dispatch = useDispatch()

    //component functions
    const handleBlacklist = (e,blacklistId)=>{
        // blacklist||unblacklist when clicked
        // ***blacklisting user will auto deactivate user
        dispatch(updateBlacklist({blacklistId}))

        //hide more menu component
        dispatch(updateMoreMenuOpenState(false))
    }

    const handleActivation = (activeId)=>{
        // active||deactive when clicked
        if(user.status.blacklist){
            window.alert('User is blacklisted: Unblacklist first')
            return
        }
        dispatch(updateActive({activeId}))
        //hide more menu component
        dispatch(updateMoreMenuOpenState(false))
    }

    const handleOpenEditForm = ()=>{
        //open edit form component
        dispatch(updateEditFormOpenState(true))
        dispatch(updateEditFormIdState({id}))
        // reset edit user form states
        setFormValues({
            organization: '',
            username:'',
            date:'',
            phone:'',
            active:''
        })
        //hide more menu component
        dispatch(updateMoreMenuOpenState(false))
    }

    const handleHideMoreMenu = ()=>{
        //hide more menu component
        dispatch(updateMoreMenuOpenState(false))
    }


  return (
    <div className={open ? "more-menu open" : "more-menu"}>
        <span className="more-menu__close"
            onClick={()=>handleHideMoreMenu()}
            role='button' tabIndex='0' 
            aria-label='close more'
        >
            <RiCloseCircleFill/>
        </span>

        <div className="more-menu__links">

            <LinkR 
                to={`/user/${user.id}`}
                className="more-menu__links__item"
                role='button' tabIndex='0' 
                aria-label='view user details'
            >
                <span className="svg-bg"><FiEye/></span><>view details</>
            </LinkR>
            <span 
                onClick={(e)=>handleBlacklist(e,user.id)}
                className={user.status.blacklist? "more-menu__links__item unblacklist"
                    : "more-menu__links__item"
                }
                role='button' tabIndex='0' 
                aria-label='blacklist user'
            >
                <span className="svg-bg"><RiUserUnfollowLine/></span>
                <span>
                    {
                        user.status?.blacklist ? 'Unblacklist user' :
                        'Blacklist user'
                    }
                </span>
            </span>
            <span 
                onClick={()=>handleActivation(user.id)}
                className={user.status.active ? "more-menu__links__item deactive"
                    : "more-menu__links__item"
                }
                role='button' tabIndex='0' 
                aria-label='Activate user'
            >
                <span className="svg-bg"><RiUserFollowLine/></span>
                <span>
                    {
                        user.status?.active ? 'deactivate user' :
                        'activate user'
                    }
                </span>
            </span>
            <span 
                onClick={()=>handleOpenEditForm()}
                className="more-menu__links__item"
                role='button' tabIndex='0' 
                aria-label='Open edit user form'
            >
                <span className="svg-bg"><FiEdit/></span>
                <span>edit user</span>
            </span>

         </div>    
    </div>
  )
}

export default UserMoreMenu