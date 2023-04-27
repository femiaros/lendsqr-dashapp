import {Link as LinkR } from "react-router-dom"
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import {BsStarFill,BsStar} from 'react-icons/bs'
import { useDispatch} from "react-redux"
import { updateBlacklist,updateActive } from "../users/usersSlice"

const UserInfoHeader = ({user,title}) => {
    // ***required states***
    const dispatch = useDispatch()

    // component functions
    const handleSwitchDetails = ()=>{} 

    const handleBlacklist = (blacklistId)=> {
        // blacklist||unblacklist when clicked
        // ***blacklisting user will auto deactivate user
        dispatch(updateBlacklist({blacklistId}))
    }
    const handleActivation = (activeId)=>{
        // active||deactive when clicked
        if(user.status.blacklist){
            window.alert('User is blacklisted: Unblacklist first')
            return
        }
        dispatch(updateActive({activeId}))
    }

  return (
    <div className="userinfo__header">
        <div className="userinfo__header__container">
            <LinkR className="userinfo__header__back"
                to="/users"
            >
                <HiOutlineArrowNarrowLeft/>
                <>Back to Users</>
            </LinkR>

            <div className="userinfo__header__title">
                <div className="title-title">{title}</div>
                <div className="title-controls">
                    <span 
                        className= {user.status?.blacklist ?"blacklist action" : "blacklist"}
                        onClick={()=>handleBlacklist(user.id)}
                    >
                        {
                            user.status?.blacklist ? 'unblacklist user' :
                            'blacklist user'
                        }
                    </span>
                    <span 
                        className= {user.status?.active ?"activate action" : "activate"}
                        onClick={()=>handleActivation(user.id)}
                    >
                        {
                            user.status?.active ? 'deactivate user' :
                            'activate user'
                        }
                    </span>
                </div>
            </div>
            
            <div className="userinfo__header__stats">
                <div className="userinfo__header__stats__details">
                    
                    <div className="details__profile">
                        <span className="profile-image">
                            <img src={user.profile.avatar} alt={`user${user.id}`}/>
                        </span>
                        <span className="profile-info">
                            <span className="profile-info-name">
                                {`${user.profile.firstName} ${user.profile.lastName}`}
                            </span>
                            <span className="profile-info-id">
                                {`user-id-${user.id} `}
                            </span>
                        </span>
                    </div>
                    <div className="details__tier">
                        <h6>User's Tier</h6>
                        <span className="tier-icons">
                            <BsStarFill/>
                            <BsStar/> 
                            <BsStar/> 
                        </span>
                    </div>
                    <div className="details__account">
                        <span className="details__account-balance">
                               <>{`${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(user.accountBalance)}`}</> 
                        </span>
                        <span className="details__account-details">
                             {`${user.profile.bvn}/Providus Bank`}
                        </span>
                    </div>

                </div> 
                <div className="userinfo__header__stats__nav">
                    <div className="userinfo__header__stats__nav__wrapper" >
                        <span className="stats-link active" key='1'
                            onClick={(e)=>handleSwitchDetails(e,1)}
                        >
                            General Details
                        </span>
                        <span className="stats-link" key='2'
                            onClick={(e)=>handleSwitchDetails(e,2)}
                        >
                            Documents
                        </span>
                        <span className="stats-link" key='3'
                            onClick={(e)=>handleSwitchDetails(e,3)}
                        >
                            Bank Details
                        </span>
                        <span className="stats-link" key='4'
                            onClick={(e)=>handleSwitchDetails(e,4)}
                        >
                            Loans
                        </span>
                        <span className="stats-link" key='5'
                            onClick={(e)=>handleSwitchDetails(e,5)}
                        >
                            Savings
                        </span>
                        <span className="stats-link" key='6'
                            onClick={(e)=>handleSwitchDetails(e,6)}
                        >
                            App and System
                        </span>
                    </div>
                </div>   
            </div>
        </div>
    </div>
  )
}

export default UserInfoHeader