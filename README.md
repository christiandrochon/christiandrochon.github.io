# Christian Drochon — Portfolio / Resume Website

Ce dépôt contient le code source de mon site personnel et portfolio technique.

Le site est déployé via GitHub Pages et accessible aux adresses suivantes :

- https://christiandrochon.dev
- https://christiandrochon.github.io

---

# Objectif

Ce site présente :

- mon profil professionnel ;
- mes compétences techniques ;
- plusieurs projets personnels et techniques ;
- mon CV téléchargeable ;
- mes informations de contact.

L’objectif est de fournir une vue claire, accessible et structurée de mon travail autour du développement logiciel, de l’architecture applicative, de la sécurité et de la conception backend.

---

# Technologies utilisées

Le site est une application statique construite avec :

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

Aucun framework backend ni moteur de rendu serveur n’est utilisé pour ce portfolio.

---

# Fonctionnalités

- site responsive ;
- navigation simple et légère ;
- pages projets dédiées ;
- mise en avant des architectures techniques ;
- intégration GitHub ;
- téléchargement du CV ;
- hébergement GitHub Pages ;
- domaine personnalisé via CNAME.

---

# Structure du projet

```text
.
├── index.html                     # Point d’entrée principal du site
├── 404.html                       # Page d’erreur 404
├── css/                           # Feuilles de style
├── js/                            # Scripts JavaScript (dont nav-menu.js, menu de navigation)
├── fonts/                         # Police Inter auto-hébergée (licence SIL OFL 1.1, voir fonts/OFL.txt)
├── img/                           # Images, logos et assets visuels
├── projects/                      # Pages projets individuelles
├── ue/                            # Attestations et relevés liés aux unités d’enseignement
├── Christian_Drochon_CV_2026_IA_agents.pdf  # CV téléchargeable
├── robots.txt                     # Directives pour les robots d’indexation
├── sitemap.xml                    # Plan du site
├── package.json                   # Dépendances npm du projet (surge)
├── package-lock.json              # Versions figées des dépendances npm
├── SEO-AUDIT-2026-08-29.md        # Audit SEO du site (29 août 2026)
├── CNAME                          # Domaine personnalisé GitHub Pages (apex)
├── README.md                      # Documentation du dépôt
└── LICENSE                        # Licence MIT
```

## Développement local

Lancement rapide avec un serveur HTTP local :

```
python -m http.server 5137
```

ou

```
python3 -m http.server 5137
```    

Puis ouvrir :

```
http://localhost:5137
```

Le site étant servi depuis la racine sur GitHub Pages, les assets peuvent être référencés avec des chemins *relatifs* ou *root-relative*.

## Déploiement

Le site est automatiquement déployé via **GitHub Pages**.

### Dépôt public : 

Le site est déployé via GitHub Pages avec domaine personnalisé.

```text
christiandrochon/christiandrochon.github.io
```

### Configuration de déploiement GitHub Pages :

- **Branch: main**

- **Folder: / (root)**

Le dépôt utilise également un domaine personnalisé configuré via le fichier CNAME :

```
https://christiandrochon.dev
```

Chaque push sur la branche `main` déclenche automatiquement une mise à jour du site.


## Contact

Pour toute prise de contact professionnelle :

- Email : [hello@christiandrochon.dev](mailto:hello@christiandrochon.dev?subject=Contact%20from%20GitHub)
- Website: https://christiandrochon.dev
- GitHub : https://github.com/christiandrochon


## Licence

Ce projet est distribué sous **MIT License**.

Voir le fichier [LICENSE](LICENSE).

