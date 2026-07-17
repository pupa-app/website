import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection — drop a .md file in src/content/blog/ to add a post.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    author: z.string().default('Pupa team'),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
