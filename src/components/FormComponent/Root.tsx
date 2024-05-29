import Image from "next/image"
import { ReactNode, SyntheticEvent } from "react"
import files from "../../app/android-chrome-512x512.png"

interface RootProps {
    children: ReactNode,
    handleSubmit: (e: SyntheticEvent) => void
}


export default function Root({ children, handleSubmit }: RootProps) {
    return <>
        <Image
            src={files}
            width={55} height={55}
            style={{ position: "fixed", zIndex: 1, top: "15%" }
            } alt="file icon" />
        <h1 className="
        text-blue-400 *:font-semibold
        text-3xl
        capitalize
        fixed z-10
        top-40
        w-full
        text-center
        ">drop zone</h1>
        <form className="
        border
        border-zinc-500
        bg-zinc-950
        w-full 
        max-w-xs
        h-auto
        rounded-xl 
        p-2
        fixed
        top-60
        "
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    </>
}