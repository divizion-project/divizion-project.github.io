'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    DocData,
    DocBlock,
    HeadingBlock,
    ParagraphBlock,
    ImageBlock,
    ButtonGroupBlock,
    StepListBlock,
    AlertBlock,
    TextSegment,
    CodeBlock
} from '@/types/documentation';
import { Download, Github, ExternalLink, AlertTriangle, CheckCircle, Info, XCircle, ChevronRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

const TextRenderer = ({ content }: { content: TextSegment[] }) => {
    return (
        <span>
            {content.map((segment, index) => {
                const style: React.CSSProperties = {
                    fontWeight: segment.bold ? 'bold' : 'normal',
                    fontStyle: segment.italic ? 'italic' : 'normal',
                    color: segment.color || 'inherit',
                };

                if (segment.link) {
                    return (
                        <a
                            key={index}
                            href={segment.link}
                            style={style}
                            className="underline hover:text-[#ff6b35] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {segment.text}
                        </a>
                    );
                }

                return <span key={index} style={style}>{segment.text}</span>;
            })}
        </span>
    );
};

const HeadingRenderer = ({ block }: { block: HeadingBlock }) => {
    const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
    const sizes = {
        1: 'text-4xl font-bold mb-6 mt-8',
        2: 'text-3xl font-bold mb-5 mt-8',
        3: 'text-2xl font-bold mb-4 mt-6',
        4: 'text-xl font-bold mb-3 mt-5',
        5: 'text-lg font-bold mb-2 mt-4',
        6: 'text-base font-bold mb-2 mt-4',
    };

    return <Tag className={`${sizes[block.level]} text-[#d0d0d0]`}>{block.text}</Tag>;
};

const ParagraphRenderer = ({ block }: { block: ParagraphBlock }) => {
    return (
        <p className="text-[#999] leading-relaxed mb-4">
            <TextRenderer content={block.content} />
        </p>
    );
};

const ImageRenderer = ({ block }: { block: ImageBlock }) => {
    return (
        <div className={`my-8 ${block.width === 'full' ? 'w-full' : 'w-auto inline-block'}`}>
            <div className="relative group overflow-hidden rounded border border-[#3a3a3a] shadow-2xl bg-[#2a2a2a]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={block.url}
                    alt={block.alt}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            {block.caption && (
                <p className="text-center text-sm text-[#666] mt-2 italic">{block.caption}</p>
            )}
        </div>
    );
};

const ButtonGroupRenderer = ({ block }: { block: ButtonGroupBlock }) => {
    const alignClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[block.alignment];

    return (
        <div className={`flex flex-wrap gap-4 my-6 ${alignClass}`}>
            {block.buttons.map((btn, idx) => {
                const Icon = btn.icon === 'download' ? Download : btn.icon === 'github' ? Github : null;

                const baseClass = "px-6 py-3 rounded font-bold uppercase tracking-widest text-sm transition-colors duration-300 flex items-center gap-2";
                const variants = {
                    primary: "bg-[#ff6b35] text-white hover:bg-[#e74c3c]",
                    outline: "border border-[#3a3a3a] bg-[#2a2a2a] text-[#d0d0d0] hover:border-[#ff6b35]",
                    ghost: "text-[#666] hover:text-[#d0d0d0] bg-transparent",
                };

                return (
                    <a
                        key={idx}
                        href={btn.action}
                        className={`${baseClass} ${variants[btn.variant]}`}
                        target={btn.action.startsWith('http') ? "_blank" : undefined}
                        rel={btn.action.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                        {Icon && <Icon size={16} />}
                        {btn.label}
                    </a>
                );
            })}
        </div>
    );
};

const StepListRenderer = ({ block }: { block: StepListBlock }) => {
    return (
        <div className="my-10">
            {block.title && <h3 className="text-2xl font-bold text-[#d0d0d0] mb-2">{block.title}</h3>}
            {block.description && <p className="text-[#999] mb-8">{block.description}</p>}

            <div className="relative pl-4 space-y-8">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#3a3a3a] to-transparent" />

                {block.steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6 group">
                        <div className="flex-shrink-0 w-14 h-14 rounded bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center text-xl font-bold text-[#d0d0d0] z-10 shadow-xl group-hover:border-[#ff6b35] transition-colors duration-300">
                            {step.step_number}
                        </div>
                        <div className="pt-2">
                            <h4 className="text-lg font-bold text-[#d0d0d0] mb-1 group-hover:text-[#ff6b35] transition-colors">{step.title}</h4>
                            <p className="text-[#999] leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AlertRenderer = ({ block }: { block: AlertBlock }) => {
    const styles = {
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-200', icon: Info },
        warning: { bg: 'bg-[#ff6b35]/10', border: 'border-[#ff6b35]/30', text: 'text-[#ff6b35]', icon: AlertTriangle },
        error: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-200', icon: XCircle },
        success: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-200', icon: CheckCircle },
    };

    const style = styles[block.variant] || styles.info;
    const Icon = style.icon;

    return (
        <div className={`my-6 p-4 rounded border ${style.bg} ${style.border} flex gap-4 items-start`}>
            <Icon className={`flex-shrink-0 mt-1 ${style.text}`} size={20} />
            <div>
                {block.title && <h5 className={`font-bold mb-1 ${style.text}`}>{block.title}</h5>}
                <div className="text-[#d0d0d0] text-sm">
                    <TextRenderer content={block.content} />
                </div>
            </div>
        </div>
    );
};

export default function DocRenderer({ data }: { data: DocData }) {
    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 border-b border-[#3a3a3a] pb-8"
            >
                {data.meta.coverImage && (
                    <div className="w-full h-64 rounded overflow-hidden mb-8 relative border border-[#3a3a3a]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={data.meta.coverImage}
                            alt={data.meta.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                    </div>
                )}

                <div className="flex gap-2 mb-4">
                    {data.meta.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded bg-[#2a2a2a] text-xs text-[#666] border border-[#3a3a3a]">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-5xl font-bold text-[#d0d0d0] mb-4 tracking-tight">{data.meta.title}</h1>
                {data.meta.subtitle && (
                    <p className="text-xl text-[#999] font-light">{data.meta.subtitle}</p>
                )}

                <div className="flex items-center gap-4 mt-6 text-sm text-[#666]">
                    {data.meta.author && <span>By {data.meta.author}</span>}
                    {data.meta.lastUpdated && <span>• Updated {data.meta.lastUpdated}</span>}
                </div>
            </motion.div>

            {/* Content Blocks */}
            <div className="space-y-2">
                {data.blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                        {block.type === 'heading' && <HeadingRenderer block={block} />}
                        {block.type === 'paragraph' && <ParagraphRenderer block={block} />}
                        {block.type === 'image' && <ImageRenderer block={block} />}
                        {block.type === 'button_group' && <ButtonGroupRenderer block={block} />}
                        {block.type === 'step_list' && <StepListRenderer block={block} />}
                        {block.type === 'alert' && <AlertRenderer block={block} />}
                        {block.type === 'code' && <CodeRenderer block={block} />}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const CodeRenderer = ({ block }: { block: CodeBlock }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(block.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 relative group rounded-lg border border-[#3a3a3a] bg-[#0d0d0d] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#3a3a3a]">
                <span className="text-xs font-mono text-[#666] uppercase">{block.language}</span>
                {block.showCopyButton && (
                    <button
                        onClick={handleCopy}
                        className="text-[#666] hover:text-[#d0d0d0] transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                )}
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-[#d0d0d0] leading-relaxed">
                    <code>{block.content}</code>
                </pre>
            </div>
        </div>
    );
};
