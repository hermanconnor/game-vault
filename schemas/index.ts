import { z } from "zod";

// Rating schema
const RatingSchema = z.object({
  id: z.number(),
  title: z.string(),
  count: z.number(),
  percent: z.number(),
});

// Short screenshot schema
const ShortScreenshotSchema = z.object({
  id: z.number(),
  image: z.string().url(),
});

// Platform details schema
const PlatformDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image: z.string().url().nullable(),
  year_end: z.number().nullable(),
  year_start: z.number().nullable().optional(),
  games_count: z.number().optional(),
  image_background: z.string().url().optional(),
});

// Platform with release info schema
const PlatformSchema = z.object({
  platform: PlatformDetailsSchema,
  released_at: z.string().nullable(),
  requirements_en: z
    .object({
      minimum: z.string().optional(),
      recommended: z.string().optional(),
    })
    .nullable(),
  requirements_ru: z
    .object({
      minimum: z.string().optional(),
      recommended: z.string().optional(),
    })
    .nullable(),
});

// Parent platform schema
const ParentPlatformSchema = z.object({
  platform: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  }),
});

// ESRB rating schema
const ESRBRatingSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

// Added by status schema
const AddedByStatusSchema = z.object({
  beaten: z.number(),
  dropped: z.number(),
  owned: z.number(),
  playing: z.number(),
  toplay: z.number(),
  yet: z.number(),
});

// Genre schema
const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  games_count: z.number(),
  image_background: z.string().url(),
});

// Store details schema
const StoreDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  domain: z.string(),
  games_count: z.number(),
});

// Store schema
const StoreSchema = z.object({
  id: z.number(),
  store: StoreDetailsSchema,
});

// Tag schema
const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  language: z.string().optional(),
  games_count: z.number().optional(),
  image_background: z.string().url().optional(),
});

// Main game schema
const GameSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  released: z.string(),
  tba: z.boolean(),
  background_image: z.string().url().optional(),
  rating: z.number().optional(),
  rating_top: z.number().optional(),
  ratings: z.array(RatingSchema),
  ratings_count: z.number(),
  reviews_count: z.number(),
  reviews_text_count: z.number(),
  added: z.number().optional(),
  added_by_status: AddedByStatusSchema.optional(),
  metacritic: z.number().nullable().optional(),
  playtime: z.number().optional(),
  suggestions_count: z.number(),
  updated: z.string(),
  user_game: z.null().or(z.object({})).optional(),
  saturated_color: z.string(),
  dominant_color: z.string().optional(),
  platforms: z.array(PlatformSchema).optional(),
  parent_platforms: z.array(ParentPlatformSchema).optional(),
  genres: z.array(GenreSchema).optional(),
  stores: z.array(StoreSchema),
  clip: z.null().or(z.object({})).optional(),
  tags: z.array(TagSchema),
  esrb_rating: ESRBRatingSchema.nullable().optional(),
  short_screenshots: z.array(ShortScreenshotSchema),
});

export const createPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.number(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    results: z.array(itemSchema),
  });

export const GamesResponseSchema = createPaginatedSchema(GameSchema);

// Type exports
export type Rating = z.infer<typeof RatingSchema>;
export type ShortScreenshot = z.infer<typeof ShortScreenshotSchema>;
export type PlatformDetails = z.infer<typeof PlatformDetailsSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type ParentPlatform = z.infer<typeof ParentPlatformSchema>;
export type ESRBRating = z.infer<typeof ESRBRatingSchema>;
export type AddedByStatus = z.infer<typeof AddedByStatusSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type Store = z.infer<typeof StoreSchema>;
export type StoreDetails = z.infer<typeof StoreDetailsSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Game = z.infer<typeof GameSchema>;
