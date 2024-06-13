import { Http } from "@/app/config/axiosConfig";

export const magicLink = {
    async verifyMagicLink(token: string) :Promise<number> {

        const response = await Http.get(`/forgot-password/${token}`)
            .then(res => res.status)
            .catch(error => error)

        return response
    }
}