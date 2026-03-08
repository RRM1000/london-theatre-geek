import TheatreSearchFacility from "@/components/TheatreSearchFacility";
import { getTheatres } from "@/utils/theatres";

export const revalidate = 3600; // Same cache timing as shows

export default async function TheatresPage() {
    const theatres = await getTheatres();

    return (
        <div className="space-y-12 pb-24">
            <section className="text-center py-10 md:py-20 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl border border-amber-500/20 shadow-[0_0_100px_rgba(251,191,36,0.1)]">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    London Theatres
                </h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto px-4 font-light">
                    Browse the iconic venues hosting your favorite West End shows.
                </p>
            </section>

            <section>
                <TheatreSearchFacility initialTheatres={theatres} />
            </section>
        </div>
    );
}
