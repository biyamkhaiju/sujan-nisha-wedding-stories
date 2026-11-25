import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryFilterBar } from "@/components/gallery/CategoryFilterBar";
import { FullscreenLightbox } from "@/components/gallery/FullscreenLightbox";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import {
  DiamondAccent,
  FooterSwirl,
  HeartSwirlFlourish,
  LotusIcon,
} from "@/components/gallery/Ornaments";
import { WeddingHero } from "@/components/gallery/WeddingHero";
import {
  COUPLE_NAMES,
  CRIMSON_SILK_IMAGE,
  GALLERY_SUBTITLE,
  ROSES_LEFT_IMAGE,
  ROSES_RIGHT_IMAGE,
  WEDDING_PHOTOS,
  filterPhotosByCategory,
  type GalleryFilter,
} from "@/data/weddingPhotos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${COUPLE_NAMES} — Wedding Photo Gallery` },
      { name: "description", content: GALLERY_SUBTITLE },
      { property: "og:title", content: `${COUPLE_NAMES} — Wedding Photo Gallery` },
      { property: "og:description", content: GALLERY_SUBTITLE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const filteredPhotos = useMemo(
    () => filterPhotosByCategory(WEDDING_PHOTOS, activeCategory),
    [activeCategory],
  );

  const handleSelectCategory = (category: GalleryFilter) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  const handleScrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="parchment-surface flex min-h-screen flex-col overflow-x-clip">
      <WeddingHero
        onScrollToGallery={handleScrollToGallery}
        onOpenAbout={() => setAboutOpen(true)}
      />

      <div className="relative flex flex-1 flex-col">
        <img
          src={ROSES_LEFT_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -left-7 z-20 w-28 select-none drop-shadow-md sm:-top-20 sm:-left-6 sm:w-40 lg:-top-28 lg:-left-6 lg:w-52"
        />
        <img
          src={ROSES_RIGHT_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-7 z-20 w-28 select-none drop-shadow-md sm:-top-20 sm:-right-6 sm:w-40 lg:-top-28 lg:-right-6 lg:w-52"
        />

        <main className="relative z-10 flex-1">
          <CategoryFilterBar
            activeCategory={activeCategory}
            onSelect={handleSelectCategory}
          />

          <MasonryGallery
            photos={filteredPhotos}
            activeCategory={activeCategory}
            onSelectPhoto={setSelectedIndex}
          />
        </main>

        <img
          src={ROSES_LEFT_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 -left-7 z-20 w-28 select-none drop-shadow-md sm:bottom-2 sm:-left-6 sm:w-36 lg:bottom-2 lg:-left-5 lg:w-48"
        />
        <img
          src={CRIMSON_SILK_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-16 z-10 w-56 -scale-x-100 select-none opacity-95 sm:-left-12 sm:w-72 lg:-left-8 lg:w-96"
        />
        <img
          src={CRIMSON_SILK_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 z-20 w-44 select-none sm:w-64 lg:w-80 xl:w-96"
        />

        <footer className="relative z-30 mx-auto w-full max-w-[1400px] px-6 pt-2 pb-6 sm:px-10 sm:pb-7">
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
            <div aria-hidden="true" className="hidden md:block" />

            <div className="flex items-center justify-center gap-3 text-gold-deep">
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-gold-deep/65 to-gold-deep sm:w-28" />
              <DiamondAccent className="h-1.5 w-1.5 text-primary/80" />
              <LotusIcon className="h-6 w-10 text-primary" />
              <DiamondAccent className="h-1.5 w-1.5 text-primary/80" />
              <span className="h-px w-20 bg-gradient-to-l from-transparent via-gold-deep/65 to-gold-deep sm:w-28" />
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-end md:pr-24 lg:pr-32">
              <p className="font-serif text-xl italic text-primary sm:text-2xl">
                A beginning of forever
              </p>
              <FooterSwirl className="h-3.5 w-12 shrink-0 text-primary/85" />
            </div>
          </div>
        </footer>
      </div>

      <FullscreenLightbox
        photos={filteredPhotos}
        activeIndex={selectedIndex}
        onChangeIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />

      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`About ${COUPLE_NAMES}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAboutOpen(false)}
            className="fixed inset-0 z-50 grid place-items-center bg-velvet-deep/80 p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="parchment-surface relative w-full max-w-md rounded-2xl border border-gold-deep/75 p-7 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setAboutOpen(false)}
                aria-label="Close about note"
                className="absolute top-3.5 right-3.5 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-gold-deep/45 bg-card/85 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <LotusIcon className="mx-auto h-6 w-10 text-primary" />
              <h2 className="mt-2 font-script text-4xl text-primary">{COUPLE_NAMES}</h2>
              <p className="mt-1 font-serif text-xs tracking-[0.24em] text-gold-deep uppercase">
                Hindu Wedding Celebration
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed italic text-foreground/85">
                “{GALLERY_SUBTITLE}”
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A curated keepsake of our sacred mandap rituals, elders&apos; blessings,
                beloved family portraits, and joyful evenings surrounded by our dearest friends.
              </p>
              <HeartSwirlFlourish className="mx-auto mt-4 h-6 w-24 text-gold-deep" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
