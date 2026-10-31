import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// One markdown file per deck in src/decks/. A line of `---` ends a slide. Speaker notes go in an
// `<aside class="notes">` on the slide. The file name is the deck's address: /slides/<name>/.
const decks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/decks' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
})

export const collections = { decks }
