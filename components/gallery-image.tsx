"use client"

import { useState } from "react"
import Image from "next/image"

interface GalleryImageProps {
  src: string
  alt: string
  width: number
  height: number
  index: number
  currentIndex: number
}

export function GalleryImage({ src, alt, width, height, index, currentIndex }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  const distance = currentIndex === -1 ? 0 : Math.abs(currentIndex - index)
  const isActive = currentIndex === -1 ? true : distance < 2

  return (
    <div
      className="relative flex-shrink-0 transition-all duration-1000 ease-in-out hover:scale-105 hover:z-50 group"
      style={{
        opacity: isActive ? 1 : 0.8,
      }}
    >
      {/* Classic Museum Gilt Frame */}
      <div
        className="relative p-8 md:p-12 flex items-center justify-center bg-[#1a0f0f]"
        style={{
          width: `calc(var(--img-width, ${width}px) + clamp(60px, 10vw, 120px))`,
          height: `calc(var(--img-height, ${height}px) + clamp(60px, 10vw, 120px))`,
        }}
      >
        {/* Outer Frame Shadow & Depth */}
        <div className="absolute inset-0 bg-[#4d3a12] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] rounded-sm" />
        
        {/* Main Carved Frame (Rich Gold/Bronze) */}
        <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] border-[8px] md:border-[16px] border-[#8e6d13] shadow-2xl overflow-hidden">
          {/* Subtle Gilded Texture */}
          <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')]" />
        </div>

        {/* Deep Beveled Inner Edge (Classic Museum Style) */}
        <div className="absolute inset-[20px] md:inset-[34px] border-[6px] md:border-[12px] border-[#59421a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
        
        {/* Black Velvet Liner (Matte effect) */}
        <div className="absolute inset-[28px] md:inset-[46px] bg-[#0a0a0a] border-[4px] md:border-[8px] border-[#1a0f0f] shadow-inner" />

        {/* The Actual Image Container */}
        <div className="absolute inset-[36px] md:inset-[62px] overflow-hidden bg-black shadow-[inset_0_0_40px_rgba(0,0,0,1)]">
          {!isLoaded && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
          
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover w-full h-full transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
          
          {/* Canvas texture and heavy museum vignette */}
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]" />
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none" />
        </div>

        {/* Corner Miter Details (Authentic frame look) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#fcf6ba] opacity-30" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#fcf6ba] opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4d3a12] opacity-50" />
          <div className="absolute top-0 right-0 w-[2px] h-full bg-[#4d3a12] opacity-50" />
        </div>

        {/* Antique Corner Reliefs (Subtle, not circular) */}
        {[
          "top-0 left-0 border-t-4 md:border-t-8 border-l-4 md:border-l-8",
          "top-0 right-0 border-t-4 md:border-t-8 border-r-4 md:border-r-8",
          "bottom-0 left-0 border-b-4 md:border-b-8 border-l-4 md:border-l-8",
          "bottom-0 right-0 border-b-4 md:border-b-8 border-r-4 md:border-r-8"
        ].map((style, i) => (
          <div key={i} className={`absolute ${style} w-8 md:w-16 h-8 md:h-16 border-[#ffd700] opacity-40 mix-blend-screen pointer-events-none`} />
        ))}
      </div>

      {/* Classic Museum Label */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#fcf6ba] border border-[#aa771c] shadow-lg transform group-hover:scale-105 transition-all">
        <div className="text-[10px] tracking-[0.3em] text-[#2d1b1b] font-serif font-bold uppercase text-center">
          Collection {index + 1}
        </div>
      </div>
    </div>
  )
}
