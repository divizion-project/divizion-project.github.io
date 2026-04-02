'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    // Hide after loading bar animation completes
    const timer = setTimeout(() => {
      setHidden(true)
    }, 1400)

    const removeTimer = setTimeout(() => {
      setRemoved(true)
    }, 1900)

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (removed) return null

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <img
        src="/images/icones/logo-small-navbar.webp"
        alt="Divizion"
        className="loading-logo"
      />
      <div className="loading-bar-wrapper">
        <div className="loading-bar" />
      </div>
    </div>
  )
}
