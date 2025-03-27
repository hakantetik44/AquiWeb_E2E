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

before(() => {
  cy.allure().epic('AquiWeb E2E Tests')
    .feature('Automated Testing')
    .story('End-to-End Test Suite');
});

beforeEach(() => {
  cy.log('Test başlıyor');
});

afterEach(() => {
  cy.log('Test tamamlandı');
});

after(() => {
  cy.log('Tüm testler tamamlandı');
  // Testler bittikten sonra Cypress'i kapat
  if (Cypress.browser.isHeadless) {
    cy.task('closeBrowser');
  }
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err.message);
  return false;
}); 
