const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

async function setupNodeEvents(on, config) {
  // Cucumber plugin
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  // esbuild bundler
  on('file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  // Allure plugin
  allureWriter(on, config)

  // After run hook
  on('after:run', async (results) => {
    if (results) {
      await allureWriter.endStep(results.state);
    }
  });

  return config
}

module.exports = defineConfig({
  projectId: 'aquiweb-e2e',
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://astree-software.fr',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'spec',
    setupNodeEvents,
    experimentalSourceRewriting: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    env: {
      allure: true,
      allureResultsDir: 'allure-results',
      allureReportDir: 'allure-report'
    },
    chromeWebSecurity: false,
    exit: true,
    record: false
  },
  "cypress-cucumber-preprocessor": {
    nonGlobalStepDefinitions: true,
    stepDefinitions: "cypress/support/step_definitions/**/*.js",
    json: {
      enabled: true,
      output: "test-results/cucumber-report.json"
    }
  }
})
