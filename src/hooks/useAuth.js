import { useSelector } from 'react-redux'
import { selectToken,selectRole,selectPwd,selectEmail } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectToken)
    const role = useSelector(selectRole)
    const email = useSelector(selectEmail)
    const pwd = useSelector(selectPwd)
    
    let isManager = false
    let isAdmin = false
    const status = role // role set as status bcos it's only 'Employee'

    if (token) { //hence Employee logged in

        return { userEmail: email, userPwd: pwd, status, roles: [role], isManager, isAdmin}
    }

    return { userEmail: '', userPwd: '', roles: [], isManager, isAdmin, status }
}
export default useAuth