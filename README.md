# Christian Drochon — Portfolio / Resume Website

Ce dépôt contient le code source de mon site personnel et portfolio technique.

Le site est déployé via GitHub Pages et accessible aux adresses suivantes :

- https://www.christiandrochon.dev
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
├── css/                           # Feuilles de style
├── js/                            # Scripts JavaScript
├── img/                           # Images, logos et assets visuels
├── projects/                      # Pages projets individuelles
├── Christian_Drochon_CV_2026.pdf  # CV téléchargeable
├── package.json                   # Métadonnées projet
├── CNAME                          # Domaine personnalisé GitHub Pages
├── README.md                      # Documentation du dépôt
└── LICENSE                        # Licence MIT
```

## Développement local

Lancement rapide avec un serveur HTTP local :

```
python -m http.server 5137
```

Puis ouvrir :

```
http://localhost:5137
```

Le site étant servi depuis la racine sur GitHub Pages, les assets peuvent être référencés avec des chemins *relatifs* ou *root-relative*.

## Déploiement

Le site est automatiquement déployé via **GitHub Pages**.

### Dépôt privé : 

Le site est déployé via GitHub Pages avec domaine personnalisé.

Le code source du portfolio n’est pas public.

### Configuration de déploiement Github Pages:

- **Branch: main**

- **Folder: / (root)**

Le dépôt utilise également un domaine personnalisé configuré via le fichier CNAME:

```
https://www.christiandrochon.dev
```

Chaque push sur la branche `main` déclenche automatiquement une mise à jour du site.


## Contact

Pour toute prise de contact professionnelle :

- Email : [hello@christiandrochon.dev](mailto:hello@christiandrochon.dev?subject=Contact%20from%20GitHub)
- Website: https://www.christiandrochon.dev
- GitHub : https://github.com/christiandrochon

<!--
## Licence

Ce projet est distribué sous **MIT License**.

Voir le fichier [LICENSE](LICENSE).
-->
