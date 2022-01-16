import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testMatch: 'e2e/specs/*.spec.ts',
    workers: process.env.CI ? 2 : undefined,
    use: {
      baseURL: 'http://localhost:4200/',
      headless: false,
      viewport: {width: 2045, height: 960},
      colorScheme: 'dark',
      screenshot: 'only-on-failure'
    },
  };
  export default config;