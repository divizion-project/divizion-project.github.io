'use client'

import React from 'react'

interface ScrollButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
  offset?: number
  duration?: number
}

export default function ScrollButton({ 
  targetId, 
  children, 
  className,
  offset = 80,
  duration = 600
}: ScrollButtonProps) {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const easeOutQuart = (t: number) => {
        return 1 - Math.pow(1 - t, 4)
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        
        const ease = easeOutQuart(progress)
        window.scrollTo(0, startPosition + distance * ease)
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }
      
      requestAnimationFrame(animation)
    }
  }

  return (
    <a 
      href={`#${targetId}`} 
      className={className} 
      onClick={smoothScroll}
    >
      {children}
    </a>
  )
}
