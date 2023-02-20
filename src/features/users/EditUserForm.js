import {RiCloseCircleFill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { 
    selectUserById,
    getEditFormState,
    updateEditFormOpenState,
    updateUser
} from './usersSlice'

const EditUserForm = ({formValues, setFormValues}) => {
    const dispatch = useDispatch()

    const {open,id} = useSelector(getEditFormState)
    const user = useSelector((state) => selectUserById(state, id))

    // component functions 
    const handleChange =(e)=>{ // <<< handle change in input state
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleCloseEditForm = ()=>{
        //hide edit form component
        dispatch(updateEditFormOpenState(false))
    }

    const handleFormReset = ()=>{
        // reset edit user form states
        setFormValues({
            organization: '',
            username:'',
            date:'',
            phone:'',
            active:''
        })
    }

    const handleFormSubmit = (e)=>{
        //prevent form default
        e.preventDefault()

        let editedUser = {...user, id:id }
        // mutate edited user Obj 
        if(formValues.username){
            editedUser = {
                ...editedUser,
                userName: formValues.username
            }
        }
        if(formValues.organization){
            editedUser = {
                ...editedUser,
                orgName: formValues.organization
            }
        }
        if(formValues.date){
            editedUser = {
                ...editedUser,
                createdAt: formValues.date
            }
        }
        if(formValues.phone){
            editedUser = {
                ...editedUser,
                phoneNumber: formValues.phone
            }
        }
        if(formValues.active && formValues.active === "active"){
            editedUser = {
                ...editedUser,
                status: {
                    active: true,
                    blacklist: false
                }
            }
        }
        if(formValues.active && formValues.active === "inactive"){
            editedUser = {
                ...editedUser,
                status: {
                    active: false,
                    blacklist: false
                }
            }
        }
        console.log(editedUser)
        // submission
        dispatch(updateUser({...editedUser}))
        // reset edit user form states
        // setFormValues({
        //     organization: '',
        //     username:'',
        //     date:'',
        //     phone:'',
        //     active:''
        // })
        handleFormReset()
        //hide edit form component
        dispatch(updateEditFormOpenState(false))
    }

  return (
    <div className={open ? "user-edit open": "user-edit"}>
        <span className="user-edit__close" onClick={(e)=>handleCloseEditForm()}>
            <RiCloseCircleFill
                role='button' tabIndex='0' 
                aria-label='close filter form'
            />
        </span>

        <form 
            className="user-edit__form"
            onSubmit={(e)=>handleFormSubmit(e,user.id)}
        >
            <div className="input-wrapper">
                <label 
                    htmlFor="organization-input"
                >
                    Organization
                </label>
                
                <select 
                    id="organization-input"
                    name="organization"
                    required
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value={user.orgName}>{user.orgName.slice(0,20)}</option>  {/* <<< current organization */}
                    <option value="InterSwitch">InterSwitch</option>
                    <option value="Ancla-Techs">Ancla-Techs</option>
                    <option value="Lenovo-Techs">Lenovo-Techs</option>
                </select>
            </div>

            <div className="input-wrapper">
                <label htmlFor="username-input">Username</label>
                
                <input 
                    id="username-input"
                    type="text" 
                    name="username"
                    onChange={handleChange}
                    placeholder="User"
                    value={formValues.username}
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="date-input">Date</label>

                <input 
                    id="date-input"
                    type="datetime-local" 
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    placeholder="Date"
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="phone-input">Phone Number</label>
                
                <input 
                    id="phone-input"
                    type="tel" 
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="status-input">Status</label>
                
                <select 
                    id="status-input"
                    name="active"
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="btn-wrapper">
                <input 
                    type="reset" 
                    value="Reset" 
                    onClick={handleFormReset}
                />
                <input 
                    type="submit" 
                    value="Edit" 
                />
            </div>

        </form>
    </div>
  )
}

export default EditUserForm