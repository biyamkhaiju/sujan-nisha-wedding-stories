import heroTempleBanner from "@/assets/wedding/hero-temple-banner.jpg";
import rosesLeft from "@/assets/wedding/roses-left.png";
import rosesRight from "@/assets/wedding/roses-right.png";
import crimsonSilkCorner from "@/assets/wedding/crimson-silk-corner.png";
import coupleEmbrace from "@/assets/wedding/couple-embrace.jpg";
import coupleLaughter from "@/assets/wedding/couple-laughter.jpg";
import familyPortrait from "@/assets/wedding/family-portrait.jpg";
import familyBlessings from "@/assets/wedding/family-blessings.jpg";
import ceremonyHands from "@/assets/wedding/ceremony-hands.jpg";
import ceremonySindoor from "@/assets/wedding/ceremony-sindoor.jpg";
import friendsBridesmaids from "@/assets/wedding/friends-bridesmaids.jpg";
import friendsGroomsmen from "@/assets/wedding/friends-groomsmen.jpg";
import celebrationsDance from "@/assets/wedding/celebrations-dance.jpg";
import celebrationsFeast from "@/assets/wedding/celebrations-feast.jpg";

export type PhotoCategory = "Couple" | "Family" | "Ceremony" | "Friends" | "Celebrations";
export type GalleryFilter = "All" | PhotoCategory;

export interface WeddingPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: PhotoCategory;
  aspect: "portrait" | "portrait-soft" | "landscape" | "landscape-tall";
}

export const COUPLE_NAMES = "Sujan & Nisha";
export const GALLERY_SUBTITLE =
  "Two souls, one beautiful journey — a lifetime of memories.";
export const HERO_BANNER_IMAGE = heroTempleBanner;
export const ROSES_LEFT_IMAGE = rosesLeft;
export const ROSES_RIGHT_IMAGE = rosesRight;
export const CRIMSON_SILK_IMAGE = crimsonSilkCorner;

export const GALLERY_CATEGORIES: readonly GalleryFilter[] = [
  "All",
  "Couple",
  "Family",
  "Ceremony",
  "Friends",
  "Celebrations",
] as const;

export const WEDDING_PHOTOS: readonly WeddingPhoto[] = [
  {
    id: "couple-embrace",
    src: coupleEmbrace,
    title: "Quiet Promise",
    caption: "Foreheads resting together amid fresh rose and jasmine garlands.",
    category: "Couple",
    aspect: "portrait",
  },
  {
    id: "family-portrait",
    src: familyPortrait,
    title: "United Under the Mandap",
    caption: "Two families gathered in crimson silk and ivory brocade.",
    category: "Family",
    aspect: "landscape",
  },
  {
    id: "ceremony-hands",
    src: ceremonyHands,
    title: "Sacred Vows by the Fire",
    caption: "Henna-adorned hands joined tenderly above the sacred Agni.",
    category: "Ceremony",
    aspect: "landscape",
  },
  {
    id: "friends-bridesmaids",
    src: friendsBridesmaids,
    title: "The Bride & Her Dearest",
    caption: "Shared laughter and warm embraces before the evening festivities.",
    category: "Friends",
    aspect: "landscape-tall",
  },
  {
    id: "ceremony-sindoor",
    src: ceremonySindoor,
    title: "The Sindoor Blessing",
    caption: "A timeless vow sealed beneath floral drapes and oil lamps.",
    category: "Ceremony",
    aspect: "landscape-tall",
  },
  {
    id: "couple-laughter",
    src: coupleLaughter,
    title: "Shower of Rose Petals",
    caption: "Unfiltered joy beneath falling crimson petals at golden hour.",
    category: "Couple",
    aspect: "portrait",
  },
  {
    id: "family-blessings",
    src: familyBlessings,
    title: "Blessings of the Elders",
    caption: "Sacred tika and heartfelt prayers for a lifetime of harmony.",
    category: "Family",
    aspect: "landscape-tall",
  },
  {
    id: "celebrations-dance",
    src: celebrationsDance,
    title: "First Twirl Under Sparklers",
    caption: "Dancing hand-in-hand beneath marigold chandeliers and starlight.",
    category: "Celebrations",
    aspect: "portrait-soft",
  },
  {
    id: "celebrations-feast",
    src: celebrationsFeast,
    title: "Courtyard of a Thousand Diyas",
    caption: "Warm brass lamps illuminating an unforgettable royal evening.",
    category: "Celebrations",
    aspect: "landscape",
  },
  {
    id: "friends-groomsmen",
    src: friendsGroomsmen,
    title: "Baraat Brotherhood",
    caption: "Joyful cheers and rose petals celebrating with lifelong friends.",
    category: "Friends",
    aspect: "portrait-soft",
  },
];

export function filterPhotosByCategory(
  photos: readonly WeddingPhoto[],
  category: GalleryFilter,
): WeddingPhoto[] {
  if (category === "All") return [...photos];
  return photos.filter((photo) => photo.category === category);
}

export function getAdjacentPhotoIndex(
  currentIndex: number,
  total: number,
  step: 1 | -1,
): number {
  if (total <= 0) return -1;
  return (currentIndex + step + total) % total;
}