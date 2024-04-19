import { Http } from "../config/axiosConfig"

export const request = {
    async handleLogin(nickname: string, password: string) {
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

    async handleUploadFile(email: string, password: string, file: File, token: string) {

        if (!token || !email || !password || !file) return

        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'Email': email,
                    'Password': password
                }
            }

            return await Http.post("/user/file/upload", { file: file }, options).then(res => res.status).catch(e => e.status)
        } catch (e) {
            console.error(e)
        }
    }
}