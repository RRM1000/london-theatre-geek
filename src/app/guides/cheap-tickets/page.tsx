import React from 'react';

export const metadata = {
    title: 'The Ultimate Ticket Buying Guide | London Theatre Geek',
    description: 'Learn the insider secrets to securing cheap tickets, rush seats, daily lotteries, and avoiding hidden booking fees for West End shows.',
};

export default function CheapTicketsGuide() {
    return (
        <div className="space-y-16 pb-24">
            {/* HERO SECTION */}
            <section className="text-center py-16 md:py-24 bg-card-dark rounded-b-3xl border-b border-border-dark neon-glow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                <div className="relative z-20 flex flex-col items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-dark border border-primary/30 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(245,245,61,0.2)]">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        Insider Secrets
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase marquee-text leading-tight max-w-4xl mx-auto px-4">
                        The Ultimate <br /><span className="text-primary block mt-2">Ticket Buying Guide</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4 font-medium leading-relaxed">
                        Don't let dynamic pricing algorithms drain your wallet. Here is the unofficial playbook for securing the absolute cheapest seats in the West End.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl space-y-16">

                {/* DYNAMIC PRICING INTRO */}
                <section className="bg-background-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden text-center">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-6">
                        The Secret to West End Pricing
                    </h2>
                    <p className="text-slate-300 font-medium leading-relaxed mb-6">
                        Buying theatre tickets is exactly like buying airline tickets: <strong>Prices are dynamic based on demand.</strong>
                    </p>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        There is no "one trick" to getting cheap tickets. Your strategy has to change entirely based on whether you want to see a show <em>tonight</em>, whether you need a <em>specific weekend</em>, or if you just want to see <em>anything</em> for the absolute lowest possible price.
                    </p>
                </section>

                {/* GUIDE CARDS GRID */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* CARD 1 */}
                    <a href="/guides/cheap-tickets/same-day" className="bg-card-dark border border-border-dark rounded-2xl p-8 hover:border-primary/50 transition-all hover:-translate-y-2 shadow-lg hover:neon-glow group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner group-hover:scale-110 transition-transform">
                            <span className="font-black text-xl">1</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-primary transition-colors">
                            Same Day Tickets
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">
                            The strategies to use when you are flexible and already in London. Rush tickets, lotteries, and day seats.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                            Read Guide <span>→</span>
                        </div>
                    </a>

                    {/* CARD 2 */}
                    <a href="/guides/cheap-tickets/specific-date" className="bg-card-dark border border-border-dark rounded-2xl p-8 hover:border-primary/50 transition-all hover:-translate-y-2 shadow-lg hover:neon-glow group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner group-hover:scale-110 transition-transform">
                            <span className="font-black text-xl">2</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-primary transition-colors">
                            Specific Date
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">
                            The strategies to use when locking in a specific weekend. Avoiding dynamic spikes and hidden fees.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                            Read Guide <span>→</span>
                        </div>
                    </a>

                    {/* CARD 3 */}
                    <a href="/guides/cheap-tickets/cheapest" className="bg-card-dark border border-border-dark rounded-2xl p-8 hover:border-primary/50 transition-all hover:-translate-y-2 shadow-lg hover:neon-glow group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner group-hover:scale-110 transition-transform">
                            <span className="font-black text-xl">3</span>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-primary transition-colors">
                            Absolute Cheapest
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">
                            The strategies to use when you just want the thrill of live theatre for less than a cinema ticket. Seat filling!
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest">
                            Read Guide <span>→</span>
                        </div>
                    </a>
                </section>
            </div>
        </div>
    );
}
