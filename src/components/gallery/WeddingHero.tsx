import { motion } from "framer-motion";
import { COUPLE_NAMES, GALLERY_SUBTITLE, HERO_BANNER_IMAGE } from "@/data/weddingPhotos";
import {
  DiamondAccent,
  HeartSwirlFlourish,
  IntertwinedRings,
  LotusIcon,
  OmEmblem,
} from "./Ornaments";

interface WeddingHeroProps {
  onScrollToGallery: () => void;
  onOpenAbout: () => void;
}

export function WeddingHero({ onScrollToGallery, onOpenAbout }: WeddingHeroProps) {
  return (
    <header id="top" className="relative isolate overflow-hidden bg-velvet-deep text-ivory">
      <motion.div
        initial={{ scale: 1.04, opacity: 0.86 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20"
      >
        <img
          src={HERO_BANNER_IMAGE}
          alt="Sujan and Nisha in traditional Nepali Hindu wedding attire framed by carved wooden temple pillars"
          className="warm-photo-grade h-full w-full object-cover object-[68%_24%] sm:object-[58%_24%] md:object-[52%_24%]"
        />
      </motion.div>

      <div className="hero-velvet-scrim absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-velvet-deep/44 sm:hidden" />

      <div className="mx-auto flex min-h-[325px] max-w-[1440px] flex-col justify-between px-4 pt-3 pb-10 sm:min-h-[310px] sm:px-6 sm:pt-3.5 sm:pb-10 md:min-h-[360px] lg:min-h-[430px] lg:px-12 lg:pb-14 xl:min-h-[475px]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
          <div className="flex min-w-0 flex-col items-start">
            <a
              href="#top"
              className="flex items-center gap-1.5 text-gold-bright transition-opacity hover:opacity-90 sm:gap-2"
            >
              <IntertwinedRings className="h-5 w-7 shrink-0 sm:h-5 sm:w-8 lg:h-6 lg:w-9" />
              <span className="whitespace-nowrap py-1 pr-1.5 font-script text-[1.45rem] leading-[1.3] tracking-wide sm:text-[1.55rem] lg:text-[1.8rem]">
                {COUPLE_NAMES}
              </span>
            </a>
            <div
              aria-hidden="true"
              className="-mt-0.5 hidden items-center gap-1.5 pl-1 text-gold/75 sm:flex"
            >
              <span className="h-px w-24 bg-gradient-to-r from-gold-bright/80 via-gold/60 to-gold/30 md:w-32 lg:w-44" />
              <DiamondAccent className="h-1.5 w-1.5 shrink-0" />
            </div>
          </div>

          <nav
            aria-label="Primary"
            className="col-span-2 order-3 mt-1 flex items-center justify-center gap-4 sm:col-span-1 sm:order-2 sm:mt-0 sm:gap-5 lg:gap-7"
          >
            <a
              href="#top"
              className="font-serif text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-gold-bright lg:text-base"
            >
              Home
            </a>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={onScrollToGallery}
                className="nav-pill-gallery inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-bright/70 px-3.5 py-1 font-serif text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright lg:px-5 lg:py-1.5 lg:text-base"
              >
                <LotusIcon className="h-3.5 w-5 shrink-0 text-primary" />
                <span>Gallery</span>
              </button>
              <span
                aria-hidden="true"
                className="mt-1 h-px w-14 bg-gradient-to-r from-transparent via-gold-bright/80 to-transparent lg:w-16"
              />
            </div>
            <button
              type="button"
              onClick={onOpenAbout}
              className="cursor-pointer font-serif text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright lg:text-base"
            >
              About
            </button>
          </nav>

          <div className="order-2 flex shrink-0 items-center justify-end gap-2 text-gold-bright/95 sm:order-3 lg:gap-2.5">
            <span
              aria-hidden="true"
              className="hidden h-px w-12 bg-gradient-to-r from-transparent via-gold/60 to-gold-bright/85 sm:block md:w-20 lg:w-28"
            />
            <DiamondAccent className="hidden h-1.5 w-1.5 text-gold-bright sm:block" />
            <OmEmblem className="text-2xl text-gold-bright drop-shadow-xs sm:text-[1.7rem]" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-auto flex w-full max-w-lg flex-col items-center py-5 text-center sm:mx-0 sm:ml-[4%] sm:w-[54%] sm:py-4 md:ml-[9%] md:w-[46%] md:max-w-xl lg:ml-[12%] lg:w-[43%] lg:py-7"
        >
          <h1 className="gold-text-gradient px-3 py-1 font-script text-[2.95rem] leading-[1.22] sm:text-[3.35rem] md:text-[3.9rem] lg:text-[4.75rem] xl:text-[5.45rem]">
            {COUPLE_NAMES}
          </h1>

          <div className="mt-1 flex items-center justify-center gap-2.5 text-gold-bright">
            <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold/80 to-gold-bright sm:w-24" />
            <DiamondAccent className="h-1.5 w-1.5 text-gold-bright" />
            <LotusIcon className="h-4 w-7 shrink-0 text-gold-bright sm:h-5 sm:w-8" />
            <DiamondAccent className="h-1.5 w-1.5 text-gold-bright" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent via-gold/80 to-gold-bright sm:w-24" />
          </div>

          <p className="mt-2 font-serif text-base font-medium tracking-[0.18em] text-ivory/95 sm:text-lg md:text-xl lg:text-[1.45rem]">
            Wedding Photo Gallery
          </p>

          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 px-1">
            <p className="max-w-sm font-serif text-sm leading-snug italic text-gold-bright/95 sm:text-[0.95rem] lg:text-lg">
              {GALLERY_SUBTITLE}
            </p>
            <HeartSwirlFlourish className="h-6 w-20 shrink-0 text-gold-bright/90 sm:h-7 sm:w-24" />
          </div>
        </motion.div>

        <div aria-hidden="true" className="h-1" />
      </div>

      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-gold-deep via-gold-bright to-gold-deep"
      />
    </header>
  );
}
