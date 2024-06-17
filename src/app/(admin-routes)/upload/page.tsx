"use client"
import Cookies from "js-cookie"
import { methods } from "@/utils/methods";
import { useEffect, useState } from "react";
import { ICredentialFilesDTO } from "@/types/ICredentialFilesDTO"
import { archive } from "@/service/archive";
import { DropZone } from "@/components/DropZone/DropZone";

export default function Upload() {
    const [fileInfo, setFileInfo] = useState<ICredentialFilesDTO>({
        filename: "",
        size: "",
        type: "",
        url: ""
    });

    const [credentials, setCredentials] = useState({ status: 0, spinner: false, range: 0 })

    const file = methods.handleReturnTypeFile(fileInfo.filename)

    const getToken = String(Cookies.get("token"))

    const getEmail = String(Cookies.get("email"))

    const handleGetNameFile = (e: any) => {

        if (e.target.files[0]) {
            if (methods.handleVerifyFiles(e.target.files[0].name.split(".")[1])) {
                const { name, type, size } = e.target.files[0]
                // @ts-ignore
                setFileInfo(prev => ({
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

        if (credentials.status !== 201 || credentials.status === null) setCredentials(prev => ({ ...prev, spinner: true }))
        else setCredentials(prev => ({ ...prev, spinner: false }))

        if (!event.target.file.files[0]) return

        const file = event.target.file.files[0]

        if (getToken && getEmail) {

            const response = await archive.handleCreate(getEmail, file, getToken)
            setCredentials(prev => ({ ...prev, status: response?.status }))

            if (response?.status !== 201) {
                setCredentials(prev => ({ ...prev, range: 0, spinner: false }))
                setFileInfo(prev => ({
                    ...prev,
                    filename: "",
                    type: "",
                    size: ""
                }
                ))
                window.alert("file already exist")
                return

            }

            setCredentials(prev => ({ ...prev, range: response?.total }))
        }
    }

    useEffect(() => {
        async function handleUrlDownloadFile() {

            const url = await archive.getFile({
                email: getEmail,
                filename: fileInfo.filename,
                status: Number(credentials.status)
            })

            setFileInfo(prev => ({ ...prev, url: url }))
        } handleUrlDownloadFile()
    }, [credentials.status]);


    useEffect(() => setCredentials(prev => ({ ...prev, status: 0, range: 0, spinner: false })), [fileInfo.filename])

    return (
        <>
            <DropZone.Root>
                <DropZone.Content>
                    <DropZone.Form
                        handleSubmit={handleSubmit}
                        handleGetNameFile={handleGetNameFile}
                        file={file}
                        filename={fileInfo.filename}
                        range={credentials.range}
                        size={fileInfo.size}
                        spinner={credentials.spinner}
                        status={credentials.status}
                        type={fileInfo.type}
                        url={fileInfo.url}
                    />
                </DropZone.Content>
            </DropZone.Root>
        </>
    );
}