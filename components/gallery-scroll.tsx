"use client"

import { GalleryImage } from "./gallery-image"

const IMAGES_COUNT = 20

export function GalleryScroll() {
  // Generate deterministic sizes for variety (avoid hydration mismatch)
  const images = Array.from({ length: IMAGES_COUNT }, (_, i) => {
    const heights = [400, 450, 500, 550, 600]
    const widths = [350, 400, 450, 500]

    return {
      id: i + 1,
      // Use index to pick values consistently between server and client
      width: widths[(i * 13) % widths.length],
      height: heights[(i * 17) % heights.length],
    }
  })

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-background/90 to-transparent">
        <h1 className="font-serif text-2xl font-light tracking-wider text-primary">MOMENTOS</h1>
        <div className="flex items-center gap-8 text-sm tracking-widest text-muted-foreground">
          <span className="hidden md:block">EXHIBITION</span>
          <span className="hidden md:block">2026</span>
        </div>
      </header>

      {/* Title Section */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase animate-pulse">Infinite Journey</p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-[#f3e5ab] mb-6 text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Royal Gallery
          </h2>
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">Flowing through time</p>
        </div>
      </div>

      {/* Infinite Gallery Container */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex gap-32 px-12 animate-infinite-scroll">
          {/* Duplicate set for infinite loop */}
          {[...images, ...images].map((img, index) => (
            <GalleryImage
              key={`${img.id}-${index}`}
              src={`https://picsum.photos/${img.width}/${img.height}?random=${img.id}`}
              alt={`Gallery image ${img.id}`}
              width={img.width}
              height={img.height}
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
            transform: translateX(calc(-50% - 1.5rem)); /* Adjust for half of the gap if needed, but -50% is standard for duplicated content */
          }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 120s linear infinite;
        }
        /* Pause on hover for better UX */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
