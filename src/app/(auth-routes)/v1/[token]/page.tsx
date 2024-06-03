'use client'


import {useParams} from "next/navigation";
import {useEffect} from "react";
import {Http} from "@/app/config/axiosConfig";

export default function urlTokenEmail() {

    const {token} = useParams()



//    useEffect(() => {
//        async function teste() {
//            const request = await Http.get(`/forgot-password/${token}`).then(res => console.log(res.data)).catch(error => console.error(error))
////            if (request)
//        }
//
//        teste()


//    }, [])
    return (
        <>
            <section className="bg-zinc-900
                              grid
                            place-items-center
                            h-screen
                            w-full
                            ">

                <div className="bg-neutral-100 w-full max-w-52 h-52 rounded-full
                     relative
                     animate-spin
                     after:absolute
                     after:content-['']
                     after:bg-zinc-900
                     after:w-40
                     after:h-40
                     after:rounded-full
                     after:top-6
                     after:right-6
                     before:absolute
                     before:content-['']
                     before:bg-zinc-900
                     before:top-0
                     before:w-16 
                     before:h-20
                     ">

                </div>

            </section>
        </>
    )
}