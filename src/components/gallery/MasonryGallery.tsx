import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { GalleryFilter, WeddingPhoto } from "@/data/weddingPhotos";
import { CornerFiligree } from "./Ornaments";

const SHOWCASE_SLOT_CLASSES = [
  "md:col-start-1 md:row-start-1 md:row-span-2 aspect-[3/4] md:aspect-auto md:h-full",
  "md:col-start-2 md:row-start-1 aspect-[16/10] md:aspect-auto md:h-full",
  "md:col-start-3 md:row-start-1 aspect-[16/10] md:aspect-auto md:h-full",
  "md:col-start-2 md:row-start-2 aspect-[16/10] md:aspect-auto md:h-full",
  "md:col-start-3 md:row-start-2 aspect-[16/10] md:aspect-auto md:h-full",
  "md:col-start-4 md:row-start-1 md:row-span-2 aspect-[3/4] md:aspect-auto md:h-full",
] as const;

interface MasonryGalleryProps {
  photos: readonly WeddingPhoto[];
  activeCategory: GalleryFilter;
  onSelectPhoto: (index: number) => void;
}

function GalleryPhotoFrame({
  photo,
  index,
  onSelect,
  className = "",
  imgClassName = "h-full w-full",
}: {
  photo: WeddingPhoto;
  index: number;
  onSelect: () => void;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Open ${photo.title} in fullscreen viewer`}
        className="gallery-frame-card group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl border-[1.5px] border-gold-deep/75 bg-velvet-deep/10 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <img
          src={photo.src}
          alt={photo.title}
          loading={index < 6 ? "eager" : "lazy"}
          className={`warm-photo-grade block object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] ${imgClassName}`}
        />

        <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-gold-bright/30" />

        <div className="opacity-85 transition-opacity duration-500 group-hover:opacity-100">
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-velvet-deep/90 via-velvet-deep/40 to-transparent px-3.5 pt-10 pb-3 opacity-0 transition-opacity duration-350 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="min-w-0">
            <span className="block font-sans text-[10px] font-medium tracking-[0.2em] text-gold-bright uppercase">
              {photo.category}
            </span>
            <figcaption className="truncate font-serif text-base font-medium text-ivory sm:text-lg">
              {photo.title}
            </figcaption>
          </div>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/55 bg-velvet/75 text-gold-bright backdrop-blur-xs">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </motion.figure>
  );
}

export function MasonryGallery({ photos, activeCategory, onSelectPhoto }: MasonryGalleryProps) {
  const isShowcaseAll = activeCategory === "All" && photos.length >= 6;
  const featuredPhotos = isShowcaseAll ? photos.slice(0, 6) : [];
  const remainingPhotos = isShowcaseAll ? photos.slice(6) : photos;

  return (
    <section
      aria-label={`${activeCategory} wedding photographs`}
      className="relative z-10 mx-auto max-w-[1400px] px-4 pb-6 sm:px-6 md:px-7 lg:px-10"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 lg:space-y-5"
        >
          {isShowcaseAll && (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:h-[365px] md:grid-cols-[1fr_1.34fr_1.02fr_1fr] md:grid-rows-2 lg:h-[470px] lg:gap-4 xl:h-[540px]">
              {featuredPhotos.map((photo, index) => (
                <GalleryPhotoFrame
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onSelect={() => onSelectPhoto(index)}
                  className={SHOWCASE_SLOT_CLASSES[index] ?? ""}
                />
              ))}
            </div>
          )}

          {isShowcaseAll ? (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-4 lg:gap-4">
              {remainingPhotos.map((photo, offset) => {
                const photoIndex = offset + 6;
                return (
                  <GalleryPhotoFrame
                    key={photo.id}
                    photo={photo}
                    index={photoIndex}
                    onSelect={() => onSelectPhoto(photoIndex)}
                    className="aspect-[4/3]"
                  />
                );
              })}
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
              {remainingPhotos.map((photo, index) => (
                <GalleryPhotoFrame
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onSelect={() => onSelectPhoto(index)}
                  className={photo.aspect.startsWith("portrait") ? "aspect-[3/4]" : "aspect-[4/3]"}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
