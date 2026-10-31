/**
 * The leak check over the built site in dist/: no home or temp-folder path, and no link to a GitHub
 * repository off the allowlist. The Pages workflow runs it after `astro build` and before the
 * deploy.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

/** Home and temp-folder paths: macOS, Linux and Windows forms. */
const PATHS = /\/Users\/|\/home\/|C:\\+Users\\+|\/var\/folders\//i

/**
 * The GitHub repositories the site may link to, as `owner/name`: parley's own, and marked, whose
 * link reveal.js's notes plugin carries in its license comment.
 */
const GITHUB_ALLOWED = new Set(['osdlc/parley', 'markedjs/marked'])

const GITHUB = /github\.com[/:]([\w.-]+)\/([\w.-]+)/gi

const dist = join(import.meta.dirname, '..', 'dist')
const leaks: string[] = []
let count = 0
for (const entry of readdirSync(dist, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile()) continue
  count++
  const path = join(entry.parentPath, entry.name)
  const name = relative(dist, path)
  readFileSync(path, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const hit = PATHS.exec(line)
      if (hit) leaks.push(`dist/${name}:${i + 1}: ${hit[0]}`)
      for (const m of line.matchAll(GITHUB)) {
        // A trailing dot ends a sentence, not the name.
        const repo = `${m[1]}/${m[2]!.replace(/\.git$/i, '').replace(/\.+$/, '')}`.toLowerCase()
        if (!GITHUB_ALLOWED.has(repo)) leaks.push(`dist/${name}:${i + 1}: github.com/${repo}`)
      }
    })
}
for (const l of leaks) process.stderr.write(`${l}\n`)
if (leaks.length > 0) process.exit(1)
process.stdout.write(`leak check: ${count} files in dist/, no leaks\n`)
