import { motion } from "framer-motion";
import {
  COUPLE_NAMES,
  GALLERY_SUBTITLE,
  HERO_BANNER_IMAGE,
} from "@/data/weddingPhotos";
import { DiamondAccent, IntertwinedRings, LotusIcon, OmEmblem } from "./Ornaments";

export function WeddingHero({ totalPhotos }: { totalPhotos: number }) {
  return (
    <header className="relative isolate overflow-hidden bg-velvet-deep text-ivory">
      <motion.div
        initial={{ scale: 1.06, opacity: 0.78 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20"
      >
        <img
          src={HERO_BANNER_IMAGE}
          alt="Sujan and Nisha in traditional Hindu wedding attire standing forehead to forehead"
          className="h-full w-full object-cover object-[80%_20%] sm:object-[76%_24%]"
        />
      </motion.div>

      <div className="hero-velvet-scrim absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-velvet-deep/35 sm:hidden" />

      <div className="mx-auto max-w-7xl px-5 pt-5 pb-14 sm:px-8 sm:pt-7 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-gold/25 pb-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5 text-gold-bright">
            <IntertwinedRings className="h-6 w-9 shrink-0" />
            <span className="truncate font-script text-2xl tracking-wide sm:text-3xl">
              {COUPLE_NAMES}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-gold-bright/90">
            <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-gold/70 sm:block" />
            <span className="font-serif text-xs tracking-[0.24em] text-gold-bright/85 uppercase">
              {totalPhotos} Moments
            </span>
            <DiamondAccent className="h-1.5 w-1.5 text-gold" />
            <OmEmblem className="text-gold-bright" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-xl sm:mt-16 lg:mt-20"
        >
          <h1 className="gold-text-gradient font-script text-6xl leading-[1.08] drop-shadow-sm sm:text-7xl lg:text-8xl">
            {COUPLE_NAMES}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-gold">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/80 to-gold sm:w-24" />
            <LotusIcon className="h-5 w-8 shrink-0 text-gold-bright" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-gold/80 to-gold sm:w-24" />
          </div>

          <p className="mt-3 font-serif text-sm font-medium tracking-[0.3em] text-ivory/95 uppercase sm:text-base">
            Wedding Photo Gallery
          </p>

          <p className="mt-3.5 max-w-md font-serif text-lg leading-relaxed italic text-gold-bright/90 sm:text-xl">
            “{GALLERY_SUBTITLE}”
          </p>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="h-1.5 w-full bg-gradient-to-r from-gold-deep via-gold-bright to-gold-deep opacity-90"
      />
    </header>
  );
}