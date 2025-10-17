import { configureStore } from "@reduxjs/toolkit";
import commentReducer from '../features/comments/commentSlice'
import { commentApi } from '../features/comments/commentApi'
import postReducer from '../features/posts/postSlice'
import { postApi } from '../features/posts/postApi'
import {rootApi} from '../features/api/rootApi'

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        comments: commentReducer,
        posts: postReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootApi.middleware),
})