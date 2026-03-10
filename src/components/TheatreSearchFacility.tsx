"use client";

import { useState, useMemo } from 'react';
import { Theatre } from '@/utils/theatres';

export default function TheatreSearchFacility({ initialTheatres }: { initialTheatres: Theatre[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState<string>('All Sizes');

    const availableSizes = ['All Sizes', 'Intimate', 'Small', 'Medium', 'Large', 'Huge'];

    // Live filter
    const filteredTheatres = useMemo(() => {
        let result = initialTheatres;

        if (searchTerm) {
            const lowerQuery = searchTerm.toLowerCase();
            result = result.filter(theatre =>
                theatre.name.toLowerCase().includes(lowerQuery) ||
                theatre.shows.some(show => show.name.toLowerCase().includes(lowerQuery))
            );
        }

        if (selectedSize !== 'All Sizes') {
            result = result.filter(theatre => theatre.size === selectedSize);
        }

        return result;
    }, [initialTheatres, searchTerm, selectedSize]);

    return (
        <div className="space-y-8">
            {/* Search Header Config */}
            <div className="sticky top-4 bg-card-dark border border-border-dark p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between z-50 shadow-xl transition-all">

                {/* Live Search */}
                <div className="relative w-full md:w-96 flex-1">
                    <svg width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a theatre or show name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-background-dark border border-border-dark rounded-lg py-3 pl-11 pr-4 text-base focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder-slate-400"
                    />
                </div>

                {/* Size Filter */}
                <div className="flex w-full md:w-auto">
                    <select
                        value={selectedSize}
                        onChange={e => setSelectedSize(e.target.value)}
                        className="w-full md:w-48 bg-background-dark border border-border-dark rounded-lg py-3 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-slate-300 cursor-pointer"
                    >
                        {availableSizes.map(size => (
                            <option key={size} value={size}>{size === 'All Sizes' ? 'Filter by Size' : `${size} Venues`}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {filteredTheatres.length === 0 ? (
                <div className="text-center py-20 text-slate-500 border border-dashed border-border-dark rounded-2xl max-w-2xl mx-auto bg-card-dark">
                    <p className="text-lg mb-2 text-white font-medium">No theatres found</p>
                    <p className="text-sm font-normal">Try searching for a different name or show.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTheatres.map(theatre => (
                        <a key={theatre.id} href={`/theatres/${theatre.slug}`} className="group flex flex-col bg-card-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-xl p-6 relative">

                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] -z-10 group-hover:from-primary/20 transition-colors"></div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                                    <span className="material-symbols-outlined text-2xl">theater_comedy</span>
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-widest block">
                                        {theatre.size}
                                    </span>
                                    <span className="bg-background-dark border border-border-dark text-slate-300 text-[10px] font-black px-2 py-0.5 rounded shadow-sm block uppercase tracking-widest">
                                        {theatre.shows.length} {theatre.shows.length === 1 ? 'Show' : 'Shows'}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-black text-xl leading-tight text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                                {theatre.name}
                            </h3>

                            <div className="mt-auto pt-4 flex gap-1.5 flex-wrap">
                                {theatre.shows.slice(0, 3).map(show => (
                                    <span key={show.id} className="text-[10px] uppercase font-bold tracking-widest bg-primary text-background-dark py-1 px-2 rounded-sm shadow-sm">
                                        {show.name}
                                    </span>
                                ))}
                                {theatre.shows.length > 3 && (
                                    <span className="text-[10px] uppercase font-bold tracking-widest bg-background-dark text-slate-400 py-1 px-2 rounded-sm border border-border-dark">
                                        +{theatre.shows.length - 3} more
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )
            }
        </div >
    );
}
