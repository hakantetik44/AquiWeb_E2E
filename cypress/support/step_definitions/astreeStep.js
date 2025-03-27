import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Page elements
const elements = {
    mesLogicielLink: () => cy.get('a').contains('Logiciel MES', { matchCase: false }),
    aquiwebLink: () => cy.get('a').contains('Aquiweb', { matchCase: false }),
    titleText: () => cy.get('h1'),
    breadcrumbTitle: () => cy.get('.breadcrumb_last, h1, .page-title').first(),
    redColorTitle: () => cy.get('h1').find('span[style*="color: red"], span.has-red-color'),
    logo: () => cy.get('.logo, img[alt*="logo"]'),
    mainNav: () => cy.get('nav, .main-navigation'),
    servicesList: () => cy.get('.services-list, .service-items'),
    contactForm: () => cy.get('form, .contact-form'),
    searchInput: () => cy.get('input[type="search"], .search-input'),
    searchButton: () => cy.get('button[type="submit"], .search-submit'),
    searchResults: () => cy.get('.search-results'),
    servicesLink: () => cy.get('a').contains('Services', { matchCase: false }),
    moreButton: () => cy.get('a').contains('En savoir plus', { matchCase: false })
}

// Helper functions
const waitForPageLoad = () => {
    cy.document().should('have.property', 'readyState', 'complete')
    cy.wait(1000) // Small wait for dynamic content
}

// Step definitions
Given('je suis sur la page d\'accueil d\'AquiWeb', () => {
    cy.visit('/')
    waitForPageLoad()
    cy.log('📝 Visiting homepage')
})

When('je visite la page d\'accueil', () => {
    cy.visit('/')
    waitForPageLoad()
    cy.log('📝 Visiting homepage')
})

When('je clique sur le lien Logiciel MES', () => {
    cy.log('📝 Clicking on Logiciel MES link')
    elements.mesLogicielLink()
        .should('be.visible')
        .click({force: true})
    waitForPageLoad()
})

When('je clique sur le lien Logiciel Aquiweb', () => {
    cy.log('📝 Clicking on Logiciel Aquiweb link')
    elements.moreButton()
        .should('be.visible')
        .click({force: true})
    waitForPageLoad()
})

Then('je devrais voir le titre {string}', (expectedText) => {
    cy.log(`📝 Checking for title: ${expectedText}`)
    elements.breadcrumbTitle()
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            expect(text.trim().toLowerCase()).to.include(expectedText.toLowerCase())
        })
})

Then('je devrais voir le logo d\'AquiWeb', () => {
    cy.log('📝 Checking for logo')
    elements.logo().should('be.visible')
})

Then('je devrais voir le menu principal', () => {
    cy.log('📝 Checking for main navigation')
    elements.mainNav().should('be.visible')
})

When('je clique sur le lien {string}', (linkText) => {
    cy.log(`📝 Clicking on link: ${linkText}`)
    cy.contains('a', linkText, { matchCase: false })
        .should('be.visible')
        .click({force: true})
    waitForPageLoad()
})

Then('je devrais être redirigé vers la page des services', () => {
    cy.log('📝 Checking services page redirect')
    cy.url().should('include', '/services')
    elements.servicesList().should('exist')
})

Then('je devrais voir la liste des services disponibles', () => {
    cy.log('📝 Checking services list')
    elements.servicesList().should('be.visible')
})

Then('je devrais être redirigé vers la page de contact', () => {
    cy.log('📝 Checking contact page redirect')
    cy.url().should('include', '/contact')
})

Then('je devrais voir le formulaire de contact', () => {
    cy.log('📝 Checking contact form')
    elements.contactForm().should('be.visible')
})

When('je saisis {string} dans la barre de recherche', (searchTerm) => {
    cy.log(`📝 Entering search term: ${searchTerm}`)
    elements.searchInput()
        .should('be.visible')
        .type(searchTerm)
})

When('je clique sur le bouton de recherche', () => {
    cy.log('📝 Clicking search button')
    elements.searchButton()
        .should('be.visible')
        .click()
    waitForPageLoad()
})

Then('je devrais voir les résultats de recherche', () => {
    cy.log('📝 Checking search results')
    elements.searchResults().should('be.visible')
})

Then('les résultats devraient contenir le terme {string}', (searchTerm) => {
    cy.log(`📝 Checking search results for: ${searchTerm}`)
    elements.searchResults()
        .should('be.visible')
        .and('contain', searchTerm)
})

Then('le titre devrait avoir une couleur rouge', () => {
    cy.log('📝 Checking for red title')
    elements.redColorTitle().should('exist')
})

Then('je devrais être sur le site Astree', () => {
    cy.log('📝 Checking Astree website URL')
    cy.url().should('include', 'astree-software.fr')
}) 