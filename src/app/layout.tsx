import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
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
        <html lang="en" className="dark">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background-dark text-slate-100 min-h-screen font-sans`}
                suppressHydrationWarning
            >
                <header className="border-b border-border-dark bg-background-dark/95 sticky top-0 z-50 backdrop-blur-sm">
                    <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <a href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
                                <h1 className="text-xl font-black uppercase tracking-tighter marquee-text">
                                    London Theatre Geek
                                </h1>
                            </a>
                            <nav className="hidden lg:flex items-center gap-8">
                                <a href="/" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Shows</a>
                                <a href="/theatres" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Theatres</a>
                            </nav>
                        </div>
                    </div>
                </header>

                <main className="max-w-[1280px] mx-auto pb-20 w-full">
                    {children}
                </main>

                <footer className="bg-background-dark border-t border-border-dark py-12 text-slate-500">
                    <div className="max-w-[1280px] mx-auto px-6 text-center text-xs font-medium">
                        © {new Date().getFullYear()} London Theatre Geek. Obsessed with the stage.
                    </div>
                </footer>
            </body>
        </html >
    );
}
