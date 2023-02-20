import LendsqrLogo from "../../components/LendsqrLogo"
import lendsqr_vector from "../../svgs/lendsqr_vector.svg"
import {BsInfoCircle} from 'react-icons/bs'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { setCredentials } from "./authSlice"  
import { useRef, useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import {Link as LinkR,useNavigate,useLocation} from "react-router-dom"
import PulseLoader from 'react-spinners/PulseLoader'

// Email && pwd regex validation
const EMAIL_REGEX = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Login = () => {
    //required states
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    // set location path to where user is coming from or if user is just logging in send user to dashboard.
    const from = location.state?.from?.pathname || "/dashboard"

    const errRef = useRef()
    const emailRef = useRef()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [typePwd, setTypePwd] = useState(true)

    //focus on Email field once screen loads
    useEffect(() => {
        emailRef.current.focus()
    }, [])

    //when email field changes, check if its a valid email
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    //when pwd field changes, check if valid
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
    }, [pwd]) 

    //clear out error msg any time user types input
    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    //API url 
    const API_URL = 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users'

    // Handling Login Form Submission
    const handleSubmit = async (e)=>{
        e.preventDefault()
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }

        //connection to API starts
        setIsLoading(true)

        try {
            //requesting data from a GET endpoint 
            //to simulated login POST endpoint 
            const response = await fetch(API_URL);
            if(!response.ok) throw Error ('Did not receive data')

            //set credentials with authorization info
            //normally Token && Role will be gotten from a BackEnd 
            dispatch(setCredentials({ email,pwd, accessToken: 'Token' ,role: 'Employee'}))
            
            //clear state and controlled inputs
            setEmail('')
            setPwd('')
            //send user to where user is coming from or home page
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err.message)
            setErrMsg(err.message)
        }finally{
            setIsLoading(false)
        }
        
    }

    const content = (
        <section className='login'>

                {/* login-page left col */}
                <div className="login__left">
                    <div className="login__left__wrapper">
                        <LendsqrLogo/>
                        <div className="login__left__center">
                            <img src={lendsqr_vector} alt="svg-center" />
                        </div>
                    </div>                   
                </div>

                {/* login-page right col */}
                <div className="login__right">
                    <div className="login__right__wrapper">
                        <LendsqrLogo/>
                        <h1>Welcome!</h1>
                        
                        <p ref={errRef} className={errMsg ? "errmsg" : "loginInfo"} aria-live="assertive">
                            {errMsg ? 
                                <>
                                    <IoIosCloseCircleOutline/>
                                    <>{errMsg}</>
                                </>
                                : 
                                <>
                                    <span>
                                        < BsInfoCircle/>
                                        <>Required login details:</>
                                    </span>
                                    <i><b>Valid</b> Email and <b>Strong</b> Password.</i>
                                </>
                            }
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="input-wrapper">
                                <label htmlFor="email">
                                    Email: 
                                </label>
                                <input
                                    className={validEmail || !email 
                                        ? "" : "invalid"
                                    }
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    ref={emailRef}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-describedby="emailnote"
                                    aria-invalid={validEmail ? "false" : "true"}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    < BsInfoCircle/> 
                                    Enter a valid Email:
                                    <br />
                                    E.g: username@email.com
                                </p>
                            </div>

                            <div className="pwd-input-wrapper">
                                <label htmlFor="password">
                                    Password: 
                                </label>
                                <div className="pwd-holder">
                                    <input
                                        className={validPwd || !pwd ? "" : "invalid"}
                                        type={typePwd? 'password':'text'}
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    <span className="show-password" onClick={()=>setTypePwd(!typePwd)}>
                                        {typePwd? 'SHOW': 'HIDE'}    
                                    </span>
                                </div>
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <BsInfoCircle/>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>

                            <div className="forgot-pwd">
                                <LinkR to="/">forgot password?</LinkR>
                            </div>

                            <button 
                                disabled={!validEmail || !validPwd ? true : false} 
                                className={!validEmail || !validPwd ? 'disable' : ''}
                            >
                                {isLoading ? (<PulseLoader color={"#fff"} />) 
                                    :'Log in'
                                }
                            </button>
                        </form>

                    </div>

                </div>

        </section>
    )

    return content
}
export default Login