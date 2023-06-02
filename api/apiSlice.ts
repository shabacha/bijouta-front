import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials:'include',
    prepareHeaders: (headers,{ getState }) => {
        const token =  (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization",`Bearer ${token}`)
        }
        return headers
    }
})

// const baseQueryWithReauth = async (args:any,api:any,extraOptions:any) => {
//     let result = await baseQuery(args,api,extraOptions)
//     if (result?.error?.status === 401 ) {
//         console.log('Sending refresh token ')
//         const refreshResult = await baseQuery('/refresh',api,extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user
//             api.dispatch(login({...refreshResult.data,user}))
//             result = await baseQuery(args,api,extraOptions)

//         }else{
//             api.dispatch(logout)
//         }
//     }
// }
export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({
        getLogin: builder.query({ query: () => '/auth/login'})
    })
})

export const{ useGetLoginQuery } = apiSlice