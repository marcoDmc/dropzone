import { Http } from "@/app/config/axiosConfig"
import { ISigninCredentials } from "@/types/ISigninCredentialsDTO"
import { signIn } from "next-auth/react"


export const signin = {

    async handleLogin(credentials: ISigninCredentials) {
        const data = { name: credentials.name, password: credentials.password }
        const response = await Http.post("/signin", data).then(res => res.data).catch(error => error)
        await signIn("Credentials", data)

        if (response) return { token: response.token, email: response.email }
    },
}