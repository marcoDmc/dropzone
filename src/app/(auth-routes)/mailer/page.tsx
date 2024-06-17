'use client'

import { FormComponent } from "@/components/FormComponent/Form";
import { ChangeEvent, useState } from "react";
import { mailer } from "@/service/mailer";


export default function ForgotPassword() {

    const [email, setEmail] = useState<string>("")

    const handlEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const rgxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email) {
            if (!rgxEmail.test(email)) return
        }

        const response = await mailer.sendMagicLink(email)

        window.alert(response.message)

    }


    return (
        <>
            <section className="bg-zinc-900 grid place-items-center h-screen w-full">
                <FormComponent.Root handleSubmit={handleSubmit}>
                    <FormComponent.Content>
                        <fieldset className="border border-zinc-500 h-full grid gap-3 place-items-center bg-zinc-800 p-2 px-4 rounded-xl w-full">
                            <label htmlFor="email" className="w-full flex">
                                <input type="email"
                                    id="email"
                                    autoComplete="off"
                                    placeholder="your email"
                                    value={email}
                                    onChange={handlEmail}
                                    className="bg-transparent w-full outline-none text-neutral-100 placeholder:text-sm" />
                            </label>
                        </fieldset>
                        <FormComponent.Button name="continue" />
                    </FormComponent.Content>
                </FormComponent.Root>
                <div
                    className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-20">
                    <p className="first-letter:capitalize">
                        return for <a href="/" className="text-blue-400">sign in</a>
                    </p>
                </div>
            </section>
        </>
    )
}