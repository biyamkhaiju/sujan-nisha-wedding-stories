import { motion } from "framer-motion";
import { Flame, Heart, LayoutGrid, Smile, Sparkles, Users } from "lucide-react";
import type { ComponentType } from "react";
import type { GalleryFilter } from "@/data/weddingPhotos";
import { GALLERY_CATEGORIES } from "@/data/weddingPhotos";
import { DiamondAccent } from "./Ornaments";

const CATEGORY_ICONS: Record<GalleryFilter, ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  Couple: Heart,
  Family: Users,
  Ceremony: Flame,
  Friends: Smile,
  Celebrations: Sparkles,
};

interface CategoryFilterBarProps {
  activeCategory: GalleryFilter;
  onSelect: (category: GalleryFilter) => void;
  counts: Record<GalleryFilter, number>;
}

export function CategoryFilterBar({
  activeCategory,
  onSelect,
  counts,
}: CategoryFilterBarProps) {
  return (
    <nav aria-label="Wedding photo categories" className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 lg:px-12">
      <div className="flex items-center justify-center gap-4">
        <div
          aria-hidden="true"
          className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold/80 lg:block"
        />
        <DiamondAccent className="hidden h-2 w-2 shrink-0 text-gold-deep lg:block" />

        <div
          role="tablist"
          aria-label="Filter wedding photographs"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {GALLERY_CATEGORIES.map((category, index) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = activeCategory === category;
            return (
              <div key={category} className="flex items-center gap-2 sm:gap-2.5">
                {index > 0 && (
                  <DiamondAccent className="hidden h-1.5 w-1.5 shrink-0 text-gold-deep/75 md:block" />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelect(category)}
                  className={`relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-serif text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5 sm:py-2.5 sm:text-base ${
                    isActive
                      ? "border-primary text-primary-foreground"
                      : "border-gold/55 bg-card/85 text-foreground/85 hover:border-gold-deep hover:bg-accent/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="filter-pill-active absolute inset-0 rounded-full"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  <span className="relative z-10">{category}</span>
                  <span
                    className={`relative z-10 text-xs font-sans ${
                      isActive ? "text-gold-bright/95" : "text-muted-foreground"
                    }`}
                  >
                    {counts[category]}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <DiamondAccent className="hidden h-2 w-2 shrink-0 text-gold-deep lg:block" />
        <div
          aria-hidden="true"
          className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold/80 lg:block"
        />
      </div>
    </nav>
  );
}