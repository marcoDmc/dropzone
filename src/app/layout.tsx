import NextAuthSessionProvider from '@/providers/sessionProvider'
import "./globals.css";
import React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "drop zone",
    description: "drop zone app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <NextAuthSessionProvider>
                {children}
            </NextAuthSessionProvider>
        </body>
        </html>
    );
}
