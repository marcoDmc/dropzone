import { Http } from "@/app/config/axiosConfig";
import { IVerifyMagicLinkDTO } from "@/types/IVerifyMagicLinkDTO";

export const magicLink = {
    async verifyMagicLink(token: string): Promise<IVerifyMagicLinkDTO> {

        const response = await Http.get(`/forgot-password/${token}`)
            .then(res => res)
            .catch(error => error.response)
        console.log(response.data)

        const data: IVerifyMagicLinkDTO = {
            status: response.status,
            message: response.statusText,
            data: response.data
        }
        return data
    }
}