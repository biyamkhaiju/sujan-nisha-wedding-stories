import { motion } from "framer-motion";
import { Heart, LayoutGrid, Smile, Sparkles, Users } from "lucide-react";
import type { ComponentType } from "react";
import type { GalleryFilter } from "@/data/weddingPhotos";
import { GALLERY_CATEGORIES } from "@/data/weddingPhotos";
import { DiamondAccent, IntertwinedRings } from "./Ornaments";

const CATEGORY_ICONS: Record<GalleryFilter, ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  Couple: Heart,
  Family: Users,
  Ceremony: IntertwinedRings,
  Friends: Smile,
  Celebrations: Sparkles,
};

interface CategoryFilterBarProps {
  activeCategory: GalleryFilter;
  onSelect: (category: GalleryFilter) => void;
}

export function CategoryFilterBar({
  activeCategory,
  onSelect,
}: CategoryFilterBarProps) {
  return (
    <nav
      id="gallery"
      aria-label="Wedding photo categories"
      className="relative z-30 mx-auto max-w-[1400px] px-4 pt-4 pb-5 sm:px-8 sm:pt-5 sm:pb-6 lg:px-14"
    >
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
        <div aria-hidden="true" className="hidden flex-1 items-center gap-2 md:flex">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/45 to-gold-deep/70" />
          <DiamondAccent className="h-2.5 w-2.5 shrink-0 text-primary/85" />
        </div>

        <div
          role="tablist"
          aria-label="Filter wedding photographs"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {GALLERY_CATEGORIES.map((category, index) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = activeCategory === category;
            return (
              <div key={category} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <DiamondAccent className="hidden h-1.5 w-1.5 shrink-0 text-primary/70 sm:block" />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelect(category)}
                  className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-serif text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:gap-2 sm:px-5 sm:py-1.5 sm:text-[15px] ${
                    isActive
                      ? "border-primary text-primary-foreground"
                      : "border-gold-deep/50 bg-card/90 text-foreground/90 hover:border-primary/60 hover:bg-accent/80 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="filter-pill-active absolute inset-0 rounded-full"
                    />
                  )}
                  <Icon
                    className={`relative z-10 shrink-0 ${
                      category === "Ceremony" ? "h-3.5 w-5" : "h-3.5 w-3.5"
                    } ${isActive ? "text-primary-foreground" : "text-primary/85"}`}
                  />
                  <span className="relative z-10">{category}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="hidden flex-1 items-center gap-2 md:flex">
          <DiamondAccent className="h-2.5 w-2.5 shrink-0 text-primary/85" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-deep/45 to-gold-deep/70" />
        </div>
      </div>
    </nav>
  );
}