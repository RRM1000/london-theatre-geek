import SearchFacility from "@/components/SearchFacility";

// Webflow v2 API Configuration
// Ideally stored in .env, but hardcoding for exact replica of previous script
const WEBFLOW_API_TOKEN = '2fa739d7456e30751df41d402e19f154ce6994ea1a32890e1a7aed5fc53f16e6';
const COLLECTION_ID = '69ada6bd9c227d57ec0a1466';

// Revalidate the page frequently (every hour) so CMS changes propagate
export const revalidate = 3600;

import { Show } from '@/types';
import fs from 'fs';
import path from 'path';
import { getCustomData } from '@/utils/customData';

async function getShows() {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            Accept: 'application/json',
        },
        next: { revalidate: 60 } // optional extra caching config
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Webflow shows');
    }

    const data = await res.json();
    const customDataMap = getCustomData();

    // Map Webflow's structure to our simpler Show type
    return data.items.map((item: any) => {
        const slug = item.fieldData.slug;
        // Check if the specific show poster exists locally, otherwise use the generated placeholder
        const filePath = path.join(process.cwd(), 'public', 'shows', `${slug}.jpg`);
        let imageUrl = fs.existsSync(filePath) ? `/shows/${slug}.jpg` : `/show-placeholder.png`;

        return {
            id: item.id,
            name: item.fieldData.name,
            slug: slug,
            imageurl: imageUrl,
            venue: item.fieldData.venue,
            pricerange: item.fieldData.pricerange,
            shortdescription: item.fieldData.shortdescription,
            category: item.fieldData.category,
            customData: customDataMap[slug] || {}
        };
    });
}

export default async function Home() {
    const shows = await getShows();

    return (
        <div className="space-y-12 pb-24">
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

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4 font-medium leading-relaxed mb-10">
                        Your completely independent guide to navigating West End tickets. We cut through the noise to tell you exactly where to find the cheapest deals on the internet.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary shadow-lg">
                                <span className="text-2xl">🎟️</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Cheapest Seats</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary shadow-lg">
                                <span className="text-2xl">📊</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Market Averages</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary shadow-lg">
                                <span className="text-2xl">✊</span>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">100% Independent</span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <SearchFacility initialShows={shows} />
            </section>
        </div>
    );
}
