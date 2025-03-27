import '@shelex/cypress-allure-plugin';

// Import commands.js using ES2015 syntax:
import './commands'

// Import cucumber steps
import './step_definitions/astreeStep'

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

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configure Allure reporting
before(() => {
    cy.allure()
        .epic('AquiWeb E2E Tests')
        .feature('Automated Testing')
        .story('End-to-End Test Suite');
});

beforeEach(() => {
    cy.log('Test başlıyor');
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});

afterEach(() => {
    cy.log('Test tamamlandı');
    // Add test status to Allure report
    cy.allure()
        .step('Test completed', true)
        .endStep();
}); 
