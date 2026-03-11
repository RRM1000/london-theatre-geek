import React from 'react';

export const metadata = {
    title: 'Same Day Tickets | Ticket Buying Guide | London Theatre Geek',
    description: 'Learn the insider secrets to securing cheap same-day tickets, rush seats, and daily lotteries for West End shows.',
};

export default function SameDayTicketsGuide() {
    return (
        <div className="space-y-16 pb-24">
            <div className="container mx-auto px-4 max-w-4xl pt-10">
                <a href="/guides/cheap-tickets" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                    <span>←</span> Back to Guides
                </a>

                {/* SECTION 1: SAME DAY */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">1</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight marquee-text">
                            Buying Tickets For <span className="text-primary">The Same Day</span>
                        </h1>

                        <div className="space-y-8 text-slate-300 font-medium leading-relaxed">
                            <p className="text-xl text-white">
                                If you are flexible and already in London, same-day tickets offer some of the steepest discounts available in the West End. Here are the main strategies:
                            </p>

                            <div className="bg-background-dark rounded-xl p-8 border border-border-dark neon-glow">
                                <h4 className="text-primary font-black uppercase tracking-widest text-xl mb-3">Rush & Day Seats</h4>
                                <p className="mb-4">Many major productions hold back a block of front-row or excellent stalls tickets to release exclusively at 10:00 AM on the day of the performance via the TodayTix app. </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>You must be lightning fast to beat the bots and other humans.</li>
                                    <li>Pro-tip: Add your credit card details down to the CVV to your TodayTix account beforehand so you can checkout in 2 seconds.</li>
                                    <li>Alternatively, some theatres (like the National Theatre) still operate physical Box Office queues opening directly at 10 AM for cheap returned or held tickets.</li>
                                </ul>
                            </div>

                            <div className="bg-background-dark rounded-xl p-8 border border-border-dark neon-glow">
                                <h4 className="text-primary font-black uppercase tracking-widest text-xl mb-3">Daily Lotteries</h4>
                                <p className="mb-4">High-demand shows (like Hamilton, Cabaret, or Book of Mormon) run daily or weekly lotteries where you can win £20-£30 premium seats. </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>Always enter these if you have a free evening. Winning is sheer luck.</li>
                                    <li>It is often the only realistic way to sit front row center for the town's hottest shows without paying £200+ on the secondary market.</li>
                                </ul>
                            </div>

                            <div className="bg-background-dark rounded-xl p-8 border border-border-dark neon-glow">
                                <h4 className="text-primary font-black uppercase tracking-widest text-xl mb-3">TKTS Booth (Leicester Square)</h4>
                                <p className="mb-4">The official TKTS booth (both physically in Leicester Square and increasingly online via their website) sells officially discounted tickets for shows that haven't sold out that afternoon.</p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>While you likely won't find blockbuster hits like Les Misérables here, it is fantastic for finding £30-£40 seats to long-running classics or newer plays struggling to fill seats on a Tuesday matinee.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
