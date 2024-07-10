import { ReactNode } from "react"

interface ContentProps {
    children: ReactNode
}


export default function Content({ children }: ContentProps) {
    return <>
        <div
            className="h-full w-full grid gap-2">
            {children}
        </div>
    </>
}