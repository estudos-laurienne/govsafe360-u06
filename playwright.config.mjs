import { defineConfig } from '@playwright/test';
const local = !process.env.SITE_URL;
export default defineConfig({
  testDir: './tests', timeout: 30000, retries: 0, workers: 1,
  use: { baseURL: process.env.SITE_URL || 'http://127.0.0.1:4173', browserName: 'chromium', headless:true, trace:'on', screenshot:'on', video:'on' },
  webServer: local ? { command:'node scripts/servidor-local.mjs', url:'http://127.0.0.1:4173', reuseExistingServer: false, timeout:20000 } : undefined,
  outputDir:'evidencias/playwright-resultados',
  reporter:[['list'],['html',{outputFolder:'evidencias/relatorio-html',open:'never'}]],
});
