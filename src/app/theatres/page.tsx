import TheatreSearchFacility from "@/components/TheatreSearchFacility";
import { getTheatres } from "@/utils/theatres";

export const revalidate = 3600; // Same cache timing as shows

export default async function TheatresPage() {
    const theatres = await getTheatres();

    return (
        <div className="space-y-12 pb-24">
            <section className="text-center py-10 md:py-20 bg-card-dark rounded-[1.5rem] border border-border-dark shadow-[0_0_15px_rgba(245,245,61,0.1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-background-dark/30 z-10 pointer-events-none"></div>
                <div className="relative z-20 px-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-white tracking-widest marquee-text">
                        London Theatres
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        Browse the iconic venues hosting your favorite West End shows.
                    </p>
                </div>
            </section>

            <section>
                <TheatreSearchFacility initialTheatres={theatres} />
            </section>
        </div>
    );
}
