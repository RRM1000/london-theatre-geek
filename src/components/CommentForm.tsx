'use client';

import React, { useState, useRef, useEffect } from 'react';
// Note: In Next.js 14/15, useActionState is preferred, but for broader compatibility
// without experimental flags, we'll use a standard async form submission.
// Replace this with standard import from react if useActionState is available in this env.
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`gold-gradient text-background-dark font-black px-10 py-4 uppercase tracking-[0.3em] font-display text-xs border border-primary shadow-xl w-full md:w-auto transition-all ${pending ? 'opacity-75 cursor-not-allowed' : 'hover:brightness-110'
                }`}
        >
            {pending ? 'TRANSMITTING...' : 'POST COMMENT'}
        </button>
    );
}

interface CommentFormProps {
    showSlug: string;
    submitAction: (prevState: any, formData: FormData) => Promise<any>;
}

export default function CommentForm({ showSlug, submitAction }: CommentFormProps) {
    const [state, setState] = useState<{ success?: boolean; error?: string; message?: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAction(formData: FormData) {
        // Optimistically clear errors
        setState(null);
        // Call the server action directly
        const result = await submitAction(state, formData);
        setState(result);

        if (result?.success) {
            formRef.current?.reset();
        }
    }

    return (
        <div className="bg-card-dark p-8 md:p-12 border border-primary/30 relative overflow-hidden mt-8 shadow-xl">
            {/* Sci-Fi Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>

            <h3 className="text-primary text-2xl font-black uppercase tracking-widest font-display mb-6 title-shadow">
                Log Your Assessment
            </h3>

            <form ref={formRef} action={handleAction} className="space-y-6">
                <input type="hidden" name="show_slug" value={showSlug} />

                {/* HONEYPOT FIELD (Hidden from users, targeted by bots) */}
                <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                    <label htmlFor="author_name" className="block text-primary/80 text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-display">
                        Observer Identity
                    </label>
                    <input
                        type="text"
                        id="author_name"
                        name="author_name"
                        required
                        className="w-full bg-background-dark/50 border border-primary/40 p-4 text-white placeholder:text-primary/40 focus:ring-1 focus:ring-primary focus:outline-none font-body uppercase tracking-wider text-sm transition-colors"
                        placeholder="ENTER NAME OR ALIAS"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-primary/80 text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-display">
                        Transmission Data
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        rows={4}
                        className="w-full bg-background-dark/50 border border-primary/40 p-4 text-white placeholder:text-primary/40 focus:ring-1 focus:ring-primary focus:outline-none font-body tracking-wider text-sm transition-colors resize-y"
                        placeholder="ENTER YOUR REVIEW / THOUGHTS HERE..."
                    />
                </div>

                {state?.error && (
                    <div className="bg-secondary/20 border border-secondary text-white p-4 font-body text-sm rounded-none">
                        <strong className="text-secondary font-black uppercase tracking-widest font-display mr-2">ERROR:</strong>
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="bg-primary/20 border border-primary text-white p-4 font-body text-sm rounded-none">
                        <strong className="text-primary font-black uppercase tracking-widest font-display mr-2">SUCCESS:</strong>
                        {state.message}
                    </div>
                )}

                <div className="pt-2">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}
