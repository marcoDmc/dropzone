import { Http } from "@/app/config/axiosConfig"

export const mailer = {
    async sendMagicLink(email: string): Promise<string> {
        const response = await Http.post("/send/email", { email: email }).then(res => res.data).catch(error => error)
        return response
    }
}