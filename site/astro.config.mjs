// @ts-check
import { defineConfig } from 'astro/config'

// A static site. The address and the base path come from the environment, so a local build serves
// from /: the Pages workflow sets SITE_URL=https://osdlc.github.io and SITE_BASE=/parley. Links in the pages go through
// `import.meta.env.BASE_URL`.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.SITE_BASE ?? '/',
  output: 'static',
  trailingSlash: 'always',
  // Not Astro's default 4321: `parley serve` uses that port too.
  server: { port: 4360 },
})
