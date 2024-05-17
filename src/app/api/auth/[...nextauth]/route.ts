import { Http } from "@/app/config/axiosConfig"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "name", type: "text", placeholder: "nickname" },
                password: { label: "password", type: "password" },
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

                if (res && user) return user;

                return null;

            },
        }),
    ],

    pages: {
        signIn: "/",
    }
}



const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }