Feature: Navigation Astree Software
  En tant qu'utilisateur
  Je veux naviguer sur le site Astree Software
  Afin de découvrir les logiciels disponibles

  Scenario: Accès à la page Logiciel MES
    Given je suis sur la page d'accueil d'AquiWeb
    When je clique sur le lien Logiciel MES
    Then je devrais voir le titre "Aquiweb, logiciel MES"
    And le titre devrait avoir une couleur rouge

  Scenario: Accès à la page Logiciel Aquiweb
    Given je suis sur la page d'accueil d'AquiWeb
    When je clique sur le lien Logiciel Aquiweb
    Then je devrais voir le titre "Aquiweb, logiciel MES"
    And je devrais être sur le site Astree

  Scenario: Navigation vers les services depuis Astree
    Given je suis sur la page d'accueil d'AquiWeb
    When je clique sur le lien "Services"
    Then je devrais être redirigé vers la page des services
    And je devrais voir la liste des services disponibles 