import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Page elements
const elements = {
    mesLogicielLink: () => cy.get('a[href*="logiciel-mes"]').first(),
    aquiwebLink: () => cy.get('.homeCover__left__txt strong').contains('logiciel MES Aquiweb'),
    titleText: () => cy.get('h1'),
    breadcrumbTitle: () => cy.get('.breadcrumb_last'),
    redColorTitle: () => cy.get("h1 span.has-inline-color.has-red-color"),
    logo: () => cy.get('.logo'),
    mainNav: () => cy.get('nav'),
    servicesList: () => cy.get('.services-list'),
    contactForm: () => cy.get('form'),
    searchInput: () => cy.get('input[type="search"]'),
    searchButton: () => cy.get('button[type="submit"]'),
    searchResults: () => cy.get('.search-results'),
    servicesLink: () => cy.get('a[href*="services"]').first(),
    moreButton: () => cy.get('.homeCover__left > .moreBtn')
}

// Step definitions
Given('je suis sur la page d\'accueil d\'AquiWeb', () => {
    cy.visit('/')
    cy.document().should('have.property', 'readyState', 'complete')
})

When('je visite la page d\'accueil', () => {
    cy.visit('/')
    cy.document().should('have.property', 'readyState', 'complete')
})

When('je clique sur le lien Logiciel MES', () => {
    elements.mesLogicielLink().click({force: true})
    cy.document().should('have.property', 'readyState', 'complete')
})

When('je clique sur le lien Logiciel Aquiweb', () => {
    elements.moreButton().click({force: true})
    cy.document().should('have.property', 'readyState', 'complete')
})

Then('je devrais voir le titre {string}', (expectedText) => {
    elements.breadcrumbTitle().should('contain', expectedText)
})

Then('je devrais voir le logo d\'AquiWeb', () => {
    elements.logo().should('be.visible')
})

Then('je devrais voir le menu principal', () => {
    elements.mainNav().should('be.visible')
})

When('je clique sur le lien {string}', (linkText) => {
    cy.contains(linkText).click()
    cy.document().should('have.property', 'readyState', 'complete')
})

Then('je devrais être redirigé vers la page des services', () => {
    cy.url().should('include', '/services')
    elements.servicesList().should('be.visible')
})

Then('je devrais voir la liste des services disponibles', () => {
    elements.servicesList().should('be.visible')
})

Then('je devrais être redirigé vers la page de contact', () => {
    cy.url().should('include', '/contact')
})

Then('je devrais voir le formulaire de contact', () => {
    elements.contactForm().should('be.visible')
})

When('je saisis {string} dans la barre de recherche', (searchTerm) => {
    elements.searchInput().type(searchTerm)
})

When('je clique sur le bouton de recherche', () => {
    elements.searchButton().click()
})

Then('je devrais voir les résultats de recherche', () => {
    elements.searchResults().should('be.visible')
})

Then('les résultats devraient contenir le terme {string}', (searchTerm) => {
    elements.searchResults().should('contain', searchTerm)
})

// Additional steps for Astree-specific functionality
Then('le titre devrait avoir une couleur rouge', () => {
    elements.redColorTitle().should('exist')
})

Then('je devrais être sur le site Astree', () => {
    cy.url().should('include', 'astree-software.fr')
}) 