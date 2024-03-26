import { ReactNode } from "react"

interface FileRootProps {
    children: ReactNode
}


export default function FileRoot({ children }: FileRootProps) {
    return (
        <><div
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
        >{children}</div></>
    )
}