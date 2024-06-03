'use client'

import {ChangeEvent, useState} from "react";
import {Http} from "@/app/config/axiosConfig";
import {FormComponent} from "@/components/FormComponent/Form";
import Icon from "@/utils/icons"

export default function changePassword() {
    const [credential, setCredential] = useState({name: "", password: "", newPassword: ""})

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (!credential) return

        await Http.post("/change/password", {
            name: credential.name,
            password: credential.password,
            newPassword: credential.newPassword
        }).then(res => console.log(res.data)).catch(error => console.error(error))
        
        
        
    }

    const handleName = (e: ChangeEvent<HTMLInputElement>) => setCredential({...credential, name: e.target.value})
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({
        ...credential,
        password: e.target.value
    })

    const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({
        ...credential,
        newPassword: e.target.value
    })

    return (<>
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
                            <Icon.BsKey size={25} style={{color: "#fff"}}/>;

                        </label>


                        <label htmlFor="newPassword" className="
                           w-full flex
                        items-center
                        justify-between
                    ">
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="your new password"
                                value={credential.newPassword}
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
                            <Icon.BsKey size={25} style={{color: "#fff"}}/>;

                        </label>
                    </fieldset>
                    <FormComponent.Button name="sign in"/>
                </FormComponent.Content>
            </FormComponent.Root>

        </section>
    </>)
}