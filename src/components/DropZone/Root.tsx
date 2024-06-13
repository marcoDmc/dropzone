import { ReactNode } from "react";

interface RootProps {
    children: ReactNode,
}

export function Root({ children }: RootProps) {

    return (<>
        <section className="bg-zinc-900 w-screen h-screen flex items-center justify-center">
            {children}
        </section>
    </>)
}
