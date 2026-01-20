import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      date: z.coerce.date(),
      rating: z.number().min(1).max(10).optional(),
      screenshots: z.array(z.string()),
      videoUrl: z.string().optional(),
      youtubeUrl: z.string().url().optional(),
      techStack: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
        }),
      ),
      githubUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      category: z.string(),
      isFeatured: z.boolean().default(false),
    }),
  ),
});

export const collections = { projects };
