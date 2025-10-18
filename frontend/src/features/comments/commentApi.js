import { rootApi } from "../api/rootApi";

export const commentApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (postId) => `/comments/${postId}/comments`,
            providesTags: ['Comment']
        }),
        addComment: builder.mutation({
            query: ({ data, postId }) => ({
                method: 'POST',
                url: `/comments/${postId}/createComment`,
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                method: 'DELETE',
                url: `/comments/${postId}/comments/${commentId}`
            }),
            invalidatesTags: ['Comment']
        }),
        updateComment: builder.mutation({
            query: ({ postId, commentId, data }) => ({
                method: 'PATCH',
                url: `/comments/${postId}/comments/${commentId}`,
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        likeComment: builder.mutation({
            query: ({ postId, commentId, data }) => ({
                method: 'PATCH',
                url: `/comments/${postId}/comments/${commentId}/likes`,
                body: data
            }),
            invalidatesTags: ['Comment']
        })
    })
})
export const {
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useLikeCommentMutation,
} = commentApi