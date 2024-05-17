"use client"

import { ReactNode } from "react";
import { store } from '../store'
import { Provider } from 'react-redux'
interface ProviderComponentProps {
    children: ReactNode
}



export default function ProviderComponent({ children }: ProviderComponentProps) {
    return (<>
        <Provider store={store}>
            {children}
        </Provider>

    </>)
}