import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:qPrahPgcCBtnWnffLvKFvIdKywunPsJi@gondola.proxy.rlwy.net:30500/railway',
  },
  verbose: true,
  strict: true,
})
