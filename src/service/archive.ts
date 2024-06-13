import { Http } from "@/app/config/axiosConfig"
import { IGetFile } from "@/types/IGetFile"


export const archive = {
    async handleCreate(email: string, file: File, token: string): Promise<any> {

        const response = {
            status: 0,
            total: 0
        }


        if (!token || !email || !file) return

        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'email': email,
                },
                onUploadProgress: (data: any) => {
                    response.total = Math.floor(data.loaded / 100)
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
    async getFile(credentials: IGetFile): Promise<string> {

        if (!credentials.filename || credentials.status !== 201) return "";
        const response = await Http.get(`user/file/download/${credentials.filename}`, {
            headers: {
                'Content-Type': 'image/*',
                'Content-Disposition': `attachment; filename="${credentials.filename}"`,
                'email': credentials.email,
            },
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'image/*' });
        const url = URL.createObjectURL(blob);

        if (!url) return ""
        return url
    }


}