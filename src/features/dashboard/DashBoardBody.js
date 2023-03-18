import AreaChart from "./AreaChart"
import {HiUsers} from 'react-icons/hi'
import {GiMoneyStack} from 'react-icons/gi'
import {GrStatusCriticalSmall} from 'react-icons/gr'
import {BsFillCalendarDateFill} from 'react-icons/bs'
import { selectHighBalanceUsers } from "../users/usersSlice"
import { useNavigate } from 'react-router-dom'
import { useSelector} from "react-redux"

const DashBoardBody = () => {
   // *** required states ***
  const navigate = useNavigate()

  const HighBalanceUsers  = useSelector(state => selectHighBalanceUsers(state))

  const userDetails = (id)=>{
    // navigate to user detail page
    navigate(`/user/${id}`)
  }

  //map through HighBalanceUsers
  const tableContent = HighBalanceUsers?.length ? HighBalanceUsers.map(user =>(
    <tr 
      onClick={(e)=>userDetails(user.id)}
    >
      <td className="username">
        <span className="holder">
          <img src={user.profile.avatar} alt='user-thumbnail' />
          <>{user.userName}</>
        </span>
      </td>

      <td className="status"> 
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

      <td className="date">
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

      <td className="balance">
        <span className="naira">N</span>
        <>{user.accountBalance}</>
      </td>

    </tr>
  )) : (
  <tr className="noUser-row"><td>no user found</td></tr>
  )

  return (
    <div className="dashboard-body">
      <div className="dashboard-body__container">
        
        <h2>Highest Balance</h2>

        <div className="dashboard-body__container__table-wrapper">
          <table>
            <thead>
              <tr>
                  <th className="username">
                    <span className="holder">
                      Username
                      <span className="icon">
                        <HiUsers/>
                      </span>
                    </span>
                  </th>
                  <th className="status">
                      <span className="holder">
                        Status
                        <span className="icon">
                          <GrStatusCriticalSmall/>
                        </span>
                      </span>
                  </th>
                  <th className="date">
                      <span className="holder">
                        Date
                        <span className="icon">
                          <BsFillCalendarDateFill/>
                        </span>
                      </span>
                  </th>
                  <th className="balance">
                      <span className="holder">
                        Balance
                        <span className="icon">
                          <GiMoneyStack/>
                        </span>
                      </span>
                  </th>
              </tr>
            </thead>

            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>

        <div className="chart">
          <AreaChart />
        </div>

      </div>
    </div>
  )
}

export default DashBoardBody