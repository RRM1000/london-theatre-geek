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

                {/* SECTION 1: SAME DAY */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:neon-glow transition-shadow">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">1</span>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                            Buying Tickets For <span className="text-primary">The Same Day</span>
                        </h2>

                        <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                            <p>
                                If you are flexible and already in London, same-day tickets offer some of the steepest discounts available.
                            </p>

                            <div className="bg-background-dark rounded-xl p-6 border border-border-dark">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Rush & Day Seats</h4>
                                <p className="text-sm">Many major productions hold back a block of front-row or excellent stalls tickets to release exclusively at 10:00 AM on the day of the performance via the TodayTix app. You must be lightning fast (add your card details down to the CVV to your account beforehand). Alternatively, some theatres still operate physical Box Office queues opening directly at 10 AM for cheap returned/held tickets.</p>
                            </div>

                            <div className="bg-background-dark rounded-xl p-6 border border-border-dark">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Daily Lotteries</h4>
                                <p className="text-sm">High-demand shows (like Hamilton, Cabaret, or Book of Mormon) run daily or weekly lotteries where you can win £20-£30 premium seats. Always enter these if you have a free evening. Winning is sheer luck, but it is the only way to sit front row center for the town's hottest shows without paying £200+.</p>
                            </div>

                            <div className="bg-background-dark rounded-xl p-6 border border-border-dark">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">TKTS Booth (Leicester Square)</h4>
                                <p className="text-sm">The official TKTS booth sells discounted tickets for shows that haven't sold out that afternoon. While you likely won't find blockbuster hits here, it is fantastic for finding £30-£40 seats to long-running classics or newer plays struggling to fill seats on a Tuesday matinee.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: SPECIFIC DATE */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:neon-glow transition-shadow">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">2</span>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                            Buying Tickets For <span className="text-primary">A Specific Date</span>
                        </h2>

                        <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                            <p>
                                If you are traveling and need to lock in a specific weekend, your strategy must completely shift to avoiding dynamic pricing spikes and hidden fees.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-primary shrink-0">❖</span>
                                    <span><strong>Always buy direct first.</strong> Check the official theatre's website (e.g., Delfont Mackintosh or LW Theatres) before using third-party sellers. They own the inventory and often have the lowest baseline base price.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-primary shrink-0">❖</span>
                                    <span><strong>Beware of hidden booking fees.</strong> Sites like Ticketmaster or LondonTheatreDirect often tack on £3-£8 <em>per ticket</em> simply for the privilege of checking out. Always click all the way through to the final checkout screen to compare true prices.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-primary shrink-0">❖</span>
                                    <span><strong>Check for "Restricted View" bargains.</strong> For many plays, a "restricted view" might simply mean a safety rail blocks the extreme left corner of the stage—something that rarely ruins a show. These seats can often be snagged for 50-70% less than a full-price seat directly next to it. View <a href="https://seatplan.com" target="_blank" className="text-primary hover:underline" rel="noreferrer">SeatPlan.com</a> to see crowdsourced photos from exact seats before gambling!</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: ABSOLUTE CHEAPEST */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:neon-glow transition-shadow">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">3</span>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                            Hunting For The <span className="text-primary">Absolute Cheapest</span> Ticket
                        </h2>

                        <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                            <p>
                                If you don't care *what* you see or *when* you see it, and just want the thrill of live theatre for less than the price of a cinema ticket:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-background-dark rounded-xl p-6 border border-border-dark flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-lg mb-2">Central Tickets / ShowFilmFirst</h4>
                                    <p className="text-sm">These are "seat-filling" agencies. You pay a £4-£6 "admin fee" and receive free tickets to previews or struggling shows to ensure the auditorium looks full for reviewers. The catch? You rarely get to pick exactly what you see, and secrecy is strictly required.</p>
                                </div>

                                <div className="bg-background-dark rounded-xl p-6 border border-border-dark flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-lg mb-2">Previews & Mid-Week</h4>
                                    <p className="text-sm">Shows are roughly 20-30% cheaper during their "Preview" phase (the 2-4 weeks prior to opening night when they are still tweaking lighting/scripts). If a show is past previews, Tuesday and Wednesday evenings are universally the cheapest performances of the week.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
