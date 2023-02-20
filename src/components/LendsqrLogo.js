import lendsqr_icon from '../svgs/lendsqr_icon.svg'
import lendsqr_name from '../svgs/lendsqr_name.svg'
import {Link as LinkR} from "react-router-dom"

const Lendsqrlogo = () => {
  return (
    <LinkR to="/dashboard" 
      className="lendsqr-logo"
      tabIndex='0' 
      aria-label='lend square logo and link to dashboard'
    >
      
        <span className='lendsqr-logo__icon'>
            <img src={lendsqr_icon} alt="lendsqr_icon" />
        </span>
        <span className='lendsqr-logo__name'>
            <img src={lendsqr_name} alt="lendsqr_name" />
        </span>

    </LinkR>
  )
}

export default Lendsqrlogo;

// role='button' tabIndex='0' aria-label='more on user'