import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Api-Slice created with Lendsqr baseQuery URL attached
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1' }),
    tagTypes: ['User'],
    endpoints: builder => ({})
})