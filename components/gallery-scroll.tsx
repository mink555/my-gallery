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

      {/* Footer / Gallery Info */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 border-t border-[#d4af37]/20 pt-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-[1px] bg-[#d4af37]" />
              <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase font-serif">Contact</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px] tracking-[0.2em] text-[#8e6d13] font-light italic">
              <p>contact@minkyong-hwarang.com</p>
              <p>+82 2 1234 5678</p>
            </div>
          </div>

          <div className="text-center hidden lg:block">
            <div className="font-serif text-lg tracking-[0.3em] text-[#d4af37] mb-2">MinKyong Hwarang</div>
            <p className="text-[9px] tracking-[0.4em] text-[#59421a] uppercase">Seoul &bull; Paris &bull; New York</p>
          </div>

          <div className="flex flex-col items-end gap-4 text-right">
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase font-serif">Hours</span>
              <div className="w-10 h-[1px] bg-[#d4af37]" />
            </div>
            <div className="flex flex-col gap-1 text-[11px] tracking-[0.2em] text-[#8e6d13] font-light uppercase">
              <p>Tue &mdash; Sat / 11:00 &mdash; 19:00</p>
              <p>Sunday by Appointment only</p>
            </div>
          </div>
        </div>
        
        {/* Subtle bottom-most bar */}
        <div className="mt-8 text-center">
          <p className="text-[8px] tracking-[0.5em] text-[#59421a] uppercase opacity-50 italic">
            &copy; 2026 MinKyong Hwarang. All Rights Reserved.
          </p>
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
