import CredentialsProvider from "next-auth/providers/credentials"
import { Http } from "@/app/config/axiosConfig";
import { NextAuthOptions } from "next-auth";

const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
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

                const res = await Http.post("/signin", { name, password })

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