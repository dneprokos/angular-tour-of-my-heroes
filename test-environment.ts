const NodeEnvironment = require('jest-environment-node');
require('dotenv').config();

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


class TestEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();
        this.global.TestSettings = getTestSettings();
    }
}

module.exports = TestEnvironment