'use client'

import React, { useRef, useEffect, ReactNode } from 'react'

interface ScrollLockSectionProps {
  children: ReactNode
  className?: string
  parallaxSpeed?: number
  backgroundImage?: string
}

export function ScrollLockSection({ 
  children, 
  className = '', 
  parallaxSpeed = 0.5,
  backgroundImage
}: ScrollLockSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollPercentage = 1 - (rect.top / window.innerHeight)
      
      if (scrollPercentage >= 0 && scrollPercentage <= 1) {
        const translateY = scrollPercentage * parallaxSpeed * 100
        content.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallaxSpeed])

  return (
    <section ref={sectionRef} className={`scroll-lock-section ${className}`}>
      {backgroundImage && (
        <div 
          className="parallax-bg" 
          style={{backgroundImage: `url(${backgroundImage})`}}
        ></div>
      )}
      <div ref={contentRef} className="content">
        {children}
      </div>
    </section>
  )
}

