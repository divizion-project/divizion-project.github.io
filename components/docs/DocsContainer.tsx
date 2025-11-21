'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { DocData } from '@/types/documentation';
import DocRenderer from './DocRenderer';
import { getDocFiles, getDocContent, DocFile } from '@/lib/docs';

interface DocPreview {
    file: DocFile;
    meta?: DocData['meta'];
    loading: boolean;
}

export default function DocsContainer() {
    const [docs, setDocs] = useState<DocPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoc, setSelectedDoc] = useState<DocData | null>(null);
    const [loadingContent, setLoadingContent] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Initial fetch of file list
    useEffect(() => {
        async function init() {
            try {
                const files = await getDocFiles();
                // Initialize docs with filenames, we'll fetch metadata lazily or in parallel
                const initialDocs: DocPreview[] = files.map(f => ({
                    file: f,
                    loading: true
                }));
                setDocs(initialDocs);
                setLoading(false);

                // Fetch metadata for all files to display titles
                // We do this after setting the initial list to show something fast
                files.forEach(async (file) => {
                    const content = await getDocContent(file.download_url);
                    if (content) {
                        setDocs(prev => {
                            const newDocs = [...prev];
                            const docIndex = newDocs.findIndex(d => d.file.path === file.path);
                            if (docIndex !== -1) {
                                newDocs[docIndex] = {
                                    ...newDocs[docIndex],
                                    meta: content.meta,
                                    loading: false
                                };
                            }
                            return newDocs;
                        });
                    }
                });

            } catch (error) {
                console.error('Failed to init docs:', error);
                setLoading(false);
            }
        }
        init();
    }, []);

    const handleSelectDoc = async (docPreview: DocPreview) => {
        if (selectedDoc?.meta.id === docPreview.meta?.id) return;

        setLoadingContent(true);
        // If we already fetched metadata, we might have the full content if we stored it. 
        // But currently we only stored meta. Let's fetch fresh content to be sure or if we optimized to only fetch meta.
        // Actually, getDocContent returns the whole JSON, so we could have cached it. 
        // For simplicity, I'll fetch again or use a cache if I implemented one. 
        // Since I didn't implement a cache in state, I'll fetch.

        const content = await getDocContent(docPreview.file.download_url);
        if (content) {
            setSelectedDoc(content);
        }
        setLoadingContent(false);
    };

    const filteredDocs = docs.filter(doc => {
        const query = searchQuery.toLowerCase();
        const title = doc.meta?.title?.toLowerCase() || doc.file.name.toLowerCase();
        const desc = doc.meta?.description?.toLowerCase() || '';
        return title.includes(query) || desc.includes(query);
    });

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#d0d0d0] overflow-hidden flex flex-col">
            {/* Top Bar (Search) */}
            <div className="w-full p-6 z-50">
                <div className={`relative transition-all duration-500 ease-in-out ${selectedDoc ? 'max-w-xs' : 'max-w-2xl mx-auto'}`}>
                    {selectedDoc && (
                        <button
                            onClick={() => setSelectedDoc(null)}
                            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#ff6b35] hover:bg-[#ff6b35]/10 transition-all duration-200"
                            aria-label="Retour à la liste"
                        >
                            <ChevronRight className="rotate-180 text-[#d0d0d0]" size={20} />
                        </button>
                    )}
                    <div className={`relative ${selectedDoc ? 'ml-14 md:ml-0' : ''}`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#666]" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-[#3a3a3a] rounded leading-5 bg-[#2a2a2a] text-[#d0d0d0] placeholder-[#666] focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] sm:text-sm transition-colors"
                            placeholder="Search documentation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 relative flex overflow-hidden">

                {/* Sidebar / Centered List */}
                <motion.div
                    layout
                    layoutRoot
                    className={`
            flex flex-col flex-shrink-0 overflow-y-auto custom-scrollbar p-6
            ${selectedDoc ? 'hidden md:flex md:w-80 md:border-r border-[#3a3a3a]' : 'w-full max-w-4xl mx-auto'}
          `}
                    transition={{
                        layout: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }
                    }}
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-[#ff6b35]" size={32} />
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className={`grid gap-4 ${selectedDoc ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
                            transition={{
                                layout: { type: 'spring', stiffness: 300, damping: 30 }
                            }}
                        >
                            <AnimatePresence initial={false}>
                                {filteredDocs.map((doc) => (
                                    <motion.div
                                        key={doc.file.path}
                                        layout="position"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            layout: { type: 'spring', stiffness: 350, damping: 30 },
                                            opacity: { duration: 0.2 },
                                            y: { duration: 0.2 }
                                        }}
                                        onClick={() => handleSelectDoc(doc)}
                                        className={`
                      cursor-pointer rounded border p-5 relative overflow-hidden group
                      transition-colors duration-200 ease-out
                      ${selectedDoc?.meta.id === doc.meta?.id
                                                ? 'bg-[#ff6b35]/10 border-[#ff6b35]'
                                                : 'bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/10'}
                    `}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-bold truncate ${selectedDoc ? 'text-sm' : 'text-lg'} text-[#d0d0d0] group-hover:text-[#ff6b35] transition-colors duration-200`}>
                                                    {doc.meta?.title || doc.file.name}
                                                </h3>
                                                <p className={`text-[#999] mt-1 truncate ${selectedDoc ? 'text-xs' : 'text-sm'}`}>
                                                    {doc.meta?.description || 'No description available'}
                                                </p>
                                                {!selectedDoc && doc.meta?.tags && (
                                                    <div className="flex gap-2 mt-3">
                                                        {doc.meta.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-[#1a1a1a] text-[#666] border border-[#3a3a3a]">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {selectedDoc?.meta.id === doc.meta?.id && (
                                                <ChevronRight className="text-[#ff6b35] flex-shrink-0" size={16} />
                                            )}
                                        </div>

                                        {/* Loading state for individual item meta fetching */}
                                        {doc.loading && (
                                            <div className="absolute inset-0 bg-[#1a1a1a]/50 flex items-center justify-center">
                                                <Loader2 className="animate-spin text-[#ff6b35]" size={16} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {selectedDoc && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, x: 50, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: 'auto' }}
                            exit={{ opacity: 0, x: 50, width: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="flex-1 overflow-y-auto custom-scrollbar bg-[#1a1a1a]"
                        >
                            {loadingContent ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-[#ff6b35]" size={48} />
                                </div>
                            ) : (
                                <div className="p-8 md:p-12">
                                    <DocRenderer data={selectedDoc} />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
