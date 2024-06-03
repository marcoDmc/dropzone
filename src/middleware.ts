import {NextResponse} from "next/server"

const isLoggin: boolean = false

export function middleware(req : any, res: any) {
//    if(req.url === "http://localhost/v1/:token" && req.nextUrl.searchParams.get('token')) {
//        return NextResponse.redirect(new URL('/change/password', req.url));
//    }
    console.log(req , res)
}


export const config = {
    matcher:["/v1/:token/:path"]
}