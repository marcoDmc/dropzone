"use client"
import { ReactNode } from "react"

interface FileRootProps {
    children: ReactNode
}


export default function FileRoot({ children }: FileRootProps) {
    const forms = (e: any) => {
        e.preventDefault()
    }
    return (
        <><form
            encType="multipart/form-data"
            onSubmit={forms}
            className="grid
            bg-neutral-100
            w-full
            max-w-96
            overflow-hidden
            rounded
            h-auto
            gap-5
            p-5
            shadow-lg shadow-neutral-500
            "
        >{children}</form></>
    )
}