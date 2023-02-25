import Lendsqrlogo from "./LendsqrLogo"
import lendsqr_vector from "../svgs/lendsqr_vector.svg"
import {FaPhoneSquareAlt,FaHandPointRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useTitle from "../hooks/useTitle"

const Public = () => {
    // *** required state ***
    useTitle('Public - Lendsqr Dashapp') // <<< set page title

    const content = (
        <section className="public">
            {/* public left-side panel */}
            <div className="public__left">
                <header>
                    <h1><Lendsqrlogo/> <span className="styled"> Dashapp</span></h1>
                </header>
                
                <main className="public__left__main">
                    <p className="public__left__main-locaion">
                        Located in Beautiful Downtown Lasgidi City. Dashapp comprises of four (5) pages, public facing page,the Dashboard, users page, actives pages, and user detail page.
                    </p>

                    <address className="public__left__main-addr">
                        <>
                            Lendsqr. DashApp <br />
                            555 Foo Drive<br />
                            Lasgidi City, CA 12345<br />
                        </>
                        <a 
                            className="clickable" 
                            href="tel:+15555555555">
                            <FaPhoneSquareAlt/>
                            <>(+234) 553-18355</>
                        </a>
                    </address>

                    <p className="public__left__main-creator">Design: Oluwafemi Sanmi Jnr</p>
                </main>

                <footer>
                    <Link 
                        to="/login"
                        className="clickable" 
                    >
                        <FaHandPointRight/>
                        <i>Employee Login</i>
                    </Link>
                </footer>
            </div>
            
            {/* public right-side panel */}
            <div className="public__right">
                <img src={lendsqr_vector} alt="svg-center" />
            </div>

        </section>

    )
    return content
}
export default Public