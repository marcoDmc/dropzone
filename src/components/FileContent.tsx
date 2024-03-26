import { ReactNode } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";


interface FileContentProps {
    children: ReactNode
}

export default function FileContent({ children }: FileContentProps) {
    return (
        <>
            <h1 className="
        first-letter:uppercase
        text-neutral-600
        font-bold
        text-2xl
        w-full 
        text-start
        transition-all
        ">upload file</h1>
            <div
                className="
            w-full
            h-full
            min-h-32
            grid 
            place-items-center
            border
            p-2
            gap-10
            border-blue-800
            border-dashed
            relative
            rounded
            bg-blue-100
            hover:bg-opacity-25
            transition-all
            hover:transition-all
            cursor-pointer
            "
            >
                <IoCloudUploadSharp size={35} className="
                text-blue-600
                "/>
                <input type="file" name="file" id="file"
                    className="w-full
                h-full
                bg-red-300
                absolute
                opacity-0
                cursor-pointer
                transition-all
                "
                />
                <p
                    className="
                text-neutral-500
                
                font-semibold
                text-xs
                w-full
                 flex
                 items-center
                 justify-center
                 gap-2
                 max-sm:grid
                 max-sm:place-items-center
                 transition-all
                
                "
                >Drag and drop file or

                    <span
                        className="
                    first-letter:uppercase
                    underline
                    "
                    >choose file</span>
                </p>
            </div>
            <span
                className="px-2
                     text-neutral-400
                      font-medium flex
                       w-full items-center
                        justify-between
                        max-sm:grid
                        max-sm:gap-4
                        transition-all
                        "

            >
                <p className="
                    text-xs w- full
                    first-letter:uppercase

                    ">supported formats:xls, xlsx</p>
                <p
                    className="
                    text-xs
                    ">maximum size:25mb</p>
            </span>
            {children}

            <div
                className="
            w-full
            flex justify-end
            items-center
            gap-1
            max-sm:justify-center
            transition-all
            "
            >
                <button
                    className="
                    bg-neutral-100
                    w-full max-w-20
                    p-1.5
                     text-neutral-800
                    rounded 
                    border border-neutral-400
                    font-semibold text-xs
                    shadow-md shadow-neutral-400
                    capitalize
                    transition-all
                    hover:scale-105
                    hover:transition-all

                "
                >cancel</button>
                <button
                    className="
                    bg-neutral-300
                    w-full max-w-20
                    p-1.5
                     text-neutral-500
                    rounded
                    border border-neutral-400
                    font-semibold text-xs
                    shadow-md shadow-neutral-400
                    capitalize
                    transition-all
                    hover:scale-105
                    hover:transition-all
                "
                >ulpload</button>
            </div>
        </>
    )
}