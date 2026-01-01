"use client"

import { useState } from "react"
import Image from "next/image"

interface GalleryImageProps {
  src: string
  alt: string
  width: number
  height: number
  title: string
  year: number
  index: number
  currentIndex: number
}

export function GalleryImage({ src, alt, width, height, title, year, index, currentIndex }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  const distance = currentIndex === -1 ? 0 : Math.abs(currentIndex - index)
  const isActive = currentIndex === -1 ? true : distance < 2

  return (
    <div
      className="relative flex-shrink-0 transition-all duration-1000 ease-in-out hover:scale-[1.02] hover:z-50 group"
      style={{
        opacity: isActive ? 1 : 0.6,
      }}
    >
      {/* Classic Museum Gilt Frame */}
      <div
        className="relative p-6 md:p-14 flex items-center justify-center bg-[#1a0f0f] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
        style={{
          width: `calc(var(--img-width, ${width}px) + clamp(50px, 12vw, 140px))`,
          height: `calc(var(--img-height, ${height}px) + clamp(50px, 12vw, 140px))`,
        }}
      >
        {/* Outer Frame Shadow & Depth */}
        <div className="absolute inset-0 bg-[#3a2a0d] rounded-sm border border-[#59421a]/30" />
        
        {/* Main Carved Frame (Rich Gold/Bronze) */}
        <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-[#8e6d13] via-[#d4af37] to-[#59421a] border-[6px] md:border-[18px] border-[#735910] shadow-2xl overflow-hidden">
          {/* Subtle Gilded Texture */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')]" />
          {/* Light Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Deep Beveled Inner Edge (Classic Museum Style) */}
        <div className="absolute inset-[18px] md:inset-[38px] border-[4px] md:border-[10px] border-[#4d3a12] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
        
        {/* Black Velvet Liner (Matte effect) */}
        <div className="absolute inset-[24px] md:inset-[52px] bg-[#080808] border-[2px] md:border-[6px] border-[#1a1105] shadow-inner" />

        {/* The Actual Image Container */}
        <div className="absolute inset-[30px] md:inset-[70px] overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {!isLoaded && <div className="absolute inset-0 bg-zinc-950 animate-pulse" />}
          
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover w-full h-full transition-all duration-1000 group-hover:scale-110 ${isLoaded ? "opacity-90 contrast-125 saturate-[0.85]" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
          
          {/* Artistic Overlays */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)] pointer-events-none" />
          
          {/* Glossy Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* corner details */}
        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0"
        ].map((pos, i) => (
          <div key={pos} className={`absolute ${pos} w-10 h-10 md:w-20 md:h-20 pointer-events-none`}>
            <div className="absolute inset-0 border-[#d4af37]/30 border-2 m-2 opacity-50" />
          </div>
        ))}
      </div>

      {/* Museum Label */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 px-4 py-3 bg-transparent group-hover:bg-[#0a0a0a]/20 backdrop-blur-[2px] transition-all duration-1000 min-w-[200px]">
        <div className="flex flex-col items-center gap-1.5">
          {/* Decorative Ornament Above Title */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-1" />
          
          <div className="text-[11px] md:text-[12px] tracking-[0.6em] text-[#d4af37] font-serif uppercase text-center font-light leading-relaxed">
            {title}
          </div>
          
          <div className="flex items-center gap-3 w-full">
            <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#8e6d13]/40" />
            <div className="text-[8px] tracking-[0.4em] text-[#8e6d13] font-serif uppercase text-center opacity-80 italic">
              {year}
            </div>
            <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#8e6d13]/40" />
          </div>
          
          <div className="text-[7px] tracking-[0.3em] text-[#59421a] font-serif uppercase text-center opacity-60">
            MinKyong Hwarang Archive
          </div>
        </div>
      </div>
    </div>
  )
}
