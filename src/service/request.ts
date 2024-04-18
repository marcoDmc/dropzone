import { Http } from "../config/axiosConfig"

export const request = {
    async PostLogin(nickname: string, password: string) {
        if (!nickname || !password) return

        try {
            const data = {
                nickname: nickname,
                password: password
            }
            return await Http.post("/login", data).then(res => res.data.access_token).catch(e => e)
        } catch (e) {
            console.error(e)
        }
    },
}