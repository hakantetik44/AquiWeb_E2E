const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config)

  on('file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
      bundle: true,
      sourcemap: true
    })
  )
  
  allureWriter(on, config)
  require('@shelex/cypress-allure-plugin')(on, config)
  return config
}

module.exports = defineConfig({
  projectId: 'aquiweb-e2e',
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://www.aquiweb.fr',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter, allure-mocha',
      cypressMochawesomeReporterReporterOptions: {
        charts: true,
        reportPageTitle: 'AquiWeb E2E Test Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: true,
        overwrite: false,
        html: true,
        json: true,
        reportDir: 'test-results'
      }
    },
    setupNodeEvents,
    experimentalSourceRewriting: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    logLevel: 'debug',
    env: {
      CYPRESS_VERBOSE: true,
      allure: true,
      allureResultsDir: 'allure-results',
      allureAttachRequests: true
    }
  },
  cucumberJson: {
    generate: true,
    outputFolder: "test-results",
    filePrefix: "",
    fileSuffix: ".cucumber"
  }
})
