import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('je suis sur la page d\'accueil d\'AquiWeb', () => {
  cy.visit('/')
})

When('je visite la page d\'accueil', () => {
  cy.visit('/')
})

Then('je devrais voir le logo d\'AquiWeb', () => {
  cy.get('.logo').should('be.visible')
})

Then('je devrais voir le menu principal', () => {
  cy.get('nav').should('be.visible')
})

When('je clique sur le lien {string}', (linkText) => {
  cy.contains(linkText).click()
})

Then('je devrais être redirigé vers la page des services', () => {
  cy.url().should('include', '/services')
})

Then('je devrais voir la liste des services disponibles', () => {
  cy.get('.services-list').should('be.visible')
})

Then('je devrais être redirigé vers la page de contact', () => {
  cy.url().should('include', '/contact')
})

Then('je devrais voir le formulaire de contact', () => {
  cy.get('form').should('be.visible')
})

When('je saisis {string} dans la barre de recherche', (searchTerm) => {
  cy.get('input[type="search"]').type(searchTerm)
})

When('je clique sur le bouton de recherche', () => {
  cy.get('button[type="submit"]').click()
})

Then('je devrais voir les résultats de recherche', () => {
  cy.get('.search-results').should('be.visible')
})

Then('les résultats devraient contenir le terme {string}', (searchTerm) => {
  cy.get('.search-results').should('contain', searchTerm)
}) 