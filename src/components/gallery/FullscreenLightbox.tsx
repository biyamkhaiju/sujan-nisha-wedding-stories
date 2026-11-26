import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getAdjacentPhotoIndex, type WeddingPhoto } from "@/data/weddingPhotos";
import { DiamondAccent } from "./Ornaments";

interface FullscreenLightboxProps {
  photos: readonly WeddingPhoto[];
  activeIndex: number | null;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}

const SWIPE_OFFSET_THRESHOLD = 55;
const SWIPE_VELOCITY_THRESHOLD = 320;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction * 96,
    scale: direction === 0 ? 0.86 : 0.94,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 0 ? 0 : -direction * 96,
    scale: direction === 0 ? 0.9 : 0.94,
    opacity: 0,
  }),
};

export function FullscreenLightbox({
  photos,
  activeIndex,
  onChangeIndex,
  onClose,
}: FullscreenLightboxProps) {
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const photo = activeIndex !== null ? photos[activeIndex] : undefined;
  const isOpen = activeIndex !== null && photo !== undefined;

  const navigate = useCallback(
    (step: 1 | -1) => {
      if (activeIndex === null || photos.length <= 1) return;
      setDirection(step);
      setIsZoomed(false);
      onChangeIndex(getAdjacentPhotoIndex(activeIndex, photos.length, step));
    },
    [activeIndex, onChangeIndex, photos.length],
  );

  const jumpTo = useCallback(
    (targetIndex: number) => {
      if (activeIndex === null || targetIndex === activeIndex) return;
      setDirection(targetIndex > activeIndex ? 1 : -1);
      setIsZoomed(false);
      onChangeIndex(targetIndex);
    },
    [activeIndex, onChangeIndex],
  );

  useEffect(() => {
    if (!isOpen) {
      setDirection(0);
      setIsZoomed(false);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === "z" || event.key === "Z") {
        event.preventDefault();
        setIsZoomed((prev) => !prev);
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setIsZoomed(true);
      } else if (event.key === "-" || event.key === "0") {
        event.preventDefault();
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, navigate, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed || photos.length <= 1) return;
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      navigate(1);
    } else if (
      info.offset.x > SWIPE_OFFSET_THRESHOLD ||
      info.velocity.x > SWIPE_VELOCITY_THRESHOLD
    ) {
      navigate(-1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && photo && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen view of ${photo.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lightbox-backdrop fixed inset-0 z-50 flex flex-col text-ivory backdrop-blur-md"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-gold/20 px-4 py-3.5 sm:px-8 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 font-sans text-xs tracking-[0.22em] text-gold-bright">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </span>
              <DiamondAccent className="h-1.5 w-1.5 shrink-0 text-gold/80" />
              <span className="truncate font-serif text-sm tracking-[0.22em] text-ivory/90 uppercase">
                {photo.category}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-label={isZoomed ? "Zoom out photograph" : "Zoom in photograph"}
                aria-pressed={isZoomed}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold/35 bg-velvet/70 text-gold-bright transition-colors hover:border-gold hover:bg-crimson/60"
              >
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close fullscreen viewer"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold/35 bg-velvet/70 text-gold-bright transition-colors hover:border-gold hover:bg-crimson/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-16 sm:py-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Previous photograph"
                className="absolute left-3 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-velvet-deep/75 text-gold-bright backdrop-blur-sm transition-all hover:scale-105 hover:border-gold-bright hover:bg-crimson/80 sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <AnimatePresence initial={true} custom={direction} mode="popLayout">
              <motion.div
                key={photo.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                drag={isZoomed ? true : "x"}
                dragConstraints={
                  isZoomed
                    ? { top: -220, bottom: 220, left: -260, right: 260 }
                    : { left: 0, right: 0 }
                }
                dragElastic={isZoomed ? 0.12 : 0.22}
                onDragEnd={handleDragEnd}
                onDoubleClick={() => setIsZoomed((prev) => !prev)}
                className={`relative flex max-h-full max-w-full items-center justify-center select-none ${
                  isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                style={{ touchAction: "none" }}
              >
                <motion.img
                  src={photo.src}
                  alt={photo.title}
                  draggable={false}
                  animate={{ scale: isZoomed ? 1.85 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="warm-photo-grade max-h-[70vh] max-w-[92vw] rounded-lg border border-gold/40 object-contain shadow-2xl sm:max-h-[74vh] sm:max-w-[80vw]"
                />
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Next photograph"
                className="absolute right-3 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-velvet-deep/75 text-gold-bright backdrop-blur-sm transition-all hover:scale-105 hover:border-gold-bright hover:bg-crimson/80 sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="border-t border-gold/20 px-4 py-3.5 sm:px-8 sm:py-4">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
              <div>
                <h2 className="font-serif text-xl font-medium text-gold-bright sm:text-2xl">
                  {photo.title}
                </h2>
                <p className="mt-0.5 font-serif text-sm italic text-ivory/80 sm:text-base">
                  {photo.caption}
                </p>
              </div>

              {photos.length > 1 && (
                <div
                  aria-label="Jump to photograph"
                  className="flex max-w-full items-center gap-2 overflow-x-auto px-1 py-0.5"
                >
                  {photos.map((thumb, idx) => {
                    const current = idx === activeIndex;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => jumpTo(idx)}
                        aria-label={`View ${thumb.title}`}
                        aria-current={current ? "true" : undefined}
                        className={`h-11 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-all duration-300 ${
                          current
                            ? "scale-105 border-gold-bright ring-2 ring-gold/60"
                            : "border-gold/25 opacity-55 hover:opacity-90"
                        }`}
                      >
                        <img
                          src={thumb.src}
                          alt=""
                          className="warm-photo-grade h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
