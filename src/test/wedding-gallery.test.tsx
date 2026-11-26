import { describe, expect, it } from "vitest";
import {
  GALLERY_CATEGORIES,
  WEDDING_PHOTOS,
  filterPhotosByCategory,
  getAdjacentPhotoIndex,
} from "@/data/weddingPhotos";

describe("Wedding gallery data and navigation rules", () => {
  it("includes All plus the five requested wedding categories", () => {
    expect(GALLERY_CATEGORIES).toEqual([
      "All",
      "Couple",
      "Family",
      "Ceremony",
      "Friends",
      "Celebrations",
    ]);
  });

  it("filters photographs accurately by category and returns all photos for All", () => {
    expect(filterPhotosByCategory(WEDDING_PHOTOS, "All")).toHaveLength(WEDDING_PHOTOS.length);

    for (const category of ["Couple", "Family", "Ceremony", "Friends", "Celebrations"] as const) {
      const filtered = filterPhotosByCategory(WEDDING_PHOTOS, category);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((photo) => photo.category === category)).toBe(true);
    }
  });

  it("wraps around cleanly when navigating next or previous in the fullscreen viewer", () => {
    expect(getAdjacentPhotoIndex(0, 10, -1)).toBe(9);
    expect(getAdjacentPhotoIndex(9, 10, 1)).toBe(0);
    expect(getAdjacentPhotoIndex(4, 10, 1)).toBe(5);
    expect(getAdjacentPhotoIndex(4, 10, -1)).toBe(3);
  });
});
