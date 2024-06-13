"use client"
import cookies from "js-cookie";
import Icon from "@/utils/icons"
import { methods } from "@/utils/methods";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { FormComponent } from "@/components/FormComponent/Form";
import { signin } from "@/service/signin";
import { INextAuth } from "@/types/INextAuthDTO";

export default function Signin() {

    const [credential, setCredential] = useState({ name: "", password: "" })
    const router = useRouter()

    const handleSubmit = async (event: any) => {

        event.preventDefault()

        if (!methods.handleVerifyNickname(credential.name) || !methods.handleVerifyPassword(credential.password)) return

        await handleAuthenticationRoutes({
            name: credential.name,
            password: credential.password
        })

        if (!credential.name || !credential.password) return


        const data = { name: credential.name, password: credential.password }

        const response = await signin.handleLogin(data)
        cookies.set("token", response?.token)
        cookies.set("email", response?.email)
    }

    const handleName = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, name: e.target.value })

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({

        ...credential,

        password: e.target.value

    })

    const handleAuthenticationRoutes = async (credentials: INextAuth) => {

        const { name, password } = credentials

        if (!name || !password) return

        const result = await signIn('credentials', {
            name,
            password,
            redirect: false
        })

        if (result?.error) {
            console.log(result)
            return
        }

        router.replace("/upload")
    }

    return (

        <>
            <section className="bg-zinc-900
      grid
      place-items-center
      h-screen
      w-full
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
            ">
                            <label htmlFor="name" className="w-full flex">
                                <input type="text"
                                    id="name"
                                    autoComplete="off"
                                    placeholder="your name"
                                    value={credential.name}
                                    onChange={handleName}
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
                            <label htmlFor="password" className="
                w-full flex
                items-center
                justify-between
              ">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="your secret password"
                                    value={credential.password}
                                    onChange={handlePassword}
                                    autoComplete="off"
                                    className="
                  bg-transparent
                  w-full
                  p-1
                  outline-none
                  text-neutral-100
                  placeholder:text-sm
                  "
                                />
                                <Icon.BsKey size={25} style={{ color: "#fff" }} />;

                            </label>
                        </fieldset>
                        <FormComponent.Button name="sign in" />
                    </FormComponent.Content>
                </FormComponent.Root>
                <div

                    className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-28">
                    <p className="first-letter:capitalize">
                        forgot your <a href="/mailer" className="text-blue-400">password</a>
                    </p>/
                    <p className="first-letter:capitaliz">
                        create an <a href="/signup" className="text-blue-400">account</a>
                    </p>
                </div>
            </section>
        </>
    );
}
