import banner_img from "../../images/banner-img2.jpg"
import DashBoardMenu from "./DashBoardMenu"
import DashBoardFooter from "./DashBoardFooter"
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

          <div className="dashboard__banner">
            <div className="dashboard__banner__container">
              <div className="dashboard__banner__text">
                <h2>Begin your journey to</h2>
                <h2>financial freedom</h2>
                <p>Dashapp gives you more than one way to save and earn easily, we cover a very wide scope.</p>
 
                <span className="btn">Start</span>
              </div>
              <div className="dashboard__banner__photo">
                <div className="dashboard__banner__photo-overlay"></div>
                <div className="dashboard__banner__photo-wrapper">
                  <img src={banner_img} alt="banner-img" />
                </div>
              </div>
            </div>
          </div>

          <DashBoardBody />

          <DashBoardFooter />

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