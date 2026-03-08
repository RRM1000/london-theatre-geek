"use client";

import { useState, useMemo } from 'react';
import { Theatre } from '@/utils/theatres';

export default function TheatreSearchFacility({ initialTheatres }: { initialTheatres: Theatre[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Live filter
    const filteredTheatres = useMemo(() => {
        if (!searchTerm) return initialTheatres;

        const lowerQuery = searchTerm.toLowerCase();
        return initialTheatres.filter(theatre =>
            theatre.name.toLowerCase().includes(lowerQuery) ||
            theatre.shows.some(show => show.name.toLowerCase().includes(lowerQuery))
        );
    }, [initialTheatres, searchTerm]);

    return (
        <div className="space-y-8">
            {/* Search Header Config */}
            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-xl flex items-center justify-center backdrop-blur-sm max-w-2xl mx-auto">

                {/* Live Search */}
                <div className="relative w-full flex-1">
                    <svg width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a theatre or show name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg py-3 pl-11 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-white placeholder-zinc-400 shadow-inner"
                    />
                </div>
            </div>

            {/* Results Grid */}
            {filteredTheatres.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-700 rounded-2xl max-w-2xl mx-auto bg-zinc-800/20">
                    <p className="text-lg mb-2">No theatres found</p>
                    <p className="text-sm font-light">Try searching for a different name or show.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTheatres.map(theatre => (
                        <a key={theatre.id} href={`/theatres/${theatre.slug}`} className="group flex flex-col bg-zinc-800/20 border border-zinc-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:bg-zinc-800/60 transition-all hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 p-6 relative">

                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-[100px] -z-10 group-hover:from-amber-500/40 transition-colors"></div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-inner">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <span className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                                    {theatre.shows.length} {theatre.shows.length === 1 ? 'Show' : 'Shows'}
                                </span>
                            </div>

                            <h3 className="font-bold text-xl leading-tight text-white mb-2 group-hover:text-amber-400 transition-colors tracking-tight">
                                {theatre.name}
                            </h3>

                            <div className="mt-auto pt-4 flex gap-1.5 flex-wrap">
                                {theatre.shows.slice(0, 3).map(show => (
                                    <span key={show.id} className="text-[10px] uppercase font-bold tracking-wider bg-rose-500/10 text-rose-400 py-1 px-2 rounded-sm border border-rose-500/20">
                                        {show.name}
                                    </span>
                                ))}
                                {theatre.shows.length > 3 && (
                                    <span className="text-[10px] uppercase font-bold tracking-wider bg-zinc-800 text-zinc-400 py-1 px-2 rounded-sm border border-zinc-700">
                                        +{theatre.shows.length - 3} more
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
