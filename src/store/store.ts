import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { RickMortyApi } from './api/RickMortyApi'
import counter from './slices/counterSlice'
import { RickMortyAllApi } from './api/RickMortyAllApi'
import HabitacionesSlice from "./Habitaciones";

export const store = configureStore({
  reducer: {
    counter: counter,
    // Add the generated reducer as a specific top-level slice
    [RickMortyApi.reducerPath]: RickMortyApi.reducer,
    [RickMortyAllApi.reducerPath]: RickMortyAllApi.reducer,
    Habitaciones: HabitacionesSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RickMortyApi.middleware,RickMortyAllApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)