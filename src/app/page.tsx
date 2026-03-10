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
            <section className="text-center py-10 md:py-20 bg-background-dark rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40 z-10"></div>
                <div className="relative z-20">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">Featured This Week</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        London <span className="text-primary">Theatre</span> Week
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto px-4 font-medium leading-relaxed">
                        Discover incredible West End shows. Unbeatable prices.
                    </p>
                </div>
            </section>

            <section>
                <SearchFacility initialShows={shows} />
            </section>
        </div>
    );
}
