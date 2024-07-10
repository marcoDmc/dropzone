'use client'
import Icon from "@/utils/icons"
import { ChangeEvent, useState } from "react";
import { FormComponent } from "@/components/FormComponent/Form";
import { password } from "@/service/password";
import { useRouter } from "next/navigation";


export default function changePassword() {
    const [credential, setCredential] = useState({ name: "", password: "", newPassword: "", typeInput: false , typeInputNew: false })
    const router = useRouter()

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (!credential.name || !credential.newPassword || !credential.password) return

        const response = await password.change({
            name: credential.name,
            password: credential.password,
            newPassword: credential.newPassword
        })

        if (response.status == 200) {
            window.alert(response.message)
            setCredential(prev => ({ ...prev, name: "", newPassword: "", password: "" }))
            router.push("/")
        } else window.alert(response.message)
    }

    const handleName = (e: ChangeEvent<HTMLInputElement>) => setCredential({ ...credential, name: e.target.value })
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({
        ...credential,
        password: e.target.value
    })


    const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => setCredential({
        ...credential,
        newPassword: e.target.value
    })
    const handleAppearHidePassword = () => setCredential(prev => ({ ...prev, typeInput: !credential.typeInput }))
    const handleAppearHideNewPassword = () => setCredential(prev => ({ ...prev, typeInputNew: !credential.typeInputNew }))


    return (<>
        <section className="bg-zinc-900 grid place-items-center h-screen w-full">
            <FormComponent.Root handleSubmit={handleSubmit}>
                <FormComponent.Content>
                    <fieldset className="border border-zinc-500 h-full grid gap-3 place-items-center bg-zinc-800 p-2 px-4 rounded-xl w-full relative after:content-[''] after:absolute after:w-full after:h-px after:bg-neutral-700 after:top-11">
                        <label htmlFor="name" className="w-full flex">
                            <input type="text"
                                id="name"
                                autoComplete="off"
                                placeholder="your name"
                                value={credential.name}
                                onChange={handleName}
                                className="bg-transparent text-neutral-50 outline-none w-full p-1 outline-nonetext-neutral-100placeholder:text-sm" />
                        </label>
                        <label htmlFor="password" className="w-full flex items-center justify-between">
                            {/* <input
                                type="password"
                                id="password"
                                placeholder="your secret password"
                                value={credential.password}
                                onChange={handlePassword}
                                autoComplete="off"
                                className="bg-transparent w-full p-1 outline-none text-neutral-100 placeholder:text-sm" />
                            <Icon.BsKey size={25} style={{ color: "#fff" }} />; */}
                            <FormComponent.Password
                                placeholder="your secret password"
                                handleAppearHidePassword={handleAppearHidePassword}
                                handleChangePassword={handlePassword}
                                typePassword={credential.typeInput}
                                password={credential.password}
                            />
                        </label>


                        <label htmlFor="newPassword" className="w-full flex items-center justify-between">
                            {/* <input
                                type="password"
                                id="newPassword"
                                placeholder="your new password"
                                value={credential.newPassword}
                                onChange={handleNewPassword}
                                autoComplete="off"
                                className="bg-transparent w-full p-1 outline-none text-neutral-100 placeholder:text-sm" />
                            <Icon.BsKey size={25} style={{ color: "#fff" }} />; */}
                            <FormComponent.Password placeholder="your new password"
                                handleAppearHidePassword={handleAppearHideNewPassword}
                                handleChangePassword={handleNewPassword}
                                typePassword={credential.typeInputNew}
                                password={credential.newPassword}
                            />
                        </label>
                    </fieldset>
                    <FormComponent.Button name="forgot password" />
                </FormComponent.Content>
            </FormComponent.Root>

        </section>
    </>)
}