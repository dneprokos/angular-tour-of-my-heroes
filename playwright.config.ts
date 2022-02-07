import { PlaywrightTestConfig } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const getEnv = (name: string) => {
  const envValue = process.env[name];
  if (envValue == null) throw new Error(`${name} environment variable is not defined.`);
  return envValue;
};



const config: PlaywrightTestConfig = {
    testMatch: 'e2e/specs/*.spec.ts',
    workers: process.env.CI ? 2 : undefined,
    reporter: [
      ['allure-playwright'],
      ['list']
    ],
    retries: 3,
    use: {
      baseURL: getEnv('TOUR_OF_HEROES_BASE_URL'),
      headless: getEnv('TOUR_OF_HEROES_HEADLESS_BROWSER') === 'true',
      viewport: {width: 2045, height: 960},
      colorScheme: 'dark',
      screenshot: 'only-on-failure',
      // launchOptions: {
        // slowMo: 1000 
      // }
    },
    projects: [
      {
        name: "Chrome",
        use: {
          browserName: 'chromium'
        }
      },
      {
        name: "FireFox",
        use: {
          browserName: 'firefox'
        }
      }
    ]
  };
  export default config;