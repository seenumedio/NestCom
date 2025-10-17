import { rootApi } from "../api/rootApi";

export const postApi = rootApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllPosts: builder.query({
            query: ()=> '/posts'
        })
    })
})

export const {useGetAllPostsQuery} = postApi