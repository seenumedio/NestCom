import { rootApi } from "../api/rootApi";

export const postApi = rootApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllPosts: builder.query({
            query: ()=> '/posts'
        }),
        getSpecificPost: builder.query({
            query:(postId)=> `/posts/${postId}`
        })
    })
})

export const {useGetAllPostsQuery, useGetSpecificPostQuery} = postApi