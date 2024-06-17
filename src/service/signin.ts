import { Http } from "@/app/config/axiosConfig"
import { ISigninCredentialsDTO } from "@/types/ISigninCredentialsDTO"


export const signin = {

    async handleLogin(credentials: ISigninCredentialsDTO) {
        const { name, password } = credentials
        const response = await Http.post("/signin", { name, password }).then(res => res).catch(error => error.response)
        if (response) return { token: response.data.token, email: response.data.email, status: response.statusText }
    },
}