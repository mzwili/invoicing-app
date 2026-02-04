import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

if(typeof process.env.XATA_DATABASE_URL !== 'string'){
    throw new Error('Please set your database url')
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql', // or 'postgresql' / 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
