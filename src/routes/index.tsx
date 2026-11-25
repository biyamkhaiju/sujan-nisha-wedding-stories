import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CategoryFilterBar } from "@/components/gallery/CategoryFilterBar";
import { FullscreenLightbox } from "@/components/gallery/FullscreenLightbox";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { DiamondAccent, LotusIcon } from "@/components/gallery/Ornaments";
import { WeddingHero } from "@/components/gallery/WeddingHero";
import {
  COUPLE_NAMES,
  GALLERY_CATEGORIES,
  GALLERY_SUBTITLE,
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

  const filteredPhotos = useMemo(
    () => filterPhotosByCategory(WEDDING_PHOTOS, activeCategory),
    [activeCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<GalleryFilter, number>;
    for (const category of GALLERY_CATEGORIES) {
      counts[category] = filterPhotosByCategory(WEDDING_PHOTOS, category).length;
    }
    return counts;
  }, []);

  const handleSelectCategory = (category: GalleryFilter) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  return (
    <div className="parchment-surface flex min-h-screen flex-col">
      <WeddingHero totalPhotos={WEDDING_PHOTOS.length} />

      <main className="flex-1">
        <CategoryFilterBar
          activeCategory={activeCategory}
          onSelect={handleSelectCategory}
          counts={categoryCounts}
        />

        <MasonryGallery
          photos={filteredPhotos}
          activeCategory={activeCategory}
          onSelectPhoto={setSelectedIndex}
        />
      </main>

      <footer className="border-t border-gold/40 bg-ivory-soft/70 px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-serif text-sm tracking-[0.22em] text-foreground/75 uppercase">
            {COUPLE_NAMES}
          </p>

          <div className="flex items-center gap-3 text-gold-deep">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
            <DiamondAccent className="h-1.5 w-1.5" />
            <LotusIcon className="h-5 w-8 text-primary" />
            <DiamondAccent className="h-1.5 w-1.5" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
          </div>

          <p className="font-script text-2xl text-primary sm:text-3xl">
            A beginning of forever
          </p>
        </div>
      </footer>

      <FullscreenLightbox
        photos={filteredPhotos}
        activeIndex={selectedIndex}
        onChangeIndex={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  );
}
