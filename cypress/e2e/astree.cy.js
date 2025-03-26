import AstreePage from '../pages/AstreePage';

describe('Tests du Site Astrée Software', () => {
    before(() => {
        cy.log('Suite de tests commence');
    });

    after(() => {
        cy.log('Suite de tests terminée');
    });

    it('Vérification de la page Aquiweb', () => {
        // Navigation vers la page d'accueil
        AstreePage.visitHomePage();

        // Cliquer sur Logiciel MES
        AstreePage.clickMesLogiciel();

        // Cliquer sur Aquiweb
        AstreePage.clickAquiweb();

        // Vérifier le titre
        AstreePage.verifyAquiwebTitle('Aquiweb,logiciel MES temps réel');

        // Capture d'écran pour le rapport
        cy.screenshot('aquiweb-page');
    });
}); 