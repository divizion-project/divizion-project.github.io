'use client'

import React from 'react'
import { PageTransitionProvider, usePageTransition } from './PageTransition'

function TransitionOverlay() {
  const { isTransitioning, transitionDirection } = usePageTransition()

  return (
    <>
      <div 
        className={`transition-slide slide-out ${isTransitioning && transitionDirection === 'right' ? 'active' : ''}`}
        aria-hidden="true"
      />
      <div 
        className={`transition-slide slide-in ${isTransitioning && transitionDirection === 'left' ? 'active' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionProvider>
      <TransitionOverlay />
      {children}
    </PageTransitionProvider>
  )
}
