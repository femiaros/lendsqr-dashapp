import { useSelector } from "react-redux"
import { selectUserById } from "./usersSlice"
import { Link } from 'react-router-dom'

let UsersExcerpt = ({userId}) => {
  const user = useSelector(state => selectUserById(state, userId));

  

  return (
    <li><Link to={`users/${user.id}`}>{`View User ${user.userName}:ID ${user.id}`}</Link></li>
  )
}

//import React from 'react' || component only Re-render if prop(post) chnges
// UsersExcerpt = React.memo(UsersExcerpt)

export default UsersExcerpt