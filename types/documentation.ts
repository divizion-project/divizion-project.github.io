export interface DocMeta {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    coverImage?: string;
    author?: string;
    lastUpdated?: string;
    tags?: string[];
}

export interface TextSegment {
    text: string;
    bold?: boolean;
    italic?: boolean;
    link?: string;
    color?: string;
}

export interface HeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
}

export interface ParagraphBlock {
    type: 'paragraph';
    content: TextSegment[];
}

export interface ImageBlock {
    type: 'image';
    url: string;
    alt: string;
    caption?: string;
    width?: 'full' | 'auto';
}

export interface Button {
    type: 'text' | 'text_icon' | 'icon_only';
    label?: string;
    action: string;
    variant: 'primary' | 'outline' | 'ghost';
    icon?: string;
}

export interface ButtonGroupBlock {
    type: 'button_group';
    alignment: 'left' | 'center' | 'right';
    buttons: Button[];
}

export interface Step {
    step_number: number;
    title: string;
    description: string;
}

export interface StepListBlock {
    type: 'step_list';
    title?: string;
    description?: string;
    steps: Step[];
}

export interface AlertBlock {
    type: 'alert';
    variant: 'info' | 'warning' | 'error' | 'success';
    title?: string;
    content: TextSegment[];
}

export interface CodeBlock {
    type: 'code';
    language: string;
    content: string;
    showCopyButton?: boolean;
}

export type DocBlock =
    | HeadingBlock
    | ParagraphBlock
    | ImageBlock
    | ButtonGroupBlock
    | StepListBlock
    | AlertBlock
    | CodeBlock;

export interface DocData {
    meta: DocMeta;
    blocks: DocBlock[];
}
