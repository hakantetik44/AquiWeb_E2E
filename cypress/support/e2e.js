import '@shelex/cypress-allure-plugin';

beforeEach(() => {
    cy.log('Test başlıyor');
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});

afterEach(() => {
    cy.log('Test tamamlandı');
}); 
