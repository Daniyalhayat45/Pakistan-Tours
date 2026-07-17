import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["TOUR", "HOTEL", "VEHICLE", "CUSTOM", "GENERAL"]).default("GENERAL"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone number required"),
  message: z.string().optional(),
  travelDate: z.string().optional(),
  guests: z.coerce.number().int().positive().optional(),
  tourId: z.string().optional(),
  hotelId: z.string().optional(),
  vehicleId: z.string().optional(),
});
export type InquiryInput = z.infer<typeof inquirySchema>;

export const destinationSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  nameUr: z.string().optional(),
  region: z.string().min(2),
  summary: z.string().min(5),
  summaryUr: z.string().optional(),
  description: z.string().min(10),
  descriptionUr: z.string().optional(),
  coverImage: z.string().url(),
  images: z.array(z.string()).default([]),
  bestSeason: z.string().optional(),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const tourSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  titleUr: z.string().optional(),
  destinationId: z.string().optional(),
  summary: z.string().min(5),
  summaryUr: z.string().optional(),
  durationDays: z.coerce.number().int().positive(),
  durationNights: z.coerce.number().int().nonnegative(),
  priceFrom: z.coerce.number().positive(),
  priceCurrency: z.string().default("PKR"),
  groupSizeMax: z.coerce.number().int().positive().optional(),
  difficulty: z.string().optional(),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  meals: z.array(z.string()).default([]),
  weatherInfo: z.string().optional(),
  packingList: z.array(z.string()).default([]),
  policies: z.string().optional(),
  coverImage: z.string().url(),
  images: z.array(z.string()).default([]),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const hotelSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  nameUr: z.string().optional(),
  city: z.string().min(2),
  stars: z.coerce.number().int().min(1).max(5),
  description: z.string().min(5),
  amenities: z.array(z.string()).default([]),
  coverImage: z.string().url(),
  images: z.array(z.string()).default([]),
  priceFrom: z.coerce.number().optional(),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
});

export const vehicleSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  type: z.string().min(2),
  capacity: z.coerce.number().int().positive(),
  description: z.string().min(5),
  features: z.array(z.string()).default([]),
  coverImage: z.string().url(),
  images: z.array(z.string()).default([]),
  priceFrom: z.coerce.number().optional(),
  published: z.coerce.boolean().default(true),
});

export const blogSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  titleUr: z.string().optional(),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  contentUr: z.string().optional(),
  coverImage: z.string().url(),
  tags: z.array(z.string()).default([]),
  published: z.coerce.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().min(3),
  questionUr: z.string().optional(),
  answer: z.string().min(3),
  answerUr: z.string().optional(),
  category: z.string().default("general"),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export const heroSlideSchema = z.object({
  title: z.string().min(2),
  titleUr: z.string().optional(),
  subtitle: z.string().optional(),
  subtitleUr: z.string().optional(),
  image: z.string().url(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR"]),
  active: z.coerce.boolean().default(true),
});

export const settingsSchema = z.object({
  siteName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  analyticsId: z.string().optional(),
  maintenanceMode: z.coerce.boolean().default(false),
});
