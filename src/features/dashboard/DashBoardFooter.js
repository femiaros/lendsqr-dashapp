import Lendsqrlogo from "../../components/LendsqrLogo"

const DashBoardFooter = () => {
    const thisYear = new Date().getFullYear().toString()

  return (
    <div className="dashboard__footer">
        <div className="dashboard__footer__container">
            
            <span className="logo">
                <Lendsqrlogo/>
            </span>
            <span className="year">
                &#169;
            </span>
            <span className="text"> 
                {`${thisYear}, All Rights Reserved`}
            </span>
        </div>
    </div>
  )
}

export default DashBoardFooter