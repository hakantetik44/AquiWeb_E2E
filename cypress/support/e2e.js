import '@shelex/cypress-allure-plugin';

// Import commands.js using ES2015 syntax:
import './commands'

// Import cucumber steps
import './step_definitions/homepage'

// Hide XHR requests from command log
const app = window.top;
if (app) {
  app.console.log = () => {};
}

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
    cy.log('Test başlıyor');
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});

afterEach(() => {
    cy.log('Test tamamlandı');
}); 
