import { Http } from "@/app/config/axiosConfig"

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

        const response = {
            status: 0,
            total: 0
        }


        if (!token || !email || !password || !file) return

        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'Email': email,
                    'Password': password
                },
                onUploadProgress: (data: any) => {
                    response.total = Math.round(100 * (data.loaded
                        /
                        data.total))
                }
            }

            await Http.post("/user/file/upload", { file: file }, options).then(res => {
                response.status = res.status

            }).catch(e => e.status)
        } catch (e) {
            console.error(e)
        }

        return response
    },
}