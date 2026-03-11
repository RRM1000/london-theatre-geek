import React from 'react';

export const metadata = {
    title: 'Specific Date Tickets | Ticket Buying Guide | London Theatre Geek',
    description: 'Learn the insider secrets to securing advance booking strategies and avoiding hidden booking fees for West End shows on a specific date.',
};

export default function SpecificDateTicketsGuide() {
    return (
        <div className="space-y-16 pb-24">
            <div className="container mx-auto px-4 max-w-4xl pt-10">
                <a href="/guides/cheap-tickets" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                    <span>←</span> Back to Guides
                </a>

                {/* SECTION 2: SPECIFIC DATE */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">2</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight marquee-text">
                            Buying Tickets For <span className="text-primary">A Specific Date</span>
                        </h1>

                        <div className="space-y-8 text-slate-300 font-medium leading-relaxed">
                            <p className="text-xl text-white">
                                If you are traveling and need to lock in a specific weekend, your strategy must completely shift to avoiding dynamic pricing spikes and hidden fees.
                            </p>

                            <ul className="space-y-6">
                                <li className="bg-background-dark rounded-xl p-8 border border-border-dark flex flex-col md:flex-row gap-6 items-start neon-glow">
                                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary mt-1">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-primary font-black uppercase tracking-widest text-lg mb-2">Always buy direct first.</h4>
                                        <p>Check the official theatre's website (e.g., Delfont Mackintosh or LW Theatres) before using third-party sellers. The venue directly owns the inventory and often has the lowest baseline base price before agencies add their markup.</p>
                                    </div>
                                </li>

                                <li className="bg-background-dark rounded-xl p-8 border border-border-dark flex flex-col md:flex-row gap-6 items-start neon-glow">
                                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary mt-1">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-primary font-black uppercase tracking-widest text-lg mb-2">Beware of hidden booking fees.</h4>
                                        <p>Sites like Ticketmaster or LondonTheatreDirect often tack on £3-£8 <em>per ticket</em> simply for the privilege of checking out. Always click all the way through to the final checkout screen to compare the <strong>true final price</strong> before entering your credit card details.</p>
                                    </div>
                                </li>

                                <li className="bg-background-dark rounded-xl p-8 border border-border-dark flex flex-col md:flex-row gap-6 items-start neon-glow">
                                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary mt-1">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-primary font-black uppercase tracking-widest text-lg mb-2">Check for "Restricted View" bargains.</h4>
                                        <p>For many plays, a "restricted view" label might simply mean a safety rail blocks the extreme left corner of the stage—something that rarely ruins a show. These seats can often be snagged for 50-70% less than a full-price seat directly next to it.</p>
                                        <p className="mt-2 text-primary font-bold">Pro Tool: View <a href="https://seatplan.com" target="_blank" className="hover:underline text-white" rel="noreferrer">SeatPlan.com</a> to see crowdsourced photos from exact seats before gambling on a restricted view!</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
