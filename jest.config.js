// jest.config.js
export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
    },
    setupFilesAfterEnv: ['./jest.setup.js'], // Point to your setup file
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for transforming JS and TS files
    },
};
