# 🚀 Tests E2E AquiWeb

<div align="center">

![Cypress](https://img.shields.io/badge/Cypress-12.0.0-brightgreen.svg)
![Cucumber](https://img.shields.io/badge/Cucumber-15.0.0-brightgreen.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-blue.svg)

[![Tests E2E](https://github.com/hakantetik44/AquiWeb_E2E/actions/workflows/cypress.yml/badge.svg)](https://github.com/hakantetik44/AquiWeb_E2E/actions/workflows/cypress.yml)

</div>

## 📋 Description

Ce projet contient les tests end-to-end (E2E) pour le site web AquiWeb, développés avec Cypress et Cucumber. Les tests sont écrits en Gherkin pour une meilleure lisibilité et maintenabilité.

## 🛠 Technologies Utilisées

- [Cypress](https://www.cypress.io/) - Framework de test E2E
- [Cucumber](https://cucumber.io/) - Framework BDD
- [Node.js](https://nodejs.org/) - Environnement d'exécution
- [ESBuild](https://esbuild.github.io/) - Bundler JavaScript
- [Allure](https://docs.qameta.io/allure/) - Outil de reporting

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/hakantetik44/AquiWeb_E2E.git

# Installer les dépendances
npm install --legacy-peer-deps

# Installer Cypress
npx cypress install
```

## 🎯 Exécution des Tests

```bash
# Lancer Cypress en mode interactif
npm run cypress:open

# Lancer les tests en mode headless
npm run cypress:run

# Générer les rapports
npm run report:generate
```

## 📁 Structure du Projet

```
AquiWeb_E2E/
├── cypress/
│   ├── e2e/                 # Fichiers feature Cucumber
│   ├── support/             # Fichiers de support
│   │   └── step_definitions/ # Définitions des étapes
│   ├── fixtures/            # Données de test
│   └── pages/              # Page Objects
├── test-results/           # Rapports de test
└── cypress.config.js       # Configuration Cypress
```

## 📊 Rapports

Les rapports de test sont générés dans le dossier `test-results/` et incluent :
- Rapports Cucumber HTML
- Rapports Mochawesome
- Rapports Allure

## 🔄 CI/CD

Les tests sont exécutés automatiquement via GitHub Actions et Jenkins.

## 📝 Scénarios de Test

Les tests couvrent les fonctionnalités suivantes :
- Navigation sur la page d'accueil
- Accès aux pages Logiciel MES et Aquiweb
- Navigation vers les services
- Recherche
- Formulaire de contact

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

---

<div align="center">
  
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/hakantetik44/AquiWeb_E2E)

</div> 