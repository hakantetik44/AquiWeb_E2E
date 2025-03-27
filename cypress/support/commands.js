Cypress.Commands.add('waitForPageLoad', () => {
    cy.document().should('have.property', 'readyState', 'complete')
})

Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
    cy.get(selector, { timeout }).should('be.visible')
})

Cypress.Commands.add('waitAndClick', (selector, timeout = 10000) => {
    cy.get(selector, { timeout }).should('be.visible').click()
}) 