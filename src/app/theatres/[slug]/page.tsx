import { notFound } from 'next/navigation';
import { getTheatres, getTheatreBySlug } from '@/utils/theatres';

export const revalidate = 3600;

export async function generateStaticParams() {
    const theatres = await getTheatres();
    return theatres.map((theatre) => ({
        slug: theatre.slug,
    }));
}

export default async function TheatrePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const theatre = await getTheatreBySlug(resolvedParams.slug);

    if (!theatre) {
        notFound();
    }

    return (
        <div className="space-y-12 pb-24">
            <div className="mb-6">
                <a href="/theatres" className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors cursor-pointer group">
                    <svg width="16" height="16" className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Theatres
                </a>
            </div>

            <section className="py-10 md:py-16 bg-card-dark rounded-3xl border border-border-dark px-8 relative overflow-hidden neon-glow">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-background-dark border border-border-dark flex items-center justify-center text-primary shadow-inner">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm">Theatre Details</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight leading-tight uppercase marquee-text">
                        {theatre.name}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl font-light">
                        This historic venue is currently hosting {theatre.shows.length} incredible {theatre.shows.length === 1 ? 'production' : 'productions'}.
                    </p>

                    <div className="mt-8 pt-8 border-t border-border-dark max-w-2xl">
                        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2 uppercase tracking-wide">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Seating Plan
                        </h3>
                        <a
                            href="https://seatplan.com/london/dominion-theatre/seating-plan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl overflow-hidden border border-border-dark hover:border-primary/50 transition-colors group/seating"
                        >
                            <div className="relative aspect-[16/9] bg-background-dark flex items-center justify-center overflow-hidden">
                                <img
                                    src="https://seatplan.com/cdn/images/c/map_dominion-theatre-seating-plan-london.webp"
                                    alt="Dominion Theatre Seating Plan"
                                    className="object-contain w-full h-full opacity-80 group-hover/seating:opacity-100 group-hover/seating:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <span className="text-sm font-medium text-white shadow-sm uppercase tracking-wide">Interactive Map</span>
                                    <span className="bg-primary text-background-dark text-xs font-black px-3 py-1.5 rounded-full shadow-lg group-hover/seating:bg-primary/90 transition-colors uppercase">
                                        Open SeatPlan
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8 border-b border-border-dark pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-3 text-slate-100">
                        Now Playing
                        <span className="bg-primary text-background-dark text-sm py-0.5 px-3 rounded-full font-black">
                            {theatre.shows.length}
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {theatre.shows.map(show => (
                        <a key={show.id} href={`/shows/${show.slug}`} className="group flex flex-col bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 hover:bg-card-dark transition-all hover:-translate-y-1 shadow-lg hover:neon-glow">
                            <div className="relative aspect-[3/4] overflow-hidden bg-background-dark">
                                <img
                                    src={show.imageurl}
                                    alt={show.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 right-3 bg-background-dark/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider text-primary z-20 border border-primary/20 shadow-sm">
                                    {show.category}
                                </div>
                                {show.customData?.['My Custom Review'] && (
                                    <div className="absolute bottom-3 left-3 bg-primary text-background-dark shadow-xl px-2 py-1 rounded text-xs font-black uppercase z-20 tracking-wider">
                                        Critically Acclaimed
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-black text-2xl uppercase tracking-tight leading-tight text-white group-hover:text-primary transition-colors">{show.name}</h3>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border-dark flex flex-col items-start relative">
                                    <span className={`text-sm mb-1 font-medium ${show.customData?.['Cheapest Price'] ? 'text-slate-400 line-through' : 'text-primary'}`}>
                                        {show.pricerange}
                                    </span>
                                    {show.customData?.['Cheapest Price'] && (
                                        <div className="text-primary font-black text-xl w-full flex items-baseline gap-2">
                                            {show.customData?.['Cheapest Price']} <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">via {show.customData?.['Cheapest Ticket Source']}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
