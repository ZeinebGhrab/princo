import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
