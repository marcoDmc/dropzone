"use client"
import Cookies from "js-cookie"
import { methods } from "@/utils/methods";
import { useEffect, useState } from "react";
import { archive } from "@/service/archive";
import { DropZone } from "@/components/DropZone/DropZone";
import { Archive } from "@/types/global";

export default function Upload() {
    const [file, setFile] = useState({
        filename: "",
        type: "",
        size: "",
        url: ""
    });

    const [credentials, setCredentials] = useState({ status: 0, spinner: false, range: 0 })

    const filetype = methods.handleReturnTypeFile(file.filename)

    const getToken = String(Cookies.get("token"))

    const getEmail = String(Cookies.get("email"))

    const handleGetNameFile = (e: any) => {

        if (e.target.files[0]) {
            if (methods.handleVerifyFiles(e.target.files[0].name.split(".")[1])) {
                const { name, type, size } = e.target.files[0]
                // @ts-ignore
                setFile(prev => ({
                    ...prev,
                    filename: methods.handleFilenameFormatting(name),
                    type: type,
                    size: methods.handleConvertingMeasurements(size)
                }
                ))
            }
            return
        }
    }
    const handleSubmit = async (event: any) => {

        event.preventDefault()

        if (!event.target.file.files[0]) return

        const file = event.target.file.files[0]

        if (!getToken || !getEmail) return

        const request: Archive = await archive.handleCreate(getEmail, file, getToken)

        setCredentials(prev => ({ ...prev, range: request?.total, status: request.status, spinner: true }))

        if (!request) {

            setCredentials(prev => ({ ...prev, range: 0, spinner: false }))
            setFile(prev => ({
                ...prev,
                filename: "",
                type: "",
                size: ""
            }
            ))

            return window.alert("file already exist")
        }
    }


    useEffect(() => {
        async function handleUrlDownloadFile() {
            const url = await archive.getFile({
                email: getEmail,
                filename: file.filename,
                status: Number(credentials.status)
            })

            setFile(prev => ({ ...prev, url: url }))
        } handleUrlDownloadFile().then(res => res)
    }, [credentials.status]);


    useEffect(() => setCredentials(prev => ({ ...prev, status: 0, range: 0, spinner: false })), [file.filename])

    return (
        <>
            <DropZone.Root>
                <DropZone.Content>
                    <DropZone.Form
                        handleSubmit={handleSubmit}
                        handleGetNameFile={handleGetNameFile}
                        file={filetype}
                        filename={file.filename}
                        range={credentials.range}
                        size={file.size}
                        spinner={credentials.spinner}
                        status={credentials.status}
                        type={file.type}
                        url={file.url}
                        setRange={setCredentials}
                    />
                </DropZone.Content>
            </DropZone.Root>
        </>
    );
}