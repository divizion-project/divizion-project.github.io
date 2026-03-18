'use client'

import React, { useState } from 'react'
import TransitionLink from './TransitionLink'
import ImageLightbox from './ImageLightbox'
import { 
  Download, Github, ExternalLink, Copy, Check, ChevronRight,
  AlertCircle, Info, AlertTriangle, CheckCircle, ZoomIn
} from 'lucide-react'

interface TextSegment {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  link?: string
  color?: string
  type?: string
  src?: string
  alt?: string
  width?: number
  height?: number
}

interface ButtonConfig {
  type: 'text' | 'text_icon' | 'icon_only'
  label?: string | { fr: string; en: string }
  icon?: string
  action: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
}

interface Step {
  step_number: number
  title: string
  description: string
}

interface DocBlock {
  type: string
  level?: number
  text?: string | { fr: string; en: string }
  content?: TextSegment[] | string | { fr: TextSegment[]; en: TextSegment[] }
  url?: string
  alt?: string
  caption?: string
  width?: string
  alignment?: 'left' | 'center' | 'right'
  buttons?: ButtonConfig[]
  title?: string | { fr: string; en: string }
  description?: string | { fr: string; en: string }
  steps?: Step[] | { fr: Step[]; en: Step[] }
  variant?: 'info' | 'warning' | 'error' | 'success'
  language?: string
  showCopyButton?: boolean
}

const iconMap: Record<string, any> = {
  download: Download,
  github: Github,
  external: ExternalLink,
}

const alertIcons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle
}

function renderTextContent(content: TextSegment[]) {
  return content.map((segment, index) => {
    if (segment.type === 'inline_image' && segment.src) {
      return (
        <img 
          key={index}
          src={segment.src}
          alt={segment.alt || ''}
          width={segment.width}
          height={segment.height}
          className="inline-image"
        />
      )
    }

    let element: React.ReactNode = segment.text

    if (segment.link) {
      element = (
        <a 
          href={segment.link} 
          target={segment.link.startsWith('http') ? '_blank' : undefined}
          rel={segment.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{ color: segment.color || 'var(--color-accent)' }}
        >
          {element}
        </a>
      )
    }

    if (segment.bold) {
      element = <strong>{element}</strong>
    }
    if (segment.italic) {
      element = <em>{element}</em>
    }
    if (segment.underline) {
      element = <u>{element}</u>
    }
    if (segment.color && !segment.link) {
      element = <span style={{ color: segment.color }}>{element}</span>
    }

    return <span key={index}>{element}</span>
  })
}

