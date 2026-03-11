import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk, Fira_Code, Lato } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const firaCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
});

const lato = Lato({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: "--font-lato",
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
                className={`${spaceGrotesk.variable} ${firaCode.variable} ${lato.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background-dark text-slate-100 min-h-screen font-sans cyberpunk-gradient`}
                suppressHydrationWarning
            >
                <header className="glass-card sticky top-0 z-50 transition-all">
                    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <a href="/" className="flex items-center gap-3 text-primary hover:text-white transition-colors">
                                <h1 className="text-xl font-bold uppercase tracking-tight">
                                    London Theatre Geek
                                </h1>
                            </a>
                            {/* MOBILE NAV (always visible for now to match exactly what you had) */}
                            <div className="flex md:hidden gap-6 px-4 items-center font-bold text-xs tracking-widest text-slate-300">
                                <a href="/shows" className="hover:text-primary transition-colors">SHOWS</a>
                                <a href="/theatres" className="hover:text-primary transition-colors">THEATRES</a>
                                <a href="/guides/cheap-tickets" className="hover:text-primary transition-colors text-[10px]">GUIDES</a>
                            </div>
                            <nav className="hidden lg:flex items-center gap-8">
                                <a href="/shows" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors text-slate-300">Shows</a>
                                <a href="/theatres" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors text-slate-300">Theatres</a>
                                <a href="/guides/cheap-tickets" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors text-slate-300">Ticket Guides</a>
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
