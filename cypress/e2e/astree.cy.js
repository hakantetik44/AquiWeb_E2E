import AstreePage from '../pages/AstreePage';

describe('Tests du Site Astrée Software', () => {
    before(() => {
        cy.log('Suite de tests commence');
    });

    after(() => {
        cy.log('Suite de tests terminée');
    });

    it('Vérification de la page Aquiweb', () => {
        cy.allure()
            .epic('Astrée Software Website')
            .feature('Navigation')
            .story('Aquiweb Page Access')
            .description('Test de navigation vers la page Aquiweb et vérification du contenu');

        // Navigation vers la page d'accueil
        cy.allure().step('Navigation vers la page d\'accueil');
        AstreePage.visitHomePage();

        // Cliquer sur Logiciel MES
        cy.allure().step('Cliquer sur Logiciel MES');
        AstreePage.clickMesLogiciel();

        // Cliquer sur Aquiweb
        cy.allure().step('Cliquer sur Aquiweb');
        AstreePage.clickAquiweb();

        // Vérifier le titre
        cy.allure().step('Vérifier le titre de la page');
        AstreePage.verifyAquiwebTitle('Aquiweb,logiciel MES temps réel');

        // Capture d'écran pour le rapport
        cy.allure().step('Prendre une capture d\'écran');
        cy.screenshot('aquiweb-page');
    });
}); 