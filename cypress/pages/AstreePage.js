class AstreePage {
    // Locators
    elements = {
        mesLogicielLink: () => cy.get('a').contains('Logiciel MES'),
        aquiwebLink: () => cy.get('a').contains('Logiciel Aquiweb'),
        titleText: () => cy.get('h1').first(),
        redColorTitle: () => cy.get("h1 span.has-inline-color.has-red-color")
    }

    // Methods
    visitHomePage() {
        cy.visit('https://www.astree-software.fr/');
    }

    clickMesLogiciel() {
        this.elements.mesLogicielLink().click({force: true});
    }

    clickAquiweb() {
        this.elements.aquiwebLink().click({force: true});
    }

    verifyAquiwebTitle(expectedText) {
        this.elements.titleText().should('contain', expectedText);
    }
}

export default new AstreePage(); 