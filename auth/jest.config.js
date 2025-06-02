export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  // Ignore dist/ so only src/ tests run
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
