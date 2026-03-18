'use client'

import React from 'react'
import Link from 'next/link'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  direction?: 'left' | 'right' | 'auto'
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function TransitionLink({ 
  href, 
  children, 
  className, 
  style,
  direction,
  onClick
}: TransitionLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
      return
    }
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  )
}
