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
                // Use OR logic so selecting multiple tags expands the results
                return selectedTags.some(tag => showTags.includes(tag));
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
    }, [initialShows, searchTerm, selectedCategory, sortOrder, selectedTags]);

    return (
        <div className="space-y-8">
            {/* Search Header Config */}
            <div className="sticky top-4 glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between z-50 transition-all">

                {/* Live Search */}
                <div className="relative w-full md:w-96 flex-1">
                    <svg width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a show, theatre, or keyword..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-background-dark border border-border-dark rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder-slate-400"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="flex-1 md:w-40 bg-background-dark border border-border-dark rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-slate-300"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="bg-background-dark border border-border-dark rounded-lg py-2.5 px-3 text-sm flex items-center justify-between w-full md:w-48 text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <span className="truncate pr-2 text-left">
                                {selectedTags.length === 0 ? 'Filter by Vibe' : `${selectedTags.length} Vibes Selected`}
                            </span>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-4 h-4 text-primary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-48 bg-card-dark border border-border-dark rounded-lg shadow-xl z-50 p-2 flex flex-col gap-1">
                                {availableTags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2 px-2 py-1.5 hover:bg-background-dark rounded cursor-pointer text-sm text-slate-300 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                            className="rounded bg-background-dark border-border-dark text-primary focus:ring-primary/50 w-4 h-4 cursor-pointer"
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
                        className="flex-1 md:w-40 bg-background-dark border border-border-dark rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none text-slate-300"
                    >
                        <option value="default">Sort: Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Results Grid */}
            {filteredShows.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <p className="text-lg">No shows found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredShows.map(show => (
                        <a key={show.id} href={`/shows/${show.slug}`} className="group flex flex-col glass-card glass-card-edge hover-glow rounded-xl overflow-hidden transition-all">
                            <div className="relative aspect-[3/4] overflow-hidden bg-background-dark">
                                {/* Next/Image would be ideal, but using standard img for external blob urls for speed and simplicity in template */}
                                <img
                                    src={show.imageurl}
                                    onError={(e) => { e.currentTarget.src = "/show-placeholder.png"; }}
                                    alt={show.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 right-3 bg-background-dark/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 z-20 border border-border-dark shadow-sm">
                                    {show.category}
                                </div>
                                {show.customData?.['Tags'] && (
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
                                        {show.customData['Tags'].split('|').map((tag: string) => (
                                            <div key={tag} className="absolute top-[-10px] right-[-140px] bg-primary text-background-dark font-black px-3 py-1 rounded text-xs uppercase shadow-xl mt-3 mr-3 whitespace-nowrap">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {show.customData?.['My Custom Review'] && (
                                    <div className="absolute bottom-3 left-3 bg-primary text-background-dark shadow-xl px-2 py-1 rounded text-[10px] font-black uppercase z-20 tracking-wider">
                                        Review Attached
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-black text-2xl uppercase leading-tight tracking-tight text-white group-hover:text-primary transition-colors">{show.name}</h3>
                                    <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-2">
                                        <svg width="14" height="14" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {show.venue}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border-dark flex flex-col items-start relative">
                                    <span className={`data-font text-sm mb-1 ${show.customData?.['Cheapest Price'] ? 'text-slate-500 line-through' : 'bg-background-dark text-slate-300 px-2 py-1 rounded-md font-bold'}`}>
                                        {show.pricerange}
                                    </span>
                                    {show.customData?.['Cheapest Price'] && (
                                        <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/30 font-bold text-sm data-font">
                                            from {show.customData?.['Cheapest Price']} <span className="text-slate-500 text-xs font-normal relative -top-px ml-1 font-sans">via {show.customData?.['Cheapest Ticket Source']}</span>
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
