import { Routes, Route } from 'react-router-dom'
import { useState} from "react"
import Layout from "./components/Layout"
import Public from './components/Public'
import Missing from './components/Missing'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Dashboard from './features/dashboard/DashBoard'
import UsersList from './features/users/UsersList'
import ActiveUsersList from './features/users/ActiveUsersList'
import SearchUsersList from './features/users/SearchUsersList'
import UserInfo from './features/user/UserInfo'
import RequireAuth from './features/auth/RequireAuth'
import Prefetch from './features/auth/Prefetch'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {
  //***required states***
  const [search, setSearch] = useState('') // <<< search control states
  useTitle('Lendsqr Dashapp') // <<< set page title

  return (
   <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>

            <Route  
              element={<DashLayout search = {search} setSearch = {setSearch} />}
            >{/*Pages within uses Dash layout*/}

              <Route path="dashboard" element={<Dashboard 
                setSearch = {setSearch}
              />} />

              <Route path="users">
                <Route index element={<UsersList setSearch = {setSearch} />} />
                <Route path="actives" element={<ActiveUsersList setSearch = {setSearch}/>} />
                <Route path="search-results" element={<SearchUsersList search = {search} />} />
              </Route>
              
              <Route path="user">
                <Route path=':userId' element={<UserInfo />} />
              </Route>
              

            </Route>{/* End Dash */}

          </Route>
        </Route> {/* End Protected Routes */}

        <Route path="*" element={<Missing />} />  {/* catch all */}

      </Route>
    </Routes >
  );
}


export default App;
