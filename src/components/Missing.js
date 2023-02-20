import {MdRunningWithErrors} from 'react-icons/md'

const Missing = () => {
  return (
    <div className='missing'>
        <MdRunningWithErrors/>
        <span>Sorry, page not found</span>
    </div>
  )
}

export default Missing