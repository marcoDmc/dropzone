import { Http } from "@/app/config/axiosConfig"
import { IGetFileDTO } from "@/interfaces/IGetFileDTO"
import { Archive } from "@/types/archive"


export const archive = {
    async handleCreate(email: string, file: File, token: string): Promise<Archive | any> {

        let total = 0


        if (!token || !email || !file) return false


        const options = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                'email': email,
            },
            onUploadProgress: (data: any) => {
                total = Math.floor(data.loaded / 100)
            }
        }

        const response = await Http.post("/user/file/upload", { file: file }, options).then(res => res).catch(e => e.status)



        const data: Archive = {
            total: total,
            status: response.status,
            message: response.data
        }

        if (response.status !== 201) return false

        else return data

    },
    async getFile(credentials: IGetFileDTO): Promise<string> {

        const { email, filename, status } = credentials

        if (!filename || status !== 201) return "";
     
        const response = await Http.get(`user/file/download/${filename}`, {
            headers: {
                'Content-Type': 'image/*',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'email': email,
            },
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'image/*' });
        const url = URL.createObjectURL(blob);

        if (!url) return ""
        return url
    }


}