'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { magicLink } from "@/service/magicLink";
import { IVerifyMagicLinkDTO } from "@/types/IVerifyMagicLinkDTO";

export default function urlTokenEmail() {
    const params = useParams()
    const router = useRouter()
    const [credential, setCredential] = useState<IVerifyMagicLinkDTO>({ status: 0, message: "", data: "" })

    useEffect(() => {
        if (!params.token) return

        async function handleMagicLink() {
            const response = await magicLink.verifyMagicLink(String(params.token))
            setCredential(prev => ({ ...prev, status: response.status, message: response.message, data: response.data }))
            setTimeout(() => {
                if (response.status != 200) router.push("/")
                else router.push("/change/password")
            }, 5000);
        }
        handleMagicLink()
    }, [])

    return (
        <>
            <section className="bg-zinc-900 h-screen w-full items-center gap-16 justify-center flex flex-col">
                <div className="bg-neutral-100 flex items-center justify-center w-full max-w-44 h-44  rounded-full bg-gradient-to-r from-cyan-500 ... relative  animate-spin">
                    <div className=" bg-zinc-900 w-32 h-32 rounded-full"></div>
                    <div className="absolute bg-zinc-900 w-16 h-28 top-0"></div>
                </div>
                <h1 className="text-4xl capitalize text-neutral-50">
                    {!credential.data ? "please wait..." : credential.data}</h1>
            </section>
        </>
    )
}