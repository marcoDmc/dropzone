import { Http } from "@/app/config/axiosConfig";
import { IChangePasswordDTO } from "@/interfaces/IChangePasswordDTO";
import { IChangePasswordReturnRequestDTO } from "@/interfaces/IChangePasswordReturnRequestDTO";

export const password = {
    async change(credentials: IChangePasswordDTO): Promise<IChangePasswordReturnRequestDTO> {

        const response = await Http.post("/change/password", {
            name: credentials.name,
            password: credentials.password,
            newPassword: credentials.newPassword
        }).then(res => res).catch(error => error.response)
        
        const data: IChangePasswordReturnRequestDTO = {
            status: response.status,
            message: response.data
        }
        return data
    }
}