import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserCredentials {
    nickname: string,
    password: string,
    token: string
}

const initialState: UserCredentials = {
    nickname: "",
    password: "",
    token: ""
}

export const credentials = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.nickname = payload
            state.password = payload
            state.token = payload
        }
    },
})

export const { setCredentials } = credentials.actions

export default credentials.reducer