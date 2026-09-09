import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const writeups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    event: z.string(),
    category: z.enum([
      "web",
      "pwn",
      "crypto",
      "reverse",
      "forensics",
      "misc",
    ]),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, writeups };
