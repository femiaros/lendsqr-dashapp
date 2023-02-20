import {MdRunningWithErrors} from 'react-icons/md'

const ErrorPage = ({msg}) => {
  return (
    <div className='error-page'>
        <MdRunningWithErrors/>
        <span>{msg}</span>
    </div>
  )
}

export default ErrorPage