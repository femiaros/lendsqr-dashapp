import { useEffect,useState } from "react"
import { useSelector,useDispatch} from "react-redux"
import { getUsersStatus, getUsersError,getDisplayIds,updateDisplayIds,updateMoreMenuOpenState,selectSearchUsersIds,selectFirstTenSearch} from "./usersSlice"
import DashBoardMenu from "../dashboard/DashBoardMenu"
import CoasterBtns from "./CoasterBtns"
import UsersListThead from "./UsersListThead"
import UsersListTbodyRow from "./UsersListTbodyRow"
import UserMoreMenu from "./UserMoreMenu"
import EditUserForm from "./EditUserForm"
import UsersListFooter from "./UsersListFooter"
import LoadScreen from "../../components/LoadScreen"
import AutoPageUp from "../../components/AutoPageUp"

const SearchUsersList = ({search}) => {
  // ***required states***
  const dispatch = useDispatch()
  const SearchUsersIds  = useSelector(state => selectSearchUsersIds(state, search))
  const searchUsersLenght = SearchUsersIds.length

  const FirstTenSearch  = useSelector(state => selectFirstTenSearch(state, search))

  // edit user form states
  const [formValues, setFormValues] = useState({
      organization: '',
      username:'',
      date:'',
      phone:'',
      active:''
  });

  //reload component when search changes
  useEffect(()=>{
    dispatch(updateDisplayIds(FirstTenSearch))
    //hide more menu component is open
    dispatch(updateMoreMenuOpenState(false))
    //auto scroll up
    AutoPageUp()
  },[search,dispatch])

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
    <tr className="noUser-row"><td>no user related to search</td></tr>
    )

    content = (
      <div className='userslist'>
        <div className="userslist__container">
          {/* page header */}
          <DashBoardMenu 
            title={'search results'} 
            searchUsersLenght={searchUsersLenght}
          />
          {/* page Btns    */}
          <div className="userslist__pages">
            <CoasterBtns allUsersIds={SearchUsersIds}/>
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
          <UsersListFooter allUsersIds={SearchUsersIds}/>
        </div>
      </div>
    )
  }else if(usersStatus === 'failed'){
    content = <p>{error}</p>
  }



  return content
}

export default SearchUsersList