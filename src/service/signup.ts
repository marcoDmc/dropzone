import { Http } from "@/app/config/axiosConfig"
import { ISignupData } from "@/types/ISignupDataDTO"

export const signup = {
    async handleSignup(data: ISignupData): Promise<string> {
         return await Http.post<string>("/user/signup", data).then(response => response.data).catch(error => error)
    }
}