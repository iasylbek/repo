module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Make sure this path is correct or remove it if you don't have this setup
  testEnvironment: 'jsdom',
};
