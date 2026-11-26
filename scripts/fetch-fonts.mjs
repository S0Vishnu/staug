import { mkdir, writeFile } from 'node:fs/promises'

const cssUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500..700;1,500..600&family=Manrope:wght@400..800&family=Space+Grotesk:wght@400..700&display=swap'
const res = await fetch(cssUrl, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
})
if (!res.ok) throw new Error(`Google Fonts CSS failed: ${res.status}`)
const css = await res.text()
const parts = css.split('/* ').slice(1)
await mkdir('public/fonts', { recursive: true })

const faces = []
for (const part of parts) {
  const comment = part.slice(0, part.indexOf('*/')).trim()
  if (comment !== 'latin' && comment !== 'latin-ext') continue
  const block = part.slice(part.indexOf('*/') + 2)
  const family = block.match(/font-family:\s*'([^']+)'/)?.[1]
  const style = block.match(/font-style:\s*(\w+)/)?.[1]
  const weight = block.match(/font-weight:\s*([^;]+)/)?.[1]?.trim()
  const range = block.match(/unicode-range:\s*([^;]+)/)?.[1]?.trim()
  const url = block.match(/url\((https:[^)]+)\)/)?.[1]
  if (!family || !style || !weight || !range || !url) throw new Error(`Could not parse font block: ${comment}`)
  const slug = `${family.toLowerCase().replace(/\s+/g, '-')}${style === 'italic' ? '-italic' : ''}-${comment}`
  const file = `${slug}.woff2`
  const fontRes = await fetch(url)
  if (!fontRes.ok) throw new Error(`Font download failed: ${url}`)
  const buf = Buffer.from(await fontRes.arrayBuffer())
  await writeFile(`public/fonts/${file}`, buf)
  faces.push({ family, style, weight, range, file, bytes: buf.length })
  console.log(`${file} ${buf.length}`)
}

const cssOut = faces
  .map((face) => {
    const quoted = face.family.includes(' ') ? `"${face.family}"` : face.family
    return `@font-face {
  font-family: ${quoted};
  font-style: ${face.style};
  font-weight: ${face.weight};
  font-display: swap;
  src: url("/fonts/${face.file}") format("woff2");
  unicode-range: ${face.range};
}`
  })
  .join('\n\n')

const banner = `/* Cormorant Garamond, Manrope and Space Grotesk.
   Latin and latin-ext subsets, SIL Open Font License.
   License text: /fonts/OFL.txt */

`

await writeFile('src/styles/fonts.css', banner + cssOut + '\n')

const ofl = await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt')
if (!ofl.ok) throw new Error(`OFL download failed: ${ofl.status}`)
await writeFile('public/fonts/OFL.txt', await ofl.text())
console.log(`wrote ${faces.length} faces`)
