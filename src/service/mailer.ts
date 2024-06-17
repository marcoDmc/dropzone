import { Http } from "@/app/config/axiosConfig"
import { ISendMagicLinkDTO } from "@/types/ISendMagicLinkDTO"

export const mailer = {
    async sendMagicLink(email: string): Promise<ISendMagicLinkDTO> {
        const response = await Http.post("/send/email", { email: email }).then(res => res.data).catch(error => error)
        return response
    }
}