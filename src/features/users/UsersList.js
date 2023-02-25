import { useEffect, useState} from "react"
import { useSelector,useDispatch} from "react-redux"
import { selectUsersIds, getUsersStatus, getUsersError,getDisplayIds,updateDisplayIds,selectFirstTenUsers,updateMoreMenuOpenState} from "./usersSlice"
import DashBoardMenu from "../dashboard/DashBoardMenu"
import CoasterBtns from "./CoasterBtns"
import UsersListThead from "./UsersListThead"
import UsersListTbodyRow from "./UsersListTbodyRow"
import UserMoreMenu from "./UserMoreMenu"
import EditUserForm from "./EditUserForm"
import UsersListFooter from "./UsersListFooter"
import LoadScreen from "../../components/LoadScreen"
import ErrorPage from "../../components/ErrorPage"
import AutoPageUp from "../../components/AutoPageUp"

const UsersList = ({setSearch}) => {
  // *** required states ***
  const dispatch = useDispatch()
  const FirstTenUsers  = useSelector(state => selectFirstTenUsers(state))
  const UsersIds = useSelector(selectUsersIds)

  // edit user form states
  const [formValues, setFormValues] = useState({
      organization: '',
      username:'',
      date:'',
      phone:'',
      active:''
  });

  useEffect(()=>{
    dispatch(updateDisplayIds(FirstTenUsers)) 
    //hide more menu component is open
    dispatch(updateMoreMenuOpenState(false))
    //empty search state
    setSearch('')
    //auto scroll up
    AutoPageUp()
  },[dispatch,setSearch])

  const displayIds = useSelector(getDisplayIds)
  const userStatus = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  let content

  if(userStatus === 'loading') {
    content = (
      <LoadScreen/>
    )
  }else if(userStatus === 'succeeded'){

    //map tru display userIDs
    const tableContent = displayIds?.length ? displayIds.map(userId => <UsersListTbodyRow key={userId} userId={userId} />) : (
    <tr className="noUser-row"><td>no user found</td></tr>
    )

    content = (
      <div className='userslist'>
        <div className="userslist__container">
          {/* page header */}
          <DashBoardMenu title={'users'}/>
          
          {/* page Btns    */}
          <div className="userslist__pages">
            <CoasterBtns allUsersIds={UsersIds}/>
          </div>

          <div className="userslist__table-wapper">
            <div className="userslist__table-wapper__container">
              {/* page content */}
              <table className="userslist__table">
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
          <UsersListFooter allUsersIds={UsersIds}/>
        </div>
      </div>
    )
  }else if(userStatus === 'failed'){
    content =(
      <ErrorPage msg={error}/>
    )
  }


  return (
    content
  )
}

export default UsersList