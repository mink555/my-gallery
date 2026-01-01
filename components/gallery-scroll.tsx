"use client"

import { GalleryImage } from "./gallery-image"

const IMAGES_COUNT = 20

export function GalleryScroll() {
  // Generate deterministic sizes for variety (avoid hydration mismatch)
  const images = Array.from({ length: IMAGES_COUNT }, (_, i) => {
    const heights = [300, 350, 400, 450, 500]
    const widths = [250, 280, 310, 340]
    
    const titles = [
      "Whispers of Light", "Golden Silence", "Autumn Reverie", "Midnight Sonata",
      "Eternal Grace", "Oceanic Dream", "Urban Solitude", "Ethereal Morning",
      "Shadows of Time", "Petals in Rain", "Rustic Soul", "Velvet Twilight",
      "Infinite Horizon", "Serene Soul", "Faded Memories", "Pure Harmony",
      "Distant Echoes", "Morning Dew", "Secret Path", "Ancient Glow"
    ]
    const years = [2021, 2022, 2023, 2024, 2025]

    return {
      id: i + 1,
      width: widths[(i * 13) % widths.length],
      height: heights[(i * 17) % heights.length],
      title: titles[i % titles.length],
      year: years[(i * 7) % years.length]
    }
  })

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Dynamic Lighting Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Grainy Texture for high-end look */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="font-serif text-2xl font-light tracking-[0.2em] text-[#d4af37] drop-shadow-sm">MinKyong Hwarang</h1>
        <div className="flex items-center gap-8 text-[10px] tracking-[0.4em] text-[#8e6d13] uppercase">
          <span className="hidden md:block">Private Collection</span>
          <span className="hidden md:block">Est. 2026</span>
        </div>
      </header>

      {/* Title Section */}
      <div className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center px-4 max-w-4xl">
          <p className="text-[10px] tracking-[0.6em] text-[#8e6d13] mb-8 uppercase animate-pulse font-light">The Eternal Moment</p>
          <div className="relative inline-block">
            <h2 className="font-serif text-5xl md:text-9xl font-light text-[#fcf6ba] mb-4 leading-tight tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,1)] opacity-95">
              Royal <span className="italic font-normal">Heritage</span>
            </h2>
            {/* Elegant underlining ornament */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 border border-[#d4af37] rotate-45 bg-black" />
          </div>
          <p className="mt-12 text-xs tracking-[0.4em] text-[#a68a3a] uppercase font-light leading-loose">
            Curated by <br className="md:hidden" />
            <span className="text-[#d4af37] tracking-[0.6em]">MinKyong Hwarang</span>
          </p>
        </div>
      </div>

      {/* Infinite Gallery Container */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex gap-20 md:gap-48 px-32 animate-infinite-scroll">
          {/* Duplicate set for infinite loop */}
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
              currentIndex={-1} // Disable distance logic for infinite scroll
            />
          ))}
        </div>
      </div>

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
