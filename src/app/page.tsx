import React from 'react';
import fs from 'fs';
import path from 'path';
import { getCustomData } from '@/utils/customData';

// Webflow v2 API Configuration
const WEBFLOW_API_TOKEN = '2fa739d7456e30751df41d402e19f154ce6994ea1a32890e1a7aed5fc53f16e6';
const COLLECTION_ID = '69ada6bd9c227d57ec0a1466';

// Revalidate the page frequently (every hour) so CMS changes propagate
export const revalidate = 3600;

function extractPrice(priceString: string): number | null {
    if (!priceString) return null;
    const match = priceString.match(/£(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
}

async function getCheapestShows() {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            Accept: 'application/json',
        },
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Webflow shows');
    }

    const data = await res.json();
    const customDataMap = getCustomData();

    // Map Webflow's structure to our simpler Show type and calculate minimum price
    let processableShows = data.items.map((item: any) => {
        const slug = item.fieldData.slug;
        const filePath = path.join(process.cwd(), 'public', 'shows', `${slug}.jpg`);
        let imageUrl = fs.existsSync(filePath) ? `/shows/${slug}.jpg` : `/show-placeholder.png`;

        const showCustomData = customDataMap[slug] || {};

        let minPrice = null;
        if (showCustomData['Cheapest Price']) {
            minPrice = extractPrice(showCustomData['Cheapest Price']);
        }
        if (minPrice === null && item.fieldData.pricerange) {
            minPrice = extractPrice(item.fieldData.pricerange);
        }

        return {
            id: item.id,
            name: item.fieldData.name,
            slug: slug,
            imageurl: imageUrl,
            venue: item.fieldData.venue,
            pricerange: item.fieldData.pricerange,
            shortdescription: item.fieldData.shortdescription,
            category: item.fieldData.category,
            customData: showCustomData,
            minPrice: minPrice !== null ? minPrice : Infinity
        };
    });

    // Sort by cheapest price and take top 10
    processableShows.sort((a: any, b: any) => a.minPrice - b.minPrice);
    return processableShows.slice(0, 10);
}

export default async function LandingPage() {
    const cheapestShows = await getCheapestShows();

    return (
        <div className="space-y-24 pb-24">
            <section className="text-center py-12 md:py-20 bg-card-dark rounded-3xl border border-border-dark neon-glow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                <div className="relative z-20 flex flex-col items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-dark border border-primary/30 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(245,245,61,0.2)]">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        London's Unofficial Guide
                    </span>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase marquee-text leading-tight max-w-4xl mx-auto px-4">
                        The Best Seats. <span className="text-primary block md:inline mt-2 md:mt-0">The Lowest Prices.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4 font-medium leading-relaxed mb-6">
                        Your completely independent guide to navigating West End tickets. We cut through the noise to tell you exactly where to find the cheapest deals on the internet.
                    </p>
                </div>
            </section>

            <section className="px-4 container mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                    {/* LEFT COLUMN: TOP 10 LIST */}
                    <div className="lg:col-span-1">
                        <div className="mb-8">
                            <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
                                Top 10 Cheapest <span className="text-primary block">West End Shows</span>
                            </h3>
                            <p className="text-slate-400 font-medium text-sm md:text-base">
                                The undisputed lowest entry prices for top-tier productions in London right now.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {cheapestShows.map((show: any, index: number) => (
                                <a key={show.id} href={`/shows/${show.slug}`} className="group flex bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-lg hover:neon-glow relative h-28 md:h-32">
                                    <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-primary text-background-dark rounded-bl-xl font-black text-sm md:text-lg flex items-center justify-center border-b-2 border-l-2 border-border-dark z-30 shadow-md">
                                        #{index + 1}
                                    </div>
                                    <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-background-dark shrink-0 h-full border-r border-border-dark">
                                        <img
                                            src={show.imageurl}
                                            alt={show.name}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 relative z-10"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-3 md:p-4 flex flex-col justify-center flex-1 min-w-0">
                                        <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-primary mb-1">
                                            {show.category}
                                        </div>
                                        <h3 className="font-black text-sm md:text-base uppercase tracking-tight text-white group-hover:text-primary transition-colors truncate">
                                            {show.name}
                                        </h3>
                                        <div className="mt-auto hidden sm:flex text-slate-500 text-[10px] uppercase tracking-wider font-medium truncate">
                                            {show.venue}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PROMOS / GUIDES */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center h-full flex flex-col items-center justify-center neon-glow">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-background-dark mb-6 shadow-[0_0_20px_rgba(245,245,61,0.3)] shrink-0">
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                                The Ultimate <br /><span className="text-primary marquee-text">Ticket Buying</span> Guide
                            </h3>
                            <p className="text-slate-300 font-medium leading-relaxed mb-8 max-w-xl text-lg md:text-xl">
                                Don't let dynamic pricing algorithms drain your wallet. Learn the insider secrets to securing rush tickets, entering daily lotteries, and avoiding hidden booking fees.
                            </p>
                            <a href="/guides/cheap-tickets" className="inline-block bg-primary hover:bg-primary/90 text-background-dark font-black uppercase tracking-widest py-4 px-10 rounded-xl shadow-lg ring-1 ring-border-dark hover:ring-primary/50 transition-all text-base hover:-translate-y-1">
                                Read The Free Guide
                            </a>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
