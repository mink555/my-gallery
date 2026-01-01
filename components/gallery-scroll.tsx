"use client"

import { GalleryImage } from "./gallery-image"
import { useRef, useState, useEffect } from "react"

const IMAGES_COUNT = 20

export function GalleryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Generate deterministic sizes for variety
  const images = Array.from({ length: IMAGES_COUNT }, (_, i) => {
    const heights = [220, 250, 280, 310, 340]
    const widths = [250, 280, 310, 340]
    
    const titles = [
      "Whispers of Light", "Golden Silence", "Autumn Reverie", "Midnight Sonata",
      "Eternal Grace", "Oceanic Dream", "Urban Solitude", "Ethereal Morning",
      "Shadows of Time", "Petals in Rain", "Rustic Soul", "Velvet Twilight",
      "Infinite Horizon", "Serene Soul", "Faded Memories", "Pure Harmony",
      "Distant Echoes", "Morning Dew", "Secret Path", "Ancient Glow"
    ]
    const baseYears = [2021, 2022, 2023, 2024, 2025]
    const randomYear = baseYears[(i * 13 + 7) % baseYears.length]

    return {
      id: i + 1,
      width: widths[(i * 13) % widths.length],
      height: heights[(i * 17) % heights.length],
      title: titles[(i * 11) % titles.length],
      year: randomYear
    }
  })

  // Sync slider with scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(progress)
    }
  }

  // Handle manual slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoScrolling(false) // Pause auto-scroll when user interacts
    const value = parseFloat(e.target.value)
    setScrollProgress(value)
    
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current
      const scrollAmount = (value / 100) * (scrollWidth - clientWidth)
      scrollRef.current.scrollLeft = scrollAmount
    }
  }

  return (
    <div className="relative w-full min-h-[150vh] bg-[#050505] flex flex-col selection:bg-[#d4af37]/30">
      {/* Dynamic Lighting Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(20,20,20,0)_0%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Grainy Texture */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-black/95 to-transparent backdrop-blur-[2px]">
        <div className="flex flex-col">
          <h1 className="font-serif text-xl md:text-2xl font-light tracking-[0.3em] text-[#d4af37] drop-shadow-sm">MinKyong Hwarang</h1>
          <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-[#8e6d13] uppercase opacity-70">Privé & Confidential</span>
        </div>
        <div className="flex items-center gap-6 text-[9px] md:text-[10px] tracking-[0.4em] text-[#8e6d13] uppercase">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span>Members Only</span>
          </div>
          <span className="px-3 py-1 border border-[#d4af37]/30 rounded-full text-[#d4af37]">Est. 2026</span>
        </div>
      </header>

      {/* Hero Title Section */}
      <section className="relative z-20 pt-[25vh] pb-[10vh] flex flex-col items-center pointer-events-none text-center">
        <p className="text-[9px] md:text-[10px] tracking-[0.7em] text-[#8e6d13] mb-8 uppercase font-light">The Exclusive Collection</p>
        <div className="relative inline-block mb-12">
          <h2 className="font-serif text-5xl md:text-9xl font-light text-[#fcf6ba] mb-6 leading-tight tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,1)] opacity-95 px-4">
            Royal <span className="italic font-normal">Heritage</span>
          </h2>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-[#d4af37] rotate-45 bg-black" />
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.5em] text-[#a68a3a] uppercase font-light leading-relaxed max-w-md mx-auto px-6">
          A sanctuary for the few who appreciate the art of timeless elegance.
        </p>
      </section>

      {/* Gallery Section with Manual Control */}
      <section className="relative z-20 w-full flex flex-col items-center my-12">
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className={`flex gap-16 md:gap-48 px-[20vw] overflow-x-auto no-scrollbar py-20 w-full scroll-smooth ${isAutoScrolling ? 'animate-infinite-scroll' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...images, ...images].map((img, index) => (
            <GalleryImage
              key={`${img.id}-${index}`}
              src={`https://picsum.photos/${img.width}/${img.height}?random=${img.id}`}
              alt={img.title}
              width={img.width}
              height={img.height}
              title={img.title}
              year={img.year}
              index={index % IMAGES_COUNT}
              currentIndex={-1}
            />
          ))}
        </div>

        {/* Elegant Scrollbar / Slider */}
        <div className="w-full max-w-2xl px-12 mt-12 flex flex-col items-center gap-4">
          <div className="flex justify-between w-full text-[9px] tracking-[0.4em] text-[#8e6d13] uppercase font-serif mb-1">
            <span>Archive 01</span>
            <button 
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="text-[#d4af37] hover:opacity-80 transition-opacity"
            >
              {isAutoScrolling ? 'Manual Mode' : 'Resume Auto-Flow'}
            </button>
            <span>Archive 20</span>
          </div>
          
          <div className="relative w-full h-[20px] flex items-center group">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={scrollProgress}
              onChange={handleSliderChange}
              className="w-full h-[1px] bg-[#d4af37]/20 appearance-none cursor-pointer outline-none focus:ring-0
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:h-[2px] 
                [&::-webkit-slider-thumb]:bg-[#d4af37] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.8)]
                [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:h-[2px] [&::-moz-range-thumb]:bg-[#d4af37] 
                [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none"
            />
            {/* Minimalist marker underneath */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-[10px] w-[1px] bg-[#d4af37]/40 pointer-events-none"
              style={{ left: `${scrollProgress}%` }}
            />
          </div>
          
          <p className="text-[8px] tracking-[0.3em] text-[#59421a] uppercase mt-2 italic">
            Swipe or slide to navigate the collection
          </p>
        </div>
      </section>

      {/* Spacer to allow scrolling down to footer */}
      <div className="h-[20vh]" />

      {/* Footer / Private Gallery Info */}
      <footer className="relative z-30 w-full px-6 md:px-16 pb-20 pt-32 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-[#d4af37]/20 pt-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#d4af37]" />
                <span className="text-[10px] tracking-[0.6em] text-[#d4af37] uppercase font-serif">Inquiry</span>
              </div>
              <div className="space-y-2 text-[11px] md:text-[12px] tracking-[0.2em] text-[#8e6d13] font-light italic">
                <p className="hover:text-[#d4af37] transition-colors cursor-pointer">concierge@minkyong-hwarang.com</p>
                <p>Private Line: +82 2 1234 5678</p>
              </div>
              <p className="text-[9px] tracking-[0.3em] text-[#59421a] leading-relaxed">
                Admissions by invitation or prior appointment only. <br />
                Strict confidentiality is maintained for all acquisitions.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <div className="font-serif text-2xl tracking-[0.4em] text-[#d4af37] mb-3 uppercase font-light">MinKyong Hwarang</div>
                <div className="flex items-center justify-center gap-3 text-[8px] tracking-[0.5em] text-[#59421a] uppercase">
                  <span>Seoul</span>
                  <span className="w-1 h-1 rounded-full bg-[#59421a]" />
                  <span>Paris</span>
                  <span className="w-1 h-1 rounded-full bg-[#59421a]" />
                  <span>London</span>
                </div>
              </div>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
            </div>

            <div className="space-y-6 flex flex-col items-end text-right">
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.6em] text-[#d4af37] uppercase font-serif">Atelier</span>
                <div className="w-12 h-[1px] bg-[#d4af37]" />
              </div>
              <div className="space-y-2 text-[11px] md:text-[12px] tracking-[0.2em] text-[#8e6d13] font-light uppercase">
                <p>Tue &mdash; Sat / 10:00 &mdash; 18:00</p>
                <p className="text-[#d4af37]/60 text-[10px]">Private Viewing by Reservation</p>
              </div>
              <div className="flex gap-4 opacity-60">
                <div className="w-4 h-4 border border-[#d4af37] rounded-full" />
                <div className="w-4 h-4 border border-[#d4af37] rounded-full" />
                <div className="w-4 h-4 border border-[#d4af37] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-[#d4af37]/5 text-center">
            <p className="text-[8px] tracking-[0.6em] text-[#59421a] uppercase opacity-40 italic">
              This experience is intended for registered patrons of MinKyong Hwarang.
            </p>
            <p className="mt-4 text-[7px] tracking-[0.4em] text-[#59421a] uppercase opacity-30">
              &copy; 2026 MH Group. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 240s linear infinite;
          will-change: transform;
        }
        /* Remove the pause-on-hover that might be causing freezing/interruption on touch */
        /* .animate-infinite-scroll:hover {
          animation-play-state: paused;
        } */
      `}</style>
    </div>
  )
}
