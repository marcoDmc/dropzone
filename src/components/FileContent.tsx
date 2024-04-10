"use client"

import { BsFileEarmarkImage, BsFiletypeDoc } from "react-icons/bs";
import { PiFilePdf } from "react-icons/pi";
import { RiFileExcel2Line } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { methods } from "../utils/typeFiles"


export default function FileContent() {

    const [fileExtension, setFileExtension] = useState("");
    const [size, setSize] = useState("");
    const [lastModifield, setLastModified] = useState("")

    const handleResetFileExt = () => {
        setFileExtension("")
        setLastModified("")
        setSize("")
    }
    const handleGetNameFile = (e: any) => {

        if (e.target.files[0]) {

            const filename = e.target.files[0].name
            const filetype = e.target.files[0].type
            const filesize = e.target.files[0].size

            setFileExtension(filename)
            setSize(filesize)
            setLastModified(filetype)
        }
    }
    useEffect(() => {
        if (fileExtension && methods.handleVerifyFiles(fileExtension.split(".")[1])) {
            setFileExtension(methods.handleFilenameFormatting(fileExtension))
            setSize(methods.convertingMeasurements(Number(size)))
            setLastModified(lastModifield)
        }
    }, [fileExtension, setSize, setLastModified])
    const file = methods.handleReturnTypeFile(fileExtension)






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
                <input onChange={handleGetNameFile} type="file" name="file" id="file"
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
                    ">supported formats: img/txt/pdf/doc/xlsx</p>
                <p
                    className="
                    text-xs
                    ">size: <span className="text-red-500">{size ? size : "..."}</span></p>
            </span >




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
                p-2
                ">
                    <strong className="
                    w-full max-w-xl text-xs capitalize max-sm:text-center flex  gap-2 items-center
                    max-sm:grid max-sm:place-items-center
                    transition-all 
                    ">
                        {
                            file == "image" ? <BsFileEarmarkImage size={20} style={{ color: "green" }} />
                                : ""
                        }
                        {
                            file == "doc" ? <BsFiletypeDoc size={20} style={{ color: "blue" }} />
                                : ""
                        }
                        {
                            file == "pdf" ? <PiFilePdf size={20} style={{ color: "red" }} />
                                : ""
                        }
                        {
                            file == "excel" ? <RiFileExcel2Line size={20} style={{ color: "orange" }} />
                                : ""
                        }
                        {
                            file == "text" ? <AiFillFileText size={20} style={{ color: "black" }} />
                                : ""
                        }

                        {fileExtension ? fileExtension : "waiting"}
                    </strong>
                    <p className="
                     w-full max-w-xl text-xs text-neutral-800
                    max-sm:text-center
                    whitespace-nowrap overflow-hidden text-ellipsis
                    ">{lastModifield ? lastModifield : "..."}</p>
                </div>
            </div>


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
                <button onClick={handleResetFileExt} className={
                    fileExtension ? "bg-neutral-100 w-full cursor-pointer max-w-20 p-1.5 text-neutral-800 rounded  border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all hover:scale-105 hover:transition-all opacity-100"
                        : "bg-neutral-100 w-full max-w-20 p-1.5 text-neutral-800 rounded cursor-default border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all  opacity-35"
                }
                >cancel</button>
                <button
                    className={
                        fileExtension ?
                            "bg-neutral-300 w-full max-w-20 p-1.5 text-neutral-500 rounded border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-pointer hover:scale-105 hover:transition-all opacity-100"
                            : "bg-neutral-300 w-full max-w-20 p-1.5 text-neutral-500 rounded border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-default opacity-35"
                    }
                >ulpload</button>
            </div>
        </>
    )
}