'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function MobilePopup() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [])

  // On desktop: render nothing, site shows normally
  if (!isMobile) return null

  // On mobile: cover entire viewport — user sees ONLY the banner, site is hidden
  return (
    <a
      href="https://wa.me/919311580517?text=Hello%20I%20want%20more%20information"
      target="_blank"
    rel="noopener noreferrer nofollow"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'block',
        background: '#000',
      }}
    >
      <Image
        src="/banner.png"
        alt="Banner"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </a>
  )
}
