import Icons from "@/utils/icons";
import { ChangeEvent } from "react";

interface passwordProps {
    typePassword: boolean
    password: string
    placeholder: string
    handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
    handleAppearHidePassword: () => void
}


export function Password({ handleAppearHidePassword, handleChangePassword, typePassword, password , placeholder }: passwordProps) {
    return (
        <>
            {
                typePassword ?

                    (


                        <div className="flex w-full h-auto items-center">
                            <input
                                type="text"
                                id="password"
                                placeholder={placeholder}
                                value={password}
                                onChange={handleChangePassword}
                                autoComplete="off"
                                className="bg-transparent w-full p-1 outline-none text-neutral-100 placeholder:text-sm" />


                            <Icons.Padlock size={25} style={{ color: "#fff" , cursor:"pointer" }} onClick={handleAppearHidePassword} />
                        </div>
                    ) :
                    (
                        <div className="flex w-full h-auto items-center">

                            <input
                                type="password"
                                id="password"
                                placeholder={placeholder}
                                value={password}
                                onChange={handleChangePassword}
                                autoComplete="off"
                                className="bg-transparent w-full p-1 outline-none text-neutral-100 placeholder:text-sm" />


                            <Icons.BsKey size={25} style={{ color: "#fff", cursor: "pointer" }} onClick={handleAppearHidePassword} />
                        </div>
                    )
            }
        </>)
}