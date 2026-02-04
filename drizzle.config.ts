import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // or 'mysql' / 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})