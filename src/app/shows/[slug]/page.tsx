import { notFound } from 'next/navigation';
import { getCustomData } from '@/utils/customData';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600;

const WEBFLOW_API_TOKEN = '2fa739d7456e30751df41d402e19f154ce6994ea1a32890e1a7aed5fc53f16e6';
const COLLECTION_ID = '69ada6bd9c227d57ec0a1466';

// 1. Tell Next.js which paths to pre-render
export async function generateStaticParams() {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}`, Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items.map((item: any) => ({
        slug: item.fieldData.slug,
    }));
}

// Fetch single show by slug and optional similar shows
async function getShowDataBySlug(slug: string) {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}`, Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch from Webflow');

    const data = await res.json();
    const showRaw = data.items.find((item: any) => item.fieldData.slug === slug);
    if (!showRaw) return null;

    const mainFilePath = path.join(process.cwd(), 'public', 'shows', `${slug}.jpg`);
    let imageUrl = fs.existsSync(mainFilePath) ? `/shows/${slug}.jpg` : `/show-placeholder.png`;

    // Merge in custom data from CSV
    const customDataMap = getCustomData();
    const customData = customDataMap[slug] || {};

    const show = {
        ...showRaw.fieldData,
        imageurl: imageUrl,
        customData: customData
    };

    // Find similar shows
    const otherShows = data.items.filter((item: any) => item.fieldData.slug !== slug);
    // Sort by same category first
    let similarRaw = otherShows.filter((item: any) => item.fieldData.category === show.category);
    if (similarRaw.length < 2) {
        const others = otherShows.filter((item: any) => item.fieldData.category !== show.category);
        similarRaw = [...similarRaw, ...others].slice(0, 2);
    } else {
        similarRaw = similarRaw.slice(0, 2);
    }

    const similarShows = similarRaw.map((item: any) => {
        const simSlug = item.fieldData.slug;
        const simPath = path.join(process.cwd(), 'public', 'shows', `${simSlug}.jpg`);
        let simImageUrl = fs.existsSync(simPath) ? `/shows/${simSlug}.jpg` : `/show-placeholder.png`;
        return {
            ...item.fieldData,
            imageurl: simImageUrl,
            customData: customDataMap[item.fieldData.slug] || {}
        };
    });

    return { show, similarShows };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const showData = await getShowDataBySlug(resolvedParams.slug);

    if (!showData) {
        notFound();
    }

    const { show, similarShows } = showData;

    return (
        <div className="space-y-12 pb-24">
            <article className="max-w-4xl mx-auto mt-10 p-6 md:p-10 bg-card-dark border border-border-dark neon-glow rounded-3xl shadow-xl flex flex-col md:flex-row gap-10">

                <div className="md:w-1/2 shrink-0">
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_20px_50px_rgba(245,245,61,0.15)] ring-1 ring-border-dark">
                        <img
                            src={show.imageurl}
                            alt={show.name}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute top-4 right-4 bg-background-dark/90 backdrop-blur border border-primary/30 text-primary px-3 py-1 text-xs font-black rounded-lg shadow-xl uppercase tracking-wider">
                            {show.category}
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                    <a href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 font-medium text-sm transition-colors cursor-pointer group">
                        <svg width="16" height="16" className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Listings
                    </a>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight leading-tight uppercase marquee-text">
                        {show.name}
                    </h1>

                    <div className="flex flex-col gap-3 mb-8">
                        <div className="inline-flex items-center text-slate-300 font-medium group/venue">
                            <svg width="20" height="20" className="w-5 h-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <a href={`/theatres/${show.venue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} className="text-lg hover:text-primary transition-colors border-b border-transparent hover:border-primary/50 uppercase tracking-wide">
                                {show.venue}
                            </a>
                        </div>

                        <div className="inline-flex flex-wrap items-center text-slate-300 font-medium pb-4 border-b border-border-dark">
                            <svg width="20" height="20" className="w-5 h-5 mr-3 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            <span className="text-lg flex flex-col font-medium">
                                <span className={show.customData['Cheapest Price'] ? "text-sm text-slate-400 line-through" : "text-primary"}>Webflow: {show.pricerange}</span>
                                {show.customData['Cheapest Price'] && (
                                    <span className="text-primary font-black text-xl">
                                        {show.customData['Cheapest Price']}
                                        <span className="text-slate-400 font-medium text-xs ml-2 uppercase tracking-wider">via {show.customData['Cheapest Ticket Source']}</span>
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>

                    {show.customData['My Custom Review'] && (
                        <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl relative overflow-hidden neon-glow">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                            <h3 className="text-primary font-black mb-1 text-sm uppercase tracking-wider">Geek Review</h3>
                            <p className="text-slate-200 italic">&ldquo;{show.customData['My Custom Review']}&rdquo;</p>
                        </div>
                    )}

                    <div className="prose prose-sm prose-invert text-slate-300 font-light">
                        <p className="leading-relaxed">
                            {show.shortdescription}
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    <div className="mt-10">
                        <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black py-4 px-8 rounded-xl shadow-lg ring-1 ring-border-dark hover:ring-primary/50 transition-all uppercase tracking-widest text-lg">
                            Book Tickets Now
                        </button>
                    </div>
                </div>

            </article>

            {similarShows.length > 0 && (
                <section className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-2xl font-black mb-6 text-white border-b border-border-dark pb-3 flex items-center gap-3 uppercase tracking-wider">
                        <svg width="24" height="24" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {similarShows.map((sim: any) => (
                            <a key={sim.slug} href={`/shows/${sim.slug}`} className="group flex bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:neon-glow h-32">
                                <div className="w-1/3 shrink-0 relative bg-background-dark">
                                    <img
                                        src={sim.imageurl}
                                        alt={sim.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 bg-background-dark/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] uppercase font-black tracking-widest text-primary border border-primary/20">
                                        {sim.category}
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-1">
                                    <h3 className="font-black text-lg uppercase tracking-tight text-white group-hover:text-primary transition-colors line-clamp-1">{sim.name}</h3>
                                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mt-0.5 line-clamp-1 flex items-center gap-1">
                                        <svg width="12" height="12" className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {sim.venue}
                                    </p>
                                    <div className="mt-2 text-sm flex items-center">
                                        <span className={sim.customData?.['Cheapest Price'] ? "text-slate-500 line-through text-xs font-medium" : "text-primary font-bold"}>
                                            {sim.pricerange}
                                        </span>
                                        {sim.customData?.['Cheapest Price'] && (
                                            <span className="ml-2 text-primary font-black text-sm">
                                                {sim.customData['Cheapest Price']}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
