import { configureStore } from '@reduxjs/toolkit'
import userCredentials from '../../features/counter/counterSlice'

export const store = configureStore({
    reducer: {
        credential: userCredentials
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch