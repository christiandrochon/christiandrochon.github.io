# Site vitrine — Maçon / Couvreur / Piscine / Taille de pierre

🔗 Site en ligne : https://christiandrochon.github.io/

## À propos

Ce dépôt contient le **site vitrine** d’un artisan :
- **Maçonnerie**
- **Couverture**
- **Piscines**
- **Taille de pierre**

Le site présente l’activité, les prestations et les informations de contact.

## Lancer le projet en local

### Prérequis
- Node.js + npm

### Installation

```bash
npm i
```

## Démarrage (dev)

```bash
npm start
```

Le site est ensuite accessible (par défaut) sur :
`http://localhost:3000`

## Déploiement

Le site est déployé et hébergé via **GitHub Pages**.

### Déploiement sur GitHub Pages

Le déploiement s’effectue à partir des scripts npm définis dans le projet.

Depuis la racine du projet :

```bash
npm run deploy
```
Cette commande :
* lance le build de production (npm run build),
* publie automatiquement le contenu du dossier build/ sur GitHub Pages.

Le site est ensuite accessible à l’adresse suivante :
`https://christiandrochon.github.io/`

### Remarques
* Le champ homepage du fichier package.json est configuré pour GitHub Pages.
* Le déploiement s’effectue sur la branche dédiée utilisée par gh-pages.
* Cette méthode permet de mettre à jour le site simplement après chaque modification.

## Licence

Ce projet est distribué sous licence MIT.
Voir le fichier [LICENSE](LICENSE)
.