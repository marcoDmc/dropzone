"use client"

import { methods } from "@/utils/methods";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, SyntheticEvent } from "react";
import { signIn } from "next-auth/react";
import { FormComponent } from "@/components/FormComponent/Form";
import { BsKey } from "react-icons/bs";


export default function Home() {

  const [credential, setCredential] = useState({ name: "", password: "" })
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {

    e.preventDefault()

    const testNickname = methods.handleVerifyNickname(credential.name)
    const testPassword = methods.handleVerifyPassword(credential.password)

    if (!testNickname || !testPassword) return

    const result = await signIn('credentials', {
      name: credential.name,
      password: credential.password,
      redirect: false
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace("/upload")

  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, name: e.target.value })

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
              <label htmlFor="name" className="w-full flex">
                <input type="text"
                  id="name"
                  autoComplete="off"
                  placeholder="your nickname"
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
                <BsKey size={25} style={{ color: "#fff" }} />;

              </label>
            </fieldset>
            <button
              className="
            w-full
            bg-blue-600
            hover:opacity-75
            hover:transition-all
            rounded-lg
            p-1 first-letter:capitalize
            text-neutral-100
            "
              type="submit"
            >sign in</button>
          </FormComponent.Content>
        </FormComponent.Root>
        <div className="text-neutral-300 text-sm gap-2 w-full max-w-96 flex items-center justify-center fixed bottom-28">
          <p className="first-letter:capitalize">
            forgot your <a href="http://localhost:3000/forgot" className="text-blue-400">password</a>
          </p>/
          <p className="first-letter:capitaliz">
            create an <a href="http://localhost:3000/signup" className="text-blue-400">account</a>
          </p>
        </div>
      </section>
    </>
  );
}
