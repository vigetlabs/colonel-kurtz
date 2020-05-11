module.exports = {
  testURL: 'https://viget.dev',
  modulePathIgnorePatterns: ['example', 'build'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  collectCoverageFrom: ['src/**/*.js'],
  testMatch: ['**/?(*.)test.js?(x)']
}
