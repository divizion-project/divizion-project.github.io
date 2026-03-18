'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

interface TransitionContextType {
  isTransitioning: boolean
  transitionDirection: 'left' | 'right' | 'none'
  startTransition: (direction: 'left' | 'right', callback: () => void) => void
  isFirstVisit: boolean
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionDirection: 'none',
  startTransition: () => {},
  isFirstVisit: true
})

export const usePageTransition = () => useContext(TransitionContext)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | 'none'>('none')
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (typeof window !== 'undefined') {
        const hasVisited = sessionStorage.getItem('hasVisited')
        if (hasVisited) {
          setIsFirstVisit(false)
        } else {
          sessionStorage.setItem('hasVisited', 'true')
        }
      }
    }
  }, [])

  const startTransition = useCallback((direction: 'left' | 'right', callback: () => void) => {
    setTransitionDirection(direction)
    setIsTransitioning(true)
    
    setTimeout(() => {
      callback()
    }, 300)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setTransitionDirection('none')
    }, 600)
  }, [])

  return (
    <TransitionContext.Provider value={{ 
      isTransitioning, 
      transitionDirection, 
      startTransition, 
      isFirstVisit 
    }}>
      {children}
    </TransitionContext.Provider>
  )
}
