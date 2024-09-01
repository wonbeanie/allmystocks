module.exports = {
    testMatch: ["<rootDir>/src/__test__/**/*.test.(js|jsx|ts|tsx)",],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: [
        "<rootDir>/node_modules"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts']
};