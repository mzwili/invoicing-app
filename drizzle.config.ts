import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({
    path: './.env.local'
})

if(typeof process.env.XATA_DATABASE_URL !== 'string'){
    throw new Error('Please set your database url')
}

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL
  }
});
