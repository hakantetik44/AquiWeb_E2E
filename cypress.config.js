const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://www.aquiweb.fr',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'AquiWeb E2E Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      overwrite: false,
      html: false,
      json: true,
      reportDir: 'test-reports'
    },
    setupNodeEvents(on, config) {
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      )
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
