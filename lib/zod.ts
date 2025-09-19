import { z } from "zod";

export const signInSchema = z.object({
  userName: z
    .string()
    .nonempty("userName is required")
    .min(6, "userName must be more than 8 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export const artistSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be more than 2 characters"),
  slug: z
    .string()
    .nonempty("Slug is required")
    .min(2, "Slug must be more than 2 characters")
    .regex(
      /^[a-z0-9\u0980-\u09FF-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  imageUrl: z.string().nonempty("image is required"),
});
export const poetSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be more than 2 characters"),
  slug: z
    .string()
    .nonempty("Slug is required")
    .min(2, "Slug must be more than 2 characters")
    .regex(
      /^[a-z0-9\u0980-\u09FF-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  imageUrl: z.string().nonempty("image is required"),
});
export const tagSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be more than 2 characters"),
  slug: z
    .string()
    .nonempty("Slug is required")
    .min(2, "Slug must be more than 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
});
export const lyricsSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(2, "Title must be more than 2 characters"),
  slug: z
    .string()
    .nonempty("Slug is required")
    .min(2, "Slug must be more than 2 characters")
    .regex(
      /^[a-z0-9\u0980-\u09FF-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  imageUrl: z.string().nonempty("image is required"),
  artistId: z.string().nonempty("Artist is required"),
  body: z
    .string()
    .nonempty("Content is required")
    .min(23, "Content must be more than 20 characters"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  favourite: z.boolean("favourite is required"),
  ytLink: z.string().optional(),
});
export const poemSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(2, "Title must be more than 2 characters"),
  slug: z
    .string()
    .nonempty("Slug is required")
    .min(2, "Slug must be more than 2 characters")
    .regex(
      /^[a-z0-9\u0980-\u09FF-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  imageUrl: z.string().nonempty("image is required"),
  poetId: z.string().nonempty("Poet is required"),
  body: z
    .string()
    .nonempty("Content is required")
    .min(23, "Content must be more than 20 characters"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  favourite: z.boolean("favourite is required"),
  ytLink: z.string().optional(),
});
