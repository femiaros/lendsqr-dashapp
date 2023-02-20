import { store } from '../../app/store'
import { fetchUsers } from '../users/usersSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    //once component loads
    useEffect(() => {
        console.log('prefetch subscribed')
        store.dispatch(fetchUsers()) //prefetch users-data from lendsqrs API
        return ()=>{
            console.log('prefetch unsubscribed')
        }
    }, [])

    return <Outlet />
}
export default Prefetch