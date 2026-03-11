'use server';

import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Initialize Supabase client safely so it doesn't crash the build if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize Upstash Redis for rate limiting
// Fallback to a dummy object if env vars are missing during build/setup
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;

// Allow 5 submissions per 60 seconds per IP
const ratelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '60 s'),
    })
    : null;

export async function submitComment(prevState: any, formData: FormData) {
    try {
        // 1. Check the Honeypot first (bots will often fill this out)
        const website = formData.get('website');
        if (website !== null && website !== '') {
            // Silently reject by returning success, but doing nothing.
            // This prevents bots from knowing their method failed.
            return { success: true, message: 'Comment submitted successfully' };
        }

        // 2. Extact and validate standard fields
        const author_name = formData.get('author_name') as string;
        const content = formData.get('content') as string;
        const show_slug = formData.get('show_slug') as string;

        if (!author_name || author_name.trim().length === 0) {
            return { success: false, error: 'Name is required' };
        }
        if (!content || content.trim().length === 0) {
            return { success: false, error: 'Comment cannot be empty' };
        }
        if (!show_slug) {
            return { success: false, error: 'Internal error: missing show reference' };
        }

        // Strip simple HTML tags to prevent XSS (a full sanitization library like DOMPurify is better for production)
        const cleanName = author_name.replace(/<[^>]*>?/gm, '');
        const cleanContent = content.replace(/<[^>]*>?/gm, '');

        // 3. Rate Limiting Check
        if (ratelimit) {
            const headersList = await headers();
            const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
            const { success } = await ratelimit.limit(`ratelimit_comments_${ip}`);

            if (!success) {
                return { success: false, error: 'You are submitting comments too quickly. Please wait a minute.' };
            }
        }

        // 4. Insert into Supabase
        if (!supabase) {
            return { success: false, error: 'Database environment variables are missing.' };
        }

        const { error } = await supabase
            .from('comments')
            .insert([
                {
                    show_slug: show_slug,
                    author_name: cleanName,
                    content: cleanContent,
                },
            ]);

        if (error) {
            console.error('Supabase raw error:', error);
            // Don't expose internal DB errors to the client
            return { success: false, error: 'Failed to save comment to database.' };
        }

        // 5. Revalidate the specific show page so the new comment appears immediately
        revalidatePath(`/shows/${show_slug}`);

        return { success: true, message: 'Comment posted!' };

    } catch (e) {
        console.error('Comment submission error:', e);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}
