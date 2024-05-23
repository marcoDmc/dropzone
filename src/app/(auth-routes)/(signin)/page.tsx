"use client"

import { methods } from "@/utils/methods";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { FormComponent } from "@/components/FormComponent/Form";
import { Http } from "@/app/config/axiosConfig";
import { ISignin } from "@/types/ISignin";
import Icon from "@/utils/icons"
import cookie from "js-cookie"



export default function Signin() {

  const [credential, setCredential] = useState({ username: "", password: "" })
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!methods.handleVerifyNickname(credential.username) || !methods.handleVerifyPassword(credential.password)) return

    const result = await signIn('credentials', {
      username: credential.username,
      password: credential.password,
      redirect: false
    })

    const signin = await Http.post<ISignin>("/login", {
      username: credential.username,
      password: credential.password
    }).then(res => res.data)

    cookie.set("token", signin.token)
    cookie.set("username", credential.username)
    cookie.set("password", credential.password)

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace("/upload")

  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) =>  setCredential({ ...credential, username: e.target.value })

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, password: e.target.value })

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
            " >
              <label htmlFor="username" className="w-full flex">
                <input type="text"
                  id="username"
                  autoComplete="off"
                  placeholder="your username"
                  value={credential.username}
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
              " >
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
        <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-28">
          <p className="first-letter:capitalize">
            forgot your <a href="/forgot" className="text-blue-400">password</a>
          </p>/
          <p className="first-letter:capitaliz">
            create an <a href="/signup" className="text-blue-400">account</a>
          </p>
        </div>
      </section>
    </>
  );
}
