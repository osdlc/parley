// osdlc's prettier style (@osdlc/prettier-config), plus the plugin that formats .astro files. In .astro
// whitespace between inline elements is text, so it is kept (`css`, not the base's `ignore`).
import base from '@osdlc/prettier-config' with { type: 'json' }

export default {
  ...base,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    ...base.overrides,
    { files: '*.astro', options: { parser: 'astro', htmlWhitespaceSensitivity: 'css' } },
  ],
}
