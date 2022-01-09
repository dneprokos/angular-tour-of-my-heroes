//const JestNodeEnvironment = require('jest-environment-node');
require('dotenv').config();
const PlaywrightEnvironment = require('jest-playwright-preset/lib/PlaywrightEnvironment').default


const getEnv = (name: string) => {
    const envValue = process.env[name];
    if (envValue == null) throw new Error(`${name} environment variable is not defined.`);
    return envValue;
};

const getTestSettings = () => {
    const BaseUrl = getEnv('TOUR_OF_HEROES_BASE_URL');
    const HeadlessBrowser = getEnv('TOUR_OF_HEROES_HEADLESS_BROWSER') === 'true';
    const Browser = getEnv('TOUR_OF_HEROES_BROWSER');
    const ScreenshotsFolder = getEnv('TOUR_OF_HEROES_SCREENSHOTS_FOLDER');

    return {
        BaseUrl,
        HeadlessBrowser,
        Browser,
        ScreenshotsFolder
    }
};

// class TestEnvironment extends JestNodeEnvironment {
    // async setup() {
        // await super.setup();
        // this.global.TestSettings = getTestSettings();
    // }
// }

class TestEnvironment extends PlaywrightEnvironment {
    async setup() {
      await super.setup()
      this.global.TestSettings = getTestSettings();
      this.global.IsLastTestFailed = false;
      this.global.FailedTestName = '';
    }
}

module.exports = TestEnvironment