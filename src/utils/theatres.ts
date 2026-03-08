import { Show } from '@/components/SearchFacility';
import { getCustomData } from './customData';

const WEBFLOW_API_TOKEN = '2fa739d7456e30751df41d402e19f154ce6994ea1a32890e1a7aed5fc53f16e6';
const COLLECTION_ID = '69ada6bd9c227d57ec0a1466';

export type Theatre = {
    id: string;
    name: string;
    slug: string;
    shows: Show[];
};

export async function getTheatres(): Promise<Theatre[]> {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
        headers: {
            Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
            Accept: 'application/json',
        },
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Webflow shows for theatres');
    }

    const data = await res.json();
    const customDataMap = getCustomData();

    // Map all shows first
    const allShows: Show[] = data.items.map((item: any) => {
        const slug = item.fieldData.slug;
        let imageUrl = `https://placehold.co/400x600/18181b/f43f5e.png?text=${encodeURIComponent(item.fieldData.name || 'Show')}`;

        return {
            id: item.id,
            name: item.fieldData.name,
            slug: slug,
            imageurl: imageUrl,
            venue: item.fieldData.venue || 'Unknown Venue', // Fallback
            pricerange: item.fieldData.pricerange,
            shortdescription: item.fieldData.shortdescription,
            category: item.fieldData.category,
            customData: customDataMap[slug] || {}
        };
    });

    // Group by venue
    const theatreMap: Record<string, Show[]> = {};

    for (const show of allShows) {
        const venueName = show.venue;
        if (!theatreMap[venueName]) {
            theatreMap[venueName] = [];
        }
        theatreMap[venueName].push(show);
    }

    // Convert map to array of Theatre objects
    const theatres: Theatre[] = Object.keys(theatreMap).map(venueName => {
        // Generate a URL-friendly slug from the venue name
        const slug = venueName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        return {
            id: `theatre-${slug}`,
            name: venueName,
            slug: slug,
            shows: theatreMap[venueName]
        };
    });

    // Sort alphabetically naturally
    return theatres.sort((a, b) => a.name.localeCompare(b.name));
}

// Fetch a single theatre by its extracted slug
export async function getTheatreBySlug(slug: string): Promise<Theatre | null> {
    const theatres = await getTheatres();
    return theatres.find(t => t.slug === slug) || null;
}
