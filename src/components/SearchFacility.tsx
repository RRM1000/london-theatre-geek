"use client";

import { useState, useEffect, useMemo } from 'react';

// Using the Next.js typed props for future proofing our data layer
type Show = {
    id: string;
    name: string;
    slug: string;
    imageurl: string;
    venue: string;
    pricerange: string;
    shortdescription: string;
    category: string;
};

export default function SearchFacility({ initialShows }: { initialShows: Show[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

    // Derive unique categories for the filter
    const categories = useMemo(() => {
        const cats = new Set(initialShows.map(s => s.category).filter(Boolean));
        return ['All', ...Array.from(cats).sort()];
    }, [initialShows]);

    // Live filter and sort
    const filteredShows = useMemo(() => {
        let result = [...initialShows];

        if (searchTerm) {
            const lowerQuery = searchTerm.toLowerCase();
            result = result.filter(show =>
                show.name.toLowerCase().includes(lowerQuery) ||
                show.venue?.toLowerCase().includes(lowerQuery) ||
                show.shortdescription?.toLowerCase().includes(lowerQuery)
            );
        }

        if (selectedCategory && selectedCategory !== 'All') {
            result = result.filter(show => show.category === selectedCategory);
        }

        if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
            result.sort((a, b) => {
                // Basic string extraction since price string is "Save X% - Tickets from £Y"
                const priceA = parseFloat(a.pricerange?.match(/£(\d+)/)?.[1] || '0');
                const priceB = parseFloat(b.pricerange?.match(/£(\d+)/)?.[1] || '0');
                return sortOrder === 'price-asc' ? priceA - priceB : priceB - priceA;
            });
        }

        return result;
    }, [initialShows, searchTerm, selectedCategory, sortOrder]);

    return (
        <div className="space-y-8">
            {/* Search Header Config */}
            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-sm">

                {/* Live Search */}
                <div className="relative w-full md:w-96 flex-1">
                    <svg width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a show, theatre, or keyword..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700/80 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-white placeholder-zinc-400"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="flex-1 md:w-40 bg-zinc-900 border border-zinc-700/80 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 appearance-none text-zinc-200"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value as any)}
                        className="flex-1 md:w-40 bg-zinc-900 border border-zinc-700/80 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 appearance-none text-zinc-200"
                    >
                        <option value="default">Sort: Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {filteredShows.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                    <p className="text-lg">No shows found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredShows.map(show => (
                        <a key={show.id} href={`/shows/${show.slug}`} className="group flex flex-col bg-zinc-800/40 border border-zinc-700/30 rounded-xl overflow-hidden hover:border-rose-500/30 hover:bg-zinc-800/60 transition-all hover:-translate-y-1 shadow-lg hover:shadow-rose-500/10">
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                                {/* Next/Image would be ideal, but using standard img for external blob urls for speed and simplicity in template */}
                                <img
                                    src={show.imageurl}
                                    alt={show.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-amber-400 z-20 border border-amber-400/20 shadow-sm">
                                    {show.category}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between backdrop-blur-sm">
                                <div>
                                    <h3 className="font-semibold text-lg py-1 leading-tight text-zinc-100 group-hover:text-rose-400 transition-colors">{show.name}</h3>
                                    <p className="text-sm text-zinc-400 flex items-center gap-1.5 mt-1">
                                        <svg width="14" height="14" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {show.venue}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-700/50 font-medium text-sm text-zinc-300 flex items-center relative">
                                    <span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded-md mb-0">
                                        {show.pricerange}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
