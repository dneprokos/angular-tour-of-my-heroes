module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["<rootDir>/e2e/specs/*.spec.ts"],
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    setupFilesAfterEnv: ['./jest.setup.js', "jest-allure/dist/setup"],
    testRunner: 'jest-jasmine2',
    testEnvironment: './test-environment.ts'
};