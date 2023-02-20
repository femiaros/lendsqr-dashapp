import {MdOutlineFilterList} from 'react-icons/md'

const UsersListThead = () => {
  return (
    <thead className='userslist__table__thead'>
        <tr>
            <th className="organization-title">
                <>organization</>
                <MdOutlineFilterList/>
            </th>
            <th className=" username-title">
                <>username</>
                <MdOutlineFilterList/>
            </th>
            <th className="email-title">
                <>email</>
                <MdOutlineFilterList/>
            </th>
            <th className="phone-title">
                <>phone number</>
                <MdOutlineFilterList/>
            </th>
            <th className="email-title">
                <>date joined</>
                <MdOutlineFilterList/>
            </th>
            <th className="status-title">
                <>status</>
                <MdOutlineFilterList/>
            </th>
        </tr>
    </thead>
  )
}

export default UsersListThead