function CodeBlock({ content, language, showCopyButton }: { content: string; language?: string; showCopyButton?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      {language && (
        <div className="code-header">
          <span className="code-language">{language}</span>
          {showCopyButton && (
            <button className="code-copy-btn" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="code-content">
        <code>{content}</code>
      </pre>
    </div>
  )
}

function ImageBlock({ url, alt, caption, width }: { url: string; alt?: string; caption?: string; width?: string }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <>
      <figure className={`doc-figure width-${width || 'full'}`}>
        <div className="doc-image-wrapper" onClick={() => setIsLightboxOpen(true)}>
          <img 
            src={url} 
            alt={alt || ''} 
            className="doc-image"
          />
          <div className="doc-image-overlay">
            <ZoomIn size={24} />
            <span>Cliquer pour agrandir</span>
          </div>
        </div>
        {caption && (
          <figcaption className="doc-caption">{caption}</figcaption>
        )}
      </figure>
      
      <ImageLightbox
        src={url}
        alt={alt || ''}
        caption={caption}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  )
}

function ButtonGroup({ alignment, buttons, locale }: { alignment?: string; buttons: ButtonConfig[]; locale: 'fr' | 'en' }) {
  return (
    <div className={`button-group align-${alignment || 'left'}`}>
      {buttons.map((button, index) => {
        const Icon = button.icon ? iconMap[button.icon] : null
        const isExternal = button.action.startsWith('http')
        const label = typeof button.label === 'string' ? button.label : button.label?.[locale] || ''
        
        const buttonContent = (
          <>
            {button.type !== 'icon_only' && label}
            {Icon && <Icon size={16} />}
          </>
        )

        const className = `doc-button variant-${button.variant} type-${button.type}`

        if (isExternal) {
          return (
            <a
              key={index}
              href={button.action}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {buttonContent}
            </a>
          )
        }

        return (
          <TransitionLink key={index} href={button.action} className={className}>
            {buttonContent}
          </TransitionLink>
        )
      })}
    </div>
  )
}

function StepList({ title, description, steps, locale }: { title?: string | { fr: string; en: string }; description?: string | { fr: string; en: string }; steps: Step[] | { fr: Step[]; en: Step[] }; locale: 'fr' | 'en' }) {
  const localizedTitle = typeof title === 'string' ? title : title?.[locale] || ''
  const localizedDescription = typeof description === 'string' ? description : description?.[locale] || ''
  const localizedSteps = Array.isArray(steps) ? steps : steps[locale]
  
  return (
    <div className="step-list">
      {localizedTitle && <h4 className="step-list-title">{localizedTitle}</h4>}
      {localizedDescription && <p className="step-list-description">{localizedDescription}</p>}
      <div className="steps">
        {localizedSteps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-number">{step.step_number}</div>
            <div className="step-content">
              <h5 className="step-title">{step.title}</h5>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlertBlock({ variant, title, content, locale }: { variant?: string; title?: string | { fr: string; en: string }; content: TextSegment[] | string | { fr: TextSegment[]; en: TextSegment[] }; locale: 'fr' | 'en' }) {
  const Icon = alertIcons[variant as keyof typeof alertIcons] || Info
  const localizedTitle = typeof title === 'string' ? title : title?.[locale] || ''
  const contentArray = typeof content === 'string' 
    ? [{ text: content }] 
    : Array.isArray(content) 
      ? content 
      : content[locale]

  return (
    <div className={`alert-block variant-${variant || 'info'}`}>
      <div className="alert-icon">
        <Icon size={20} />
      </div>
      <div className="alert-content">
        {localizedTitle && <h4 className="alert-title">{localizedTitle}</h4>}
        <div className="alert-text">{renderTextContent(contentArray)}</div>
      </div>
    </div>
  )
}

export default function DocBlockRenderer({ block, locale = 'fr' }: { block: DocBlock; locale?: 'fr' | 'en' }) {
  switch (block.type) {
    case 'heading':
      const HeadingTag = `h${block.level || 2}` as React.ElementType
      const headingClass = `doc-heading level-${block.level || 2}`
      const headingText = typeof block.text === 'string' ? block.text : block.text?.[locale] || ''
      return <HeadingTag className={headingClass}>{headingText}</HeadingTag>

    case 'paragraph':
      if (!block.content) return null
      const paragraphContent = typeof block.content === 'string' 
        ? [{ text: block.content }] 
        : Array.isArray(block.content) 
          ? block.content 
          : block.content[locale]
      return <p className="doc-paragraph">{renderTextContent(paragraphContent)}</p>

    case 'image':
      return <ImageBlock url={block.url || ''} alt={block.alt} caption={block.caption} width={block.width} />

    case 'button_group':
      if (!block.buttons) return null
      return <ButtonGroup alignment={block.alignment} buttons={block.buttons} locale={locale} />

    case 'step_list':
      if (!block.steps) return null
      return <StepList title={block.title} description={block.description} steps={block.steps} locale={locale} />

    case 'alert':
      if (!block.content) return null
      return <AlertBlock variant={block.variant} title={block.title} content={block.content} locale={locale} />

    case 'code':
      return (
        <CodeBlock 
          content={typeof block.content === 'string' ? block.content : ''} 
          language={block.language}
          showCopyButton={block.showCopyButton}
        />
      )

    default:
      return null
  }
}
