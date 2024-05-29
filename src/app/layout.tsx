import NextAuthSessionProvider from '@/providers/sessionProvider'
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ProviderComponent from './(redux)/provider/Provider';
import React from "react";

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
        <ProviderComponent>
            <NextAuthSessionProvider>
                {children}
            </NextAuthSessionProvider>
        </ProviderComponent>
        </body>
        </html>
    );
}
