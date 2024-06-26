import { Http } from "@/app/config/axiosConfig";

export const magicLink = {
    async verifyMagicLink(token: string): Promise<string> {
        const response = await Http.get(`/forgot-password/${token}`)
            .then(res => res.data)
            .catch(error => error.response.data)
        return response
    }
}