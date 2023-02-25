import {Link as LinkR} from "react-router-dom"
import {CgToolbox} from 'react-icons/cg'
import {HiUsers,HiClipboardList} from 'react-icons/hi'
import {FaHome,FaUsers,FaScroll,FaRegHandshake,FaUserTimes,FaUserCheck,FaCoins} from 'react-icons/fa'
import {GiMoneyStack,GiReceiveMoney,GiCircularSawblade,GiBank} from 'react-icons/gi'
import {BsPiggyBank} from 'react-icons/bs'
import {RiUserSettingsFill,RiSettings6Line} from 'react-icons/ri'
import {MdOutlineSendToMobile,MdOutlineFilterList} from 'react-icons/md'
import {GoGraph} from 'react-icons/go'
import {AiOutlineControl} from 'react-icons/ai'

const DashNav = ({toggleOrganization,setToggleOrganization,toggleMainMenu,setToggleMainMenu}) => {
  

  const handleSwitchOrganization = ()=>{
    setToggleOrganization(prev=> !prev)
  }

  const closeMainMenu= ()=>{
    // hide main menu 
    setToggleMainMenu(false)
  }

    const content = (
      <nav className={toggleMainMenu ?"dash-nav open":"dash-nav" }>

        <div className="dash-nav__container">

          <div className="dash-nav__top">
            <div className={toggleOrganization? "dash-nav__top__link open": "dash-nav__top__link"} 
              onClick={(e)=>handleSwitchOrganization(e)}
            >
              <CgToolbox/>
              <span className="dash-nav__top__link-name">
                <b>Switch Organization </b>
                <span className="icon">
                  <MdOutlineFilterList/> 
                </span>
              </span>
            </div>

            <ul className={toggleOrganization?"dash-nav__top__list open":"dash-nav__top__list" } >
              <li className="dash-nav__top__list-item">Lendsqr</li>
              <li className="dash-nav__top__list-item">irorun</li>
              <li className="dash-nav__top__list-item">sparter</li>
            </ul>

            <LinkR to="/dashboard" 
              className="dash-nav__top__link"
              onClick={closeMainMenu}
            >
              <FaHome/> <>dashboard</>
            </LinkR>

          </div>

          <div className="dash-nav__category">
            <div className="dash-nav__category__title">
              customers
            </div>
            <div className="dash-nav__category__links">
              <LinkR to="/users" 
                className="dash-nav__category__link users"
                onClick={closeMainMenu}
              >
                <HiUsers/> <>users</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaUsers/> <>guarantors</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GiMoneyStack/> <>loans</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaRegHandshake/> <>decision models</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <BsPiggyBank/> <>savings</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GiReceiveMoney/> <>Loan Requests</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaUserCheck/> <>whitelist</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaUserTimes/> <>karma</>
              </LinkR>
            </div>
          </div>

          <div className="dash-nav__category">
            <div className="dash-nav__category__title">
              businesses
            </div>
            <ul className="dash-nav__category__links">
              <LinkR className="dash-nav__category__link">
                <CgToolbox/> <>organization</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GiReceiveMoney/> <>loan products</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GiBank/> <>saving products</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaCoins/> <>fees and charges</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <MdOutlineSendToMobile/> <>transactions</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GiCircularSawblade/> <>services</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <RiUserSettingsFill/> <>service account</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <FaScroll/> <>settlements</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <GoGraph/> <>reports</>
              </LinkR>
            </ul>
          </div>

          <div className="dash-nav__category">
            <div className="dash-nav__category__title">
              settings
            </div>
            <ul className="dash-nav__category__links">
              <LinkR className="dash-nav__category__link">
                <AiOutlineControl/> <>preferences</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <RiSettings6Line/> <>fees and pricing</>
              </LinkR>
              <LinkR className="dash-nav__category__link">
                <HiClipboardList/> <>audit logs</>
              </LinkR>
            </ul>
          </div>

        </div>

      </nav>
    )

  return content
}

export default DashNav