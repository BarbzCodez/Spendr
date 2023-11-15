/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // If we are running unit tests, we want to use the singleton.ts file to ensure
  // that we use a mock prisma client.
  setupFilesAfterEnv:
    process.env.NODE_ENV === 'test'
      ? ['<rootDir>/src/singleton.ts']
      : ['<rootDir>/src/test/integration/setup.ts'],
};
