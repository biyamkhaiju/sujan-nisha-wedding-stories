import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { GalleryFilter, WeddingPhoto } from "@/data/weddingPhotos";
import { CornerFiligree } from "./Ornaments";

const ASPECT_CLASSES: Record<WeddingPhoto["aspect"], string> = {
  portrait: "aspect-[3/4]",
  "portrait-soft": "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  "landscape-tall": "aspect-[4/3]",
};

interface MasonryGalleryProps {
  photos: readonly WeddingPhoto[];
  activeCategory: GalleryFilter;
  onSelectPhoto: (index: number) => void;
}

export function MasonryGallery({
  photos,
  activeCategory,
  onSelectPhoto,
}: MasonryGalleryProps) {
  return (
    <section
      aria-label={`${activeCategory} wedding photographs`}
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3"
        >
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.055, 0.38),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 break-inside-avoid sm:mb-6"
            >
              <button
                type="button"
                onClick={() => onSelectPhoto(index)}
                aria-label={`Open ${photo.title} in fullscreen viewer`}
                className="gallery-frame-card group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-gold/55 bg-card p-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <div className="relative overflow-hidden rounded-lg bg-velvet-deep/10">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading={index < 4 ? "eager" : "lazy"}
                    className={`block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] ${ASPECT_CLASSES[photo.aspect]}`}
                  />

                  <div className="pointer-events-none absolute inset-0 border border-gold/25 rounded-lg" />

                  <div className="opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                    <CornerFiligree position="top-left" />
                    <CornerFiligree position="top-right" />
                    <CornerFiligree position="bottom-left" />
                    <CornerFiligree position="bottom-right" />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-velvet-deep/90 via-velvet-deep/45 to-transparent px-4 pt-12 pb-3.5 opacity-95 transition-opacity duration-400 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                    <div className="min-w-0">
                      <span className="block font-sans text-[11px] font-medium tracking-[0.2em] text-gold-bright uppercase">
                        {photo.category}
                      </span>
                      <figcaption className="truncate font-serif text-lg font-medium text-ivory sm:text-xl">
                        {photo.title}
                      </figcaption>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 bg-velvet/75 text-gold-bright backdrop-blur-xs">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.figure>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}