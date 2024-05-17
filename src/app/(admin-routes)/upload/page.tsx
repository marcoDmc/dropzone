"use client"

import { Http } from "@/app/config/axiosConfig";
import { request } from "@/service/request";
import { methods } from "@/utils/methods";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { environment } from "@/utils/environment";
import { ICredentialFiles } from "@/types/ICredentialFiles"
import Icon from "@/utils/icons"
import cookie from "js-cookie"

export default function Upload() {
    const [fileInfo, setFileInfo] = useState<ICredentialFiles>({
        filename: "",
        size: "",
        type: "",
        url: ""
    });
    const [status, setStatus] = useState<number | null>();
    const [spinner, setSpinner] = useState<boolean>(false)
    const [range, setRange] = useState<number | null | undefined>(0)
    const file = methods.handleReturnTypeFile(fileInfo.filename)

    const handleGetNameFile = (e: any) => {

        if (e.target.files[0]) {
            if (methods.handleVerifyFiles(e.target.files[0].name.split(".")[1])) {

                const filename = e.target.files[0].name
                const filetype = e.target.files[0].type
                const filesize = e.target.files[0].size

                setFileInfo(prev => ({ ...prev, filename: methods.handleFilenameFormatting(filename) }))
                setFileInfo(prev => ({ ...prev, type: filetype }))
                setFileInfo(prev => ({ ...prev, size: methods.handleConvertingMeasurements(filesize) }))
            }
            return
        }
    }
    const handleSubmit = async (event: any) => {

        event.preventDefault()

        if (status !== 201 || status === null) setSpinner(true)
        else setSpinner(false)

        if (!event.target.file.files[0]) return

        const file = event.target.file.files[0]

        const getToken = String(cookie.get("token"))
        const getPassword = String(cookie.get("password"))

        if (getToken && getPassword) {

            const response = await request.handleUploadFile(environment.email, getPassword, file, getToken)
            setStatus(response?.status)

            if (response?.status !== 201) {
                setRange(0)
                setFileInfo(prev => ({ ...prev, filename: "" }))
                setSpinner(false)
                setFileInfo(prev => ({ ...prev, type: "" }))
                setFileInfo(prev => ({ ...prev, size: "..." }))
                window.alert("file already exist")
            }

            setRange(response?.total)
        }
    }

    useEffect(() => {
        const downloadFile = async () => {
            try {
                if (!fileInfo.filename || status !== 201) return;

                const response = await Http.get(`user/file/download/${fileInfo.filename}`, {
                    headers: {
                        'Content-Type': 'image/*',
                        'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
                        'Email': environment.email,
                        'Password': environment.password
                    },
                    responseType: 'blob'
                });

                const blob = new Blob([response.data], { type: 'image/*' });
                const url = URL.createObjectURL(blob);

                setFileInfo(prev => ({ ...prev, url: url }));

            } catch (error) {
                console.error('Error downloading the file:', error);
            }
        };

        downloadFile();
    }, [status]);


    useEffect(() => {
        setStatus(0)
        setRange(0)
        setSpinner(false)
    }, [fileInfo.filename])

    return (

        <>
            <section className="w-screen h-screen flex items-center justify-center">
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="
                    grid 
                  bg-neutral-100
                    w-full
                    max-w-96
                    overflow-hidden
                    rounded
                    h-auto
                    gap-5
                    p-5
                    shadow-lg
                    relative 
                    shadow-neutral-500
                    "
                >

                    <h1 className="
                        first-letter:uppercase
                        text-neutral-600
                        font-bold
                        text-2xl
                        w-full 
                        text-start
                        transition-all
        ">drop zone</h1>
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
                        <Icon.IoCloudUploadSharp size={35} className="
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
            ">size: <span className="text-red-500">{fileInfo.size ? fileInfo.size : "..."}</span></p>
                    </span >




                    <div className="
            grid 
            place-items-center
            rounded pl-2
            gap-16
            grid-cols-3
            bg-neutral-100
            shadow-md
            h-full
            min-h-32
            w-full
            min-w-full
            max-sm:grid-cols-1
            max-sm:gap-3
            transition-all
            py-2
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
                p-3
                bg-neutral-100
                ">
                            <strong className="
                    w-full max-w-xl text-xs capitalize max-sm:text-center flex  gap-2 items-center
                    max-sm:grid max-sm:place-items-center
                    transition-all 
                    ">
                                {
                                    file == "image" && <Icon.BsFileEarmarkImage size={20} style={{ color: "green" }} />
                                }
                                {
                                    file == "doc" && <Icon.BsFiletypeDoc size={20} style={{ color: "blue" }} />
                                }
                                {
                                    file == "pdf" && <Icon.PiFilePdf size={20} style={{ color: "red" }} />
                                }
                                {
                                    file == "excel" && <Icon.RiFileExcel2Line size={20} style={{ color: "orange" }} />
                                }
                                {
                                    file == "text" && <Icon.AiFillFileText size={20} style={{ color: "black" }} />
                                }
                                {fileInfo.filename ? fileInfo.filename : "waiting"}
                            </strong>
                            <p className="
                     w-full max-w-xl text-xs text-neutral-800
                     max-sm:text-center
                     whitespace-nowrap overflow-hidden text-ellipsis
                     ">{fileInfo.type ? fileInfo.type : "..."}</p>


                            {
                                Number(range) > 0 &&
                                <div className="bg-neutral-300 w-full h-1 rounded overflow-hidden flex">
                                    <span className={`bg-red-400 h-full transition-all`} style={{
                                        width: range + '%'
                                    }}></span>
                                </div>
                            }
                        </div>
                        {
                            status === 201 && (

                                <a href={
                                    fileInfo.url
                                } download={fileInfo.filename}>
                                    <div className="
                                  hover:border-red-300
                                    transition-all
                                    w-full
                                    max-w-14
                                    cursor-pointer
                                    p-2 rounded
                                  bg-neutral-100
                                    border
                                    flex
                                    items-center
                                    justify-center
                                    ">
                                        <Icon.ImDownload size={16} style={{ color: "red" }} />
                                    </div>
                                </a>
                            )
                        }

                        {
                            spinner && status !== 201 && (
                                <motion.div
                                    className="
                                        w-full
                                        max-w-7
                                      bg-blue-400
                                        rounded-full
                                        h-full
                                        max-h-7
                                        relative
                                        flex items-center
                                        justify-center
                                        after:absolute
                                        after:content-['']
                                        after:rounded-full
                                        after:bg-slate-50
                                        after:w-full
                                        after:max-w-5
                                        after:h-full
                                        after:max-h-5
                                        before:absolute
                                        before:content-['']
                                        before:bg-slate-50
                                        before:w-full
                                        before:max-w-3
                                        before:h-full
                                        before:max-h-1.5
                                        before:top-0
                                       "
                                    animate={{ rotate: 360 }}
                                    transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                                />

                            )
                        }
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
                        <button
                            className={
                                fileInfo.filename ?
                                    "bg-neutral-300 w-full max-w-20 p-1.5 outline-none text-neutral-500 rounded border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-pointer hover:scale-105 hover:transition-all opacity-100"
                                    : "bg-neutral-300 w-full max-w-20 p-1.5 text-neutral-500 rounded border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-none pointer-events-none opacity-35"
                            }
                        >ulpload</button>
                    </div>

                </form>

            </section>
        </>
    );
}
