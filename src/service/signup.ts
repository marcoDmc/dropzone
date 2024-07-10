import { Http } from "@/app/config/axiosConfig"
import { ISignupDataDTO } from "@/interfaces/ISignupDataDTO"

export const signup = {
    async handleSignup(data: ISignupDataDTO): Promise<string> {
         return await Http.post<string>("/signup", data).then(response => response.data).catch(error => error)
    }
}