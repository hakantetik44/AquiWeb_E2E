const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config)

  on('file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
      bundle: true,
      sourcemap: true
    })
  )
  
  require('cypress-mochawesome-reporter/plugin')(on)
  return config
}

module.exports = defineConfig({
  projectId: 'aquiweb-e2e',
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: false,
    baseUrl: 'https://www.aquiweb.fr',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter',
      cypressMochawesomeReporterReporterOptions: {
        charts: true,
        reportPageTitle: 'AquiWeb E2E Test Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        overwrite: false,
        html: false,
        json: true,
        reportDir: 'test-results'
      }
    },
    setupNodeEvents,
    experimentalSourceRewriting: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000
  },
  cucumberJson: {
    generate: true,
    outputFolder: "test-results",
    filePrefix: "",
    fileSuffix: ".cucumber"
  }
})
