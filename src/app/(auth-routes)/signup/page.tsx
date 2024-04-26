"use client"

import { FormComponent } from "@/components/FormComponent/Form"
import { Http } from "@/config/axiosConfig"
import { methods } from "@/utils/methods"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import { BsAt, BsKey } from "react-icons/bs"




export default function Signup() {

    const [credentials, setCredentials] = useState({ name: "", password: "", email: "" })

    const handleSubmit = async (e: SyntheticEvent) => {

        e.preventDefault()

        const testNickname = methods.handleVerifyNickname(credentials.name)
        const testPassword = methods.handleVerifyPassword(credentials.password)
        const testEmail = methods.handleVerifyEmail(credentials.email)


        if (!testNickname || !testPassword || !testEmail) return


        const data = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        }

        try {
            await Http.post("/user/create", data)
                .then(res => window.alert(res.data))
                .catch(err => err)
        } catch (err) {
            console.error(err)
        }
    }


    const handleNickname = (e: ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, name: e.target.value })
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, password: e.target.value })
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, email: e.target.value })





    return (
        <>
            <section className="
                        h-screen
                        flex
                        flex-col
                        items-center
                        justify-center
                        bg-zinc-900
                        ">

                <FormComponent.Root handleSubmit={handleSubmit}>

                    <FormComponent.Content>
                        <fieldset className="
                        
                                border
                                border-zinc-500
                                h-full
                                grid
                                gap-3
                                place-items-center
                                bg-zinc-800
                                p-2
                                px-4
                                rounded-xl
                                w-full
                                relative
                                after:content-['']
                                after:absolute
                                after:w-full
                                after:h-px
                                after:bg-neutral-700
                                after:top-11
                                " >
                            <label htmlFor="name" className="w-full flex">
                                <input type="text"
                                    id="name"
                                    placeholder="your nickname"
                                    value={credentials.name}
                                    autoComplete="off"
                                    onChange={handleNickname}
                                    className="
                                    bg-transparent
                                    w-full
                                    p-1
                                    outline-none
                                    text-neutral-100
                                    placeholder:text-sm
                                    "
                                />
                            </label>
                            <label htmlFor="email" className="w-full flex
                               items-center
                               justify-between
                            ">
                                <input type="email"
                                    id="email"
                                    placeholder="you@domain.com"
                                    value={credentials.email}
                                    onChange={handleEmail}
                                    autoComplete="off"
                                    className="
                                    bg-transparent
                                    w-full
                                    p-1
                                    outline-none
                                    placeholder:text-sm
                                    text-neutral-100
                                    "
                                />

                                <BsAt size={25} style={{ color: "#fff" }} />
                            </label>
                            <label htmlFor="password" className="
                                    w-full flex
                                    items-center
                                    justify-between
                                    " >
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="your secret password"
                                    value={credentials.password}
                                    onChange={handlePassword}
                                    autoComplete="off"
                                    className="
                                    w-full
                                    p-1
                                    outline-none
                                    text-neutral-100
                                    bg-transparent
                                    placeholder:text-sm
                                    "
                                />
                                <BsKey size={25} style={{ color: "#fff" }} />;
                            </label>
                        </fieldset>
                        <button
                            className="
                                w-full
                                bg-blue-600
                                rounded-lg
                                p-1 first-letter:capitalize
                                text-neutral-100
                                hover:opacity-75
                                hover:transition-all
                                "
                            type="submit"
                        >sign up</button>
                    </FormComponent.Content>
                </FormComponent.Root>
                <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-24">
                    <p className="first-letter:capitalize">
                        return for <a href="http://localhost:3000" className="text-blue-400">sign in</a>
                    </p>
                </div>
            </section>
        </>
    )
}
