"use client";

import { useState, useEffect, useMemo, useRef } from 'react';

import { Show } from '@/types';

export default function SearchFacility({ initialShows }: { initialShows: Show[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

    // Multi-select Tags State
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const availableTags = ['Fun', 'Intellectual', 'Family Friendly', 'Adult Only', 'Spectacular'];

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

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

        if (selectedTags.length > 0) {
            result = result.filter(show => {
                const showTags = show.customData?.['Tags'] || '';
                // The show must have ALL selected tags (AND logic)
                return selectedTags.every(tag => showTags.includes(tag));
            });
        }

        if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
            result.sort((a, b) => {
                // Better sorting: use custom cheapest price if available, fallback to Webflow regex
                const getPrice = (show: Show) => {
                    if (show.customData && show.customData['Cheapest Price']) {
                        return parseFloat(show.customData['Cheapest Price'].replace(/[^0-9.]/g, '')) || 0;
                    }
                    return parseFloat(show.pricerange?.match(/£(\d+)/)?.[1] || '0');
                };

                const priceA = getPrice(a);
                const priceB = getPrice(b);
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

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="bg-zinc-900 border border-zinc-700/80 rounded-lg py-2.5 px-3 text-sm flex items-center justify-between w-full md:w-48 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        >
                            <span className="truncate pr-2 text-left">
                                {selectedTags.length === 0 ? 'Filter by Vibe' : `${selectedTags.length} Vibes Selected`}
                            </span>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-4 h-4 text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-48 bg-zinc-800 border border-zinc-700/80 rounded-lg shadow-xl z-50 p-2 flex flex-col gap-1">
                                {availableTags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-700/50 rounded cursor-pointer text-sm text-zinc-300 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                            className="rounded bg-zinc-900 border-zinc-600 text-rose-500 focus:ring-rose-500/50 w-4 h-4 cursor-pointer"
                                        />
                                        <span className="truncate">{tag}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

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
                                {show.customData?.['Tags'] && (
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
                                        {show.customData['Tags'].split('|').map((tag: string) => (
                                            <span key={tag} className="bg-rose-500/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm border border-rose-400/20 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {show.customData?.['My Custom Review'] && (
                                    <div className="absolute bottom-3 left-3 bg-rose-500 text-white shadow-xl px-2 py-1 rounded text-xs font-bold uppercase z-20 tracking-wider">
                                        Review Attached
                                    </div>
                                )}
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
            )}
        </div>
    );
}
