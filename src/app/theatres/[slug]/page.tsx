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
                <a href="/theatres" className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors cursor-pointer group">
                    <svg width="16" height="16" className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Theatres
                </a>
            </div>

            <section className="py-10 md:py-16 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl border border-amber-500/20 shadow-[0_0_100px_rgba(251,191,36,0.1)] px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-500 shadow-inner">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-amber-400 font-bold uppercase tracking-wider text-sm">Theatre Details</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight leading-tight">
                        {theatre.name}
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl font-light">
                        This historic venue is currently hosting {theatre.shows.length} incredible {theatre.shows.length === 1 ? 'production' : 'productions'}.
                    </p>
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        Now Playing
                        <span className="bg-amber-500 text-zinc-900 text-xs py-0.5 px-2 rounded-full font-black">
                            {theatre.shows.length}
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {theatre.shows.map(show => (
                        <a key={show.id} href={`/shows/${show.slug}`} className="group flex flex-col bg-zinc-800/40 border border-zinc-700/30 rounded-xl overflow-hidden hover:border-rose-500/30 hover:bg-zinc-800/60 transition-all hover:-translate-y-1 shadow-lg hover:shadow-rose-500/10">
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                                <img
                                    src={show.imageurl}
                                    alt={show.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-amber-400 z-20 border border-amber-400/20 shadow-sm">
                                    {show.category}
                                </div>
                                {show.customData?.['My Custom Review'] && (
                                    <div className="absolute bottom-3 left-3 bg-rose-500 text-white shadow-xl px-2 py-1 rounded text-xs font-bold uppercase z-20 tracking-wider">
                                        Review Attached
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between backdrop-blur-sm">
                                <div>
                                    <h3 className="font-semibold text-lg py-1 leading-tight text-zinc-100 group-hover:text-rose-400 transition-colors">{show.name}</h3>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-700/50 flex flex-col items-start relative">
                                    <span className={`text-sm mb-1 ${show.customData?.['Cheapest Price'] ? 'text-zinc-500 line-through' : 'bg-rose-500/10 text-rose-400 px-2 py-1 rounded-md'}`}>
                                        {show.pricerange}
                                    </span>
                                    {show.customData?.['Cheapest Price'] && (
                                        <div className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md font-bold text-sm w-full">
                                            {show.customData?.['Cheapest Price']} <span className="text-zinc-400 text-xs font-normal">via {show.customData?.['Cheapest Ticket Source']}</span>
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
