const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

async function setupNodeEvents(on, config) {
  // Cucumber plugin
  await addCucumberPreprocessorPlugin(on, config)

  // esbuild bundler
  on('file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
      bundle: true,
      sourcemap: true
    })
  )

  // Allure plugin
  require('@shelex/cypress-allure-plugin/writer')(on, config)

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
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'spec, @shelex/cypress-allure-plugin',
      reportDir: 'cypress/results'
    },
    setupNodeEvents,
    experimentalSourceRewriting: true,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    env: {
      allure: true,
      allureResultsDir: 'allure-results'
    }
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
