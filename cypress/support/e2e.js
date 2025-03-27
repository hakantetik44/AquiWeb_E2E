import './commands';
import '@shelex/cypress-allure-plugin';

// Hide XHR requests from command log
const app = window.top;
if (app) {
  app.console.log = (function (old_function) {
    return function () {
      if (!arguments[0]?.includes('XHR')) {
        old_function.apply(this, arguments);
      }
    };
  }(app.console.log));
}

// Configure Allure reporting
Cypress.on('test:before:run:async', async (details) => {
  await allureWriter.startStep(details.title);
});

Cypress.on('test:after:run:async', async (results) => {
  await allureWriter.endStep(results.state);
});

// Log uncaught exceptions to Allure
Cypress.on('uncaught:exception', (err, runnable) => {
  allureWriter.addText('Uncaught Exception', err.message);
  return false;
});

// Log test suite start and end
before(() => {
  allureWriter.startSuite('Astree Software Tests');
});

after(() => {
  allureWriter.endSuite();
});

beforeEach(() => {
  cy.log('Test başlıyor');
});

afterEach(() => {
  cy.log('Test tamamlandı');
}); 
