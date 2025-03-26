import AstreePage from '../pages/AstreePage';

describe('Tests du Site Astrée Software', () => {
    beforeEach(() => {
        cy.visit('https://www.astree-software.fr/')
    })

    it('Vérification de la page Aquiweb', () => {
        // Click on Logiciel MES
        cy.contains('Logiciel MES').click()

        // Click on Aquiweb
        cy.contains('Logiciel Aquiweb').click()

        // Verify the title
        cy.get('h1').should('contain', 'Aquiweb,logiciel MES temps réel')
    })
}); 