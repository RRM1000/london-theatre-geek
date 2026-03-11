import React from 'react';

export const metadata = {
    title: 'Absolute Cheapest Tickets | Ticket Buying Guide | London Theatre Geek',
    description: 'Learn the insider secrets to finding the absolute cheapest West End tickets through seat filling apps, previews, and dynamic pricing algorithms.',
};

export default function CheapestTicketsGuide() {
    return (
        <div className="space-y-16 pb-24">
            <div className="container mx-auto px-4 max-w-4xl pt-10">
                <a href="/guides/cheap-tickets" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                    <span>←</span> Back to Guides
                </a>

                {/* SECTION 3: ABSOLUTE CHEAPEST */}
                <section className="bg-card-dark border border-border-dark rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 text-primary opacity-5 transform rotate-12">
                        <svg width="200" height="200" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-background-dark rounded-xl border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="font-black text-xl">3</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight marquee-text">
                            Hunting For The <span className="text-primary">Absolute Cheapest</span> Ticket
                        </h1>

                        <div className="space-y-8 text-slate-300 font-medium leading-relaxed">
                            <p className="text-xl text-white">
                                If you don't care *what* you see or *when* you see it, and just want the thrill of live theatre for less than the price of a cinema ticket, this is the strategy for you.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-background-dark rounded-xl p-8 border border-border-dark flex flex-col items-center justify-center text-center neon-glow">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-xl mb-3">Seat Filling Agencies</h4>
                                    <p className="text-base text-slate-300 mb-4">You pay a £4-£6 "admin fee" and receive free tickets to previews or struggling shows to ensure the auditorium looks full for reviewers or cast morale.</p>
                                    <ul className="list-disc text-left text-sm text-slate-400 pl-4 space-y-2 w-full">
                                        <li><strong>Central Tickets:</strong> The most popular and reliable option for West End and fringe shows.</li>
                                        <li><strong>ShowFilmFirst:</strong> Harder to get an account, but occasionally gets massive blockbuster previews.</li>
                                        <li className="text-rose-400 mt-2"><strong>The Catch:</strong> You rarely get to pick exactly what you see, and absolute secrecy is strictly required (no social media posting about your free tickets).</li>
                                    </ul>
                                </div>

                                <div className="bg-background-dark rounded-xl p-8 border border-border-dark flex flex-col items-center justify-center text-center neon-glow">
                                    <h4 className="text-primary font-black uppercase tracking-widest text-xl mb-3">Previews & Mid-Week</h4>
                                    <p className="text-base text-slate-300 mb-4">The easiest way to guarantee a cheap ticket to a major show without gambling on lotteries is to buy during the "Preview" phase.</p>
                                    <ul className="list-disc text-left text-sm text-slate-400 pl-4 space-y-2 w-full">
                                        <li>Previews are the 2-4 weeks prior to opening night when a show is still tweaking lighting/scripts. Tickets are universally 20-30% cheaper.</li>
                                        <li>If a show is past previews, Tuesday and Wednesday evenings are universally the cheapest performances of the week due to dynamic pricing algorithms.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
