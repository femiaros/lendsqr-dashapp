import { createSlice, createAsyncThunk, createSelector, createEntityAdapter} from "@reduxjs/toolkit"

import axios from "axios";

const LENDSQR_USERS_URL = 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users';

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState({
    displayIds:[],
    moreMenuState:{
        open: false,
        id: '1' //default
    },
    editFormState:{
        open: false,
        id: '1' //default
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(LENDSQR_USERS_URL)
    return response.data
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUser(state,action){
            if (!action.payload?.id) { // if for some reason, no-Id 
                window.alert('Update could not complete')
                console.log(action.payload)
                return;
            }
            usersAdapter.upsertOne(state,action.payload)
        },
        updateDisplayIds(state,action){
            state.displayIds = [...action.payload];
        },
        updateMoreMenuOpenState(state,action){
            state.moreMenuState.open = action.payload
        },
        updateMoreMenuIdState(state,action){
            const {id} = action.payload
            state.moreMenuState.id = id
        },
        updateEditFormOpenState(state,action){
            state.editFormState.open = action.payload
        },
        updateEditFormIdState(state,action){
            const {id} = action.payload
            state.editFormState.id = id
        },
        updateBlacklist(state,action){
            const {blacklistId} = action.payload
            const existingUser = state.entities[blacklistId]

            if(existingUser){
                existingUser.status = {
                    active:false, // auto deactivate user
                    blacklist: !existingUser.status.blacklist
                }
                console.log('***status chnaged***')
                console.log(existingUser.status.blacklist)
            }
        },
        updateActive(state,action){
            const {activeId} = action.payload
            const existingUser = state.entities[activeId]

            // activate && deactivate onlyif user isnt blacklisted
            if(!existingUser.status.blacklist){
                existingUser.status = {
                    active: !existingUser.status.active, 
                    blacklist: existingUser.status.blacklist
                }
            }
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                    state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'

                // Adding Status && Blacklist props to fetched data
                const loadedUsers = action.payload.map(user => {
                    if (!user?.status) user.status = {
                        active:false,
                        blacklist:false
                    }
                    return user;
                });
                // Add mutated fetched users to the array
                usersAdapter.upsertMany(state,loadedUsers);
                //filter out the First-10 Ids
                const filteredIds = loadedUsers.filter(user=> user.id <= 10).map(user=> user.id)
                state.displayIds = filteredIds
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds
    // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(state => state.users);

export const getDisplayIds = (state) => state.users.displayIds
export const getUsersStatus = (state) => state.users.status
export const getUsersError = (state) => state.users.error
export const getMoreMenuState = (state) => state.users.moreMenuState
export const getEditFormState = (state) => state.users.editFormState

export const selectActiveUsers = createSelector(
    selectAllUsers,
    (users) => users.filter((user) => user.status.active)
)

export const selectHighBalanceUsers = createSelector(
    selectAllUsers,
    (users) => users.filter((user,i) => i < 5).sort((a,b)=> parseFloat(b.accountBalance) - parseFloat(a.accountBalance))
)

export const selectFirstTenUsers = createSelector(
    selectAllUsers,
    (users) => users.filter((user,i) => i < 10).map(user=> user.id)
)

export const selectFirstTenActives = createSelector(
    selectAllUsers,
    (users) => users.filter(user => user.status.active).map(user=> user.id).filter((user,i) => i<10)
)

export const selectActiveUsersIds = createSelector(
    selectAllUsers,
    (users) => users.filter(user => user.status.active).map(user=> user.id)
)

export const selectUsersBySearch = createSelector(
    [selectAllUsers, (state, search) => search],
    // filter users in related to search
    (users, search) => users.filter(user=>(
      ((user.userName).toLowerCase()).includes(search.toLowerCase()) || ((user.phoneNumber).toLowerCase()).includes(search.toLowerCase()) || ((user.email).toLowerCase()).includes(search.toLowerCase()) || ((user.orgName).toLowerCase()).includes(search.toLowerCase()) || ((user.accountNumber).toLowerCase()).includes(search.toLowerCase())
    ))
)

export const selectSearchUsersIds = createSelector(
    selectUsersBySearch,
    (users) => users.map(user=> user.id)
)

export const selectFirstTenSearch = createSelector(
    selectUsersBySearch,
    (users) => users.filter((user,i) => i<10).map(user=> user.id)
)


export const {updateUser,updateDisplayIds,updateMoreMenuOpenState,updateMoreMenuIdState,updateEditFormOpenState,updateEditFormIdState,updateBlacklist,updateActive} = usersSlice.actions
export default usersSlice.reducer