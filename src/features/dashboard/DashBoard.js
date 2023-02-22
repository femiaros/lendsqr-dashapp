import DashBoardMenu from "./DashBoardMenu"
import DashBoardBody from "./DashBoardBody"
import { useSelector} from "react-redux"
import { getUsersStatus, getUsersError } from "../users/usersSlice" 
import { useEffect} from "react"
import LoadScreen from "../../components/LoadScreen"
import ErrorPage from "../../components/ErrorPage"
import AutoPageUp from "../../components/AutoPageUp"
import useTitle from "../../hooks/useTitle"

const Dashboard = ({setSearch}) => {
  useEffect(()=>{
    //auto scroll up
    AutoPageUp()
    //empty search state
    setSearch('')
  },[])

  // *** required states ***
  useTitle('Dashboard - Lendsqr Dashapp') // <<< set page title
  const userStatus = useSelector(getUsersStatus)
  const error = useSelector(getUsersError)

  let content

  if (userStatus === 'loading') {
    content = (
      <LoadScreen/>
    )
  }else if(userStatus === 'succeeded'){

    content = (
      <section className="dashboard">
        <div className="dashboard__container">
          <DashBoardMenu title= {'dashboard'} />
          <DashBoardBody />
        </div>
      </section>
    )

  }else if(userStatus === 'failed'){
    content =(
      <ErrorPage msg={error}/>
    ) 
  }  

  return content
}

export default Dashboard