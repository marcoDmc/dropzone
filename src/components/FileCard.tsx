import { ElementType } from "react"

interface FileCardProps {
    name: string,
    Icon: ElementType,
    styles:string,
    size:number
}

export default function FileCard({ name, Icon , styles , size }: FileCardProps) {
    return (
        <>
            <div className="
            grid 
            place-items-center
            rounded pl-2
            grid-cols-3
            bg-neutral-200
            h-auto
            w-full
            min-w-full
            py-1
            max-sm:grid-cols-1
            max-sm:gap-3
            transition-all
            ">
                <div className="
                grid
                w-full
                gap-5
                col-start-1
                col-end-3
                max-sm:col-start-1
                max-sm:col-end-1
                transition-all
                ">
                    <strong className="
                    w-full text-xs capitalize max-sm:text-center flex  gap-2 items-center
                    max-sm:grid max-sm:place-items-center
                    transition-all
                    ">
                        <Icon className={styles} size={size}/>
                        {name}
                    </strong>
                    <p className="
                     w-full text-xs text-neutral-400
                    max-sm:text-center
                    ">Lorem ipsum dolor sit amet, consectetur adi</p>
                </div>
                <button className="
                bg-neutral-100
                w-full max-w-20
                p-1.5
              text-neutral-800
                rounded capitalize
                border border-neutral-400
                col-start-3
                col-end-3
                font-semibold text-xs
                shadow-md
              shadow-neutral-400
              transition-all
              hover:scale-105
              hover:transition-all
              max-sm:col-start-1
              max-sm:col-end-1
                ">download</button>
            </div>
        </>
    )
}