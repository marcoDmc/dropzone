import { Http } from "@/app/config/axiosConfig";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "name", type: "text", placeholder: "your name" },
                password: { label: "password", type: "password", placeholder: "your secret password" },
            },
            async authorize(credentials) {
                const { name, password } = credentials as {
                    name: string;
                    password: string;
                };

                const options = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                const data = {
                    name,
                    password
                }
                const res = await Http.post("/login", data, options)

                const user = await res.data;

                if (user) return user;

                return null;

            },
        }),
    ],

    pages: {
        signIn: "/",
    }
}


export default nextAuthOptions 