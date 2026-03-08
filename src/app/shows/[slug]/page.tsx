import { notFound } from 'next/navigation';

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

// Fetch single show by slug
async function getShowBySlug(slug: string) {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: { Authorization: `Bearer ${WEBFLOW_API_TOKEN}`, Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch from Webflow');

    const data = await res.json();
    const show = data.items.find((item: any) => item.fieldData.slug === slug);
    if (!show) return null;

    let imageUrl = `https://placehold.co/400x600/18181b/f43f5e.png?text=${encodeURIComponent(show.fieldData.name || 'Show')}`;

    return { ...show.fieldData, imageurl: imageUrl };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const show = await getShowBySlug(resolvedParams.slug);

    if (!show) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto mt-10 p-6 md:p-10 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl flex flex-col md:flex-row gap-10">

            <div className="md:w-1/2 shrink-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_20px_50px_rgba(244,63,94,0.15)] ring-1 ring-zinc-700">
                    <img
                        src={show.imageurl}
                        alt={show.name}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur border border-amber-400/30 text-amber-400 px-3 py-1 text-sm font-semibold rounded-lg shadow-xl uppercase tracking-wider">
                        {show.category}
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 flex flex-col justify-center">
                <a href="/" className="inline-flex items-center text-rose-500 hover:text-rose-400 mb-6 font-medium text-sm transition-colors cursor-pointer group">
                    <svg width="16" height="16" className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Listings
                </a>

                <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight leading-tight">
                    {show.name}
                </h1>

                <div className="flex flex-col gap-3 mb-8">
                    <div className="inline-flex items-center text-zinc-300 font-medium">
                        <svg width="20" height="20" className="w-5 h-5 mr-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-lg">{show.venue}</span>
                    </div>

                    <div className="inline-flex items-center text-zinc-300 font-medium pb-4 border-b border-zinc-800">
                        <svg width="20" height="20" className="w-5 h-5 mr-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span className="text-lg text-rose-400">{show.pricerange}</span>
                    </div>
                </div>

                <div className="prose prose-zinc prose-invert prose-lg text-zinc-300">
                    <p className="leading-relaxed">
                        {show.shortdescription}
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <div className="mt-10">
                    <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg ring-1 ring-rose-500 hover:ring-rose-400 transition-all shadow-rose-600/20 active:scale-[0.98]">
                        Book Tickets Now
                    </button>
                </div>
            </div>

        </article>
    )
}
