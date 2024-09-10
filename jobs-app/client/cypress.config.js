import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    e2e: {
      baseUrl: 'http://localhost:5173/',
      supportFile: 'cypress/support/index.js',
      fixturesFolder: 'cypress/fixtures',
      specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      viewportWidth: 1280,
      viewportHeight: 720,
    },
  },
});
