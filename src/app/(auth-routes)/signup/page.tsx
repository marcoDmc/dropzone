"use client"

import { FormComponent } from "@/components/FormComponent/Form"
import { Http } from "@/app/config/axiosConfig"
import { methods } from "@/utils/methods"
import { ChangeEvent, useState } from "react"
import Icon from "@/utils/icons"
import { ISignupData } from "@/types/ISignupDataDTO"
import { useRouter } from "next/navigation";
import { signup } from "@/service/signup"

export default function Signup() {

    const [credential, setCredential] = useState({ name: "", password: "", email: "" })
    const router = useRouter()
    const handleSubmit = async (event: any) => {

        event.preventDefault()

        const testNickname = methods.handleVerifyNickname(credential.name)
        const testPassword = methods.handleVerifyPassword(credential.password)
        const testEmail = methods.handleVerifyEmail(credential.email)


        if (!testNickname || !testPassword || !testEmail) return

        await signup.handleSignup({
            name: credential.name,
            email: credential.email,
            password: credential.password
        }).then(response => window.alert(response))

        router.replace("/")

    }


    const handleNickname = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, name: e.target.value })
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, password: e.target.value })
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, email: e.target.value })

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
                                    placeholder="your name"
                                    value={credential.name}
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
                                    value={credential.email}
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

                                <Icon.BsAt size={25} style={{ color: "#fff" }} />
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
                                    value={credential.password}
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
                                <Icon.BsKey size={25} style={{ color: "#fff" }} />;
                            </label>
                        </fieldset>
                        <FormComponent.Button name="sign up" />
                    </FormComponent.Content>
                </FormComponent.Root>
                <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-20">
                    <p className="first-letter:capitalize">
                        return for <a href="/" className="text-blue-400">sign in</a>
                    </p>
                </div>
            </section>
        </>
    )
}
