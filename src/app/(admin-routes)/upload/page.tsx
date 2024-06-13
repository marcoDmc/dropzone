"use client"
import Cookies from "js-cookie"
import { methods } from "@/utils/methods";
import { useEffect, useState } from "react";
import { ICredentialFiles } from "@/types/ICredentialFilesDTO"
import { archive } from "@/service/archive";
import { DropZone } from "@/components/DropZone/DropZone";

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

        if (status !== 201 || status === null) setSpinner(true)
        else setSpinner(false)

        if (!event.target.file.files[0]) return

        const file = event.target.file.files[0]

        if (getToken && getEmail) {

            const response = await archive.handleCreate(getEmail, file, getToken)
            setStatus(response?.status)

            if (response?.status !== 201) {
                setRange(0)
                setSpinner(false)
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

            setRange(response?.total)
        }
    }

    useEffect(() => {
        async function handleUrlDownloadFile() {

            const url = await archive.getFile({
                email: getEmail,
                filename: fileInfo.filename,
                status: Number(status)
            })

            setFileInfo(prev => ({ ...prev, url: url }))
        } handleUrlDownloadFile()
    }, [status]);


    useEffect(() => {
        setStatus(0)
        setRange(0)
        setSpinner(false)
    }, [fileInfo.filename])

    return (
        <>
            <DropZone.Root>
                <DropZone.Content>
                    <DropZone.Form
                        handleSubmit={handleSubmit}
                        handleGetNameFile={handleGetNameFile}
                        file={file}
                        filename={fileInfo.filename}
                        range={range}
                        size={fileInfo.size}
                        spinner={spinner}
                        status={status}
                        type={fileInfo.type}
                        url={fileInfo.url}
                    />
                </DropZone.Content>
            </DropZone.Root>
        </>
    );
}