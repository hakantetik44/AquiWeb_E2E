Feature: AquiWeb Homepage Navigation
  As a user
  I want to navigate through the AquiWeb homepage
  So that I can access different sections of the website

  Background:
    Given je suis sur la page d'accueil d'AquiWeb

  Scenario: Navigation vers la page d'accueil
    When je visite la page d'accueil
    Then je devrais voir le logo d'AquiWeb
    And je devrais voir le menu principal

  Scenario: Navigation vers la section Services
    When je clique sur le lien "Services"
    Then je devrais être redirigé vers la page des services
    And je devrais voir la liste des services disponibles

  Scenario: Navigation vers la section Contact
    When je clique sur le lien "Contact"
    Then je devrais être redirigé vers la page de contact
    And je devrais voir le formulaire de contact

  Scenario: Recherche sur le site
    When je saisis "test" dans la barre de recherche
    And je clique sur le bouton de recherche
    Then je devrais voir les résultats de recherche
    And les résultats devraient contenir le terme "test" 