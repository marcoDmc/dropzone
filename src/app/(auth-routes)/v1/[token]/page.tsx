'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion"
import { magicLink } from "@/service/magicLink";

export default function urlTokenEmail() {
    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        if (!params.token) return

        async function handleMagicLink() {
            const response = await magicLink.verifyMagicLink(String(params.token))
            setTimeout(() => {
                if (response != 200) router.push("/")
                else router.push("/change/password")
            }, 10000);
        }
        handleMagicLink()
    }, [])

    return (
        <>
            <section className="bg-zinc-900 grid place-items-center justify-center h-screen w-full text-white">
                <div className="bg-neutral-100 w-full max-w-44 h-44 rounded-full bg-gradient-to-r from-cyan-500 ...
                     relative
                     animate-spin
                     after:absolute
                     after:content-['']
                     after:bg-zinc-900
                     after:w-32
                     after:h-32
                     after:rounded-full
                     after:top-6
                     after:right-6
                     before:absolute
                     before:content-['']
                     before:bg-zinc-900
                     before:top-0
                     before:w-14 
                     before:h-24
                     ">

                </div>
                <motion.h1 className="text-5xl capitalize" animate={{}}>
                    please wait... </motion.h1>
            </section>
        </>
    )
}