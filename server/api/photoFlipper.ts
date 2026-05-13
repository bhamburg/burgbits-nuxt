import { readdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const files = await readdir(join(process.cwd(), 'public/images/flipper'))
  return files
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .map(f => `/images/flipper/${f}`)
})