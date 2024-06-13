import { Http } from "@/app/config/axiosConfig";
import { IChangePassword } from "@/types/IChangePassword";

export const password = {
    async change(credentials: IChangePassword) {

        const response = await Http.post("/change/password", {
            name: credentials.name,
            password: credentials.password,
            newPassword: credentials.newPassword
        }).then(res => res.data).catch(error => error)

        window.alert(response)
    }
}