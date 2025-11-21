import React from 'react';
import DocsContainer from '@/components/docs/DocsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation - Divizion',
    description: 'Official documentation for Divizion projects and protocols.',
};

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <DocsContainer />
        </main>
    );
}
