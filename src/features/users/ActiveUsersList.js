import { useEffect,useState } from "react"
import { useSelector,useDispatch} from "react-redux"
import { getUsersStatus, getUsersError,getDisplayIds,selectFirstTenActives,updateDisplayIds,selectActiveUsersIds,updateMoreMenuOpenState} from "./usersSlice"
import DashBoardMenu from "../dashboard/DashBoardMenu"
import CoasterBtns from "./CoasterBtns"
import UsersListThead from "./UsersListThead"
import UsersListTbodyRow from "./UsersListTbodyRow"
import UserMoreMenu from "./UserMoreMenu"
import EditUserForm from "./EditUserForm"
import UsersListFooter from "./UsersListFooter"
import LoadScreen from "../../components/LoadScreen"
import AutoPageUp from "../../components/AutoPageUp"

const ActiveUsersList = ({setSearch}) => {
  // ***required states***
  const dispatch = useDispatch()
  const FirstTenActives  = useSelector(state => selectFirstTenActives(state))
  const ActiveUsersIds  = useSelector(state => selectActiveUsersIds(state))

  // edit user form states
  const [formValues, setFormValues] = useState({
      organization: '',
      username:'',
      date:'',
      phone:'',
      active:''
  });

  useEffect(()=>{
    dispatch(updateDisplayIds(FirstTenActives))
    //hide more menu component is open
    dispatch(updateMoreMenuOpenState(false))
    //empty search state
    setSearch('')
    //auto scroll up
    AutoPageUp()
  },[dispatch,setSearch])

  const displayIds = useSelector(getDisplayIds)
  const usersStatus = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  let content

  if (usersStatus === 'loading') {
    content = (
      <LoadScreen/>
    )
  }else if(usersStatus === 'succeeded'){
    //map tru userIDs, create li for each
    const tableContent = displayIds?.length ? displayIds.map(userId => <UsersListTbodyRow key={userId} userId={userId} />) : (
    <tr className="noUser-row"><td>no user found</td></tr>
    )

    content = (
      <div className='userslist'>
        <div className="userslist__container">
          {/* page header */}
          <DashBoardMenu title={'active users'}/>
          {/* page Btns    */}
          <div className="userslist__pages">
            <CoasterBtns allUsersIds={ActiveUsersIds}/>
          </div>

          <div className="userslist__table-wapper">
            <div className="userslist__table-wapper__container">
              {/* page content */}
              <table className="userslist__table" >
                <UsersListThead/>
                <tbody className='userslist__table__tbody'>
                  {tableContent}
                </tbody>
              </table>
              {/* user more info */}
              <UserMoreMenu
                setFormValues={setFormValues}
              />
              {/* user edit form */}
              <EditUserForm 
                formValues={formValues} 
                setFormValues={setFormValues}
              />
              
            </div>
          </div>

          {/* page footer */}
          <UsersListFooter allUsersIds={ActiveUsersIds}/>
        </div>
      </div>
    )
  }else if(usersStatus === 'failed'){
    content = <p>{error}</p>
  }



  return content
}

export default ActiveUsersList