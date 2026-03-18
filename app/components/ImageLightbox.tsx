'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw, Move } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({ src, alt, caption, isOpen, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const resetTransforms = useCallback(() => {
    setScale(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (isOpen) {
      resetTransforms()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, resetTransforms])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          setScale(prev => Math.min(prev + 0.25, 4))
          break
        case '-':
          setScale(prev => Math.max(prev - 0.25, 0.25))
          break
        case '0':
          resetTransforms()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, resetTransforms])

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.25))
  const handleRotate = () => setRotation(prev => (prev + 90) % 360)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.max(0.25, Math.min(4, prev + delta)))
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="lightbox-overlay" onClick={handleBackdropClick}>
      <div className="lightbox-header">
        <div className="lightbox-controls">
          <button onClick={handleZoomOut} className="lightbox-btn" title="Zoom arrière">
            <ZoomOut size={20} />
          </button>
          <span className="lightbox-zoom-level">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="lightbox-btn" title="Zoom avant">
            <ZoomIn size={20} />
          </button>
          <button onClick={handleRotate} className="lightbox-btn" title="Rotation">
            <RotateCw size={20} />
          </button>
          <button onClick={resetTransforms} className="lightbox-btn" title="Réinitialiser">
            {scale !== 1 || rotation !== 0 ? 'Reset' : <Move size={20} />}
          </button>
        </div>
        <button onClick={onClose} className="lightbox-close" title="Fermer">
          <X size={24} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="lightbox-content"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          className={`lightbox-image ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          draggable={false}
        />
      </div>

      {caption && (
        <div className="lightbox-caption">
          {caption}
        </div>
      )}

      <div className="lightbox-hint">
        Molette pour zoomer • Glisser pour déplacer • Échap pour fermer
      </div>
    </div>
  )
}
