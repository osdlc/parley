# parley site

parley's site and its slide decks, at https://osdlc.github.io/parley/. A static
[Astro](https://astro.build) site. Decks are markdown files shown by [reveal.js](https://revealjs.com),
on the landing page and at full window size.

## Working here

Node 24 or later and pnpm.

```sh
pnpm install
pnpm run dev     # http://localhost:4360, reloads on save
pnpm run check   # astro check, format, the build, then the leak check over dist/
```

## Layout

| Path | What |
| --- | --- |
| `src/pages/index.astro` | The landing page |
| `src/pages/slides/[deck].astro` | Each deck at full window size: `/slides/<name>/` |
| `src/decks/*.md` | The decks, one markdown file each, with their images in a folder beside them |
| `src/components/Deck.astro` | Turns a deck into reveal.js slides, embedded or full window |
| `src/styles/` | `tokens.css` (colours and type, light and dark), `site.css`, `deck.css` (the decks' theme) |
| `scripts/leak-check.ts` | The leak check over `dist/` |
| `demo/` | The review the launch deck's screenshots come from |

## Writing a deck

Add `src/decks/<name>.md` with a `title` in its frontmatter. A line of `---` ends a slide. Speaker
notes go in an `<aside class="notes">` on the slide. The deck is at `/slides/<name>/`; embed it on
a page with `<Deck deck="<name>" embedded />` inside a `.deck-frame` box.

At full window size: arrow keys move, `s` opens the speaker view, `f` is full screen, `Esc` shows
every slide. Add `?print-pdf` to the address and print to save a PDF.

Slides are 1280 by 720 and scale to fit. Code blocks are highlighted at build time by Astro.

## Publishing

[.github/workflows/pages.yml](../.github/workflows/pages.yml) builds the site on every pull
request that changes it, and on every push to `main` that does it also deploys to GitHub Pages. It
builds with `SITE_URL=https://osdlc.github.io` and `SITE_BASE=/parley`, and runs the leak check
before the deploy: no home or temp-folder path, and no GitHub link off its allowlist.

A plugin release replaces only the paths it builds (the packs, the top-level README, the license
files and `THIRD-PARTY-NOTICES`), so it leaves `site/` and the workflow alone.
