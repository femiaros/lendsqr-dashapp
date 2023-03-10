import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})
//initialize Users State
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                // validateStatus: (response, result) => {
                //     return response.status === 200 && !result.isError
                // },
            }), 
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    if (!user?.status) user.status = {active:false,blacklist:false}
                    
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: "LIST" },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice