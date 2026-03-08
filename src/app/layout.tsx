import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "London Theatre Geek",
    description: "Dynamic React front end for Webflow Theatre CMS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 text-white`}
                suppressHydrationWarning
            >
                <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <header className="py-6 border-b border-zinc-800 mb-8 flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent">London Theatre Geek</h1>
                    </header>
                    {children}
                </main>
            </body>
        </html>
    );
}
