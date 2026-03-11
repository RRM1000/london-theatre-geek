import { createClient } from '@supabase/supabase-js';
import CommentForm from './CommentForm';

// Do not initialize at the top level to prevent Vercel static build crashes
// when environment variables are missing
const getSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return null;
    return createClient(supabaseUrl, supabaseKey);
};

import { submitComment } from '@/actions/comments';

interface Comment {
    id: string;
    author_name: string;
    content: string;
    created_at: string;
}

export default async function CommentSection({ showSlug }: { showSlug: string }) {
    const supabase = getSupabaseClient();

    if (!supabase) {
        return (
            <section className="max-w-4xl mx-auto mt-20 border-t-2 border-primary pt-16">
                <div className="bg-background-dark border border-secondary/50 p-8 text-center text-secondary">
                    DATABASE CONNECTION OFFLINE. (Missing Supabase Environment Variables)
                </div>
            </section>
        );
    }

    // Fetch comments for this specific show
    // We order by created_at ascending so the newest comments are at the bottom (like a chat log)
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('show_slug', showSlug)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
    }

    return (
        <section className="max-w-4xl mx-auto mt-20 border-t-2 border-primary pt-16">
            <div className="flex items-center justify-between mb-10">
                <div className="relative">
                    <h2 className="text-3xl font-black uppercase tracking-widest font-display mb-2 title-shadow text-white">
                        Observer Logs
                    </h2>
                    <div className="h-1 w-24 bg-primary"></div>
                </div>
                <div className="text-primary text-[10px] font-black uppercase tracking-[0.4em] font-display">
                    {comments?.length || 0} Records Found
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6 mb-12">
                {!comments || comments.length === 0 ? (
                    <div className="bg-background-dark border border-primary/20 p-8 text-center">
                        <p className="text-slate-400 font-body italic text-sm">No observational data recorded for this sector yet.</p>
                    </div>
                ) : (
                    comments.map((comment: Comment) => (
                        <div key={comment.id} className="bg-card-dark border-l-4 border-primary p-6 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-primary font-black uppercase tracking-widest font-display text-sm">
                                    {comment.author_name}
                                </h4>
                                <time className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                                    {new Date(comment.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                            <p className="text-slate-200 font-body text-sm leading-relaxed whitespace-pre-wrap">
                                {/* Using whitespace-pre-wrap preserves line breaks from the textarea */}
                                {comment.content}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Comment Form */}
            <CommentForm showSlug={showSlug} submitAction={submitComment} />

        </section>
    );
}
