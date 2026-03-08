# Christian Drochon — Personal Resume Website

This repository contains the source code for my personal resume website.

The site is hosted using **GitHub Pages** and is available at:

- **https://www.christiandrochon.dev**
- **https://christiandrochon.github.io**

## Purpose

This website presents:

* My professional profile
* Technical skills
* Selected projects
* Downloadable CV
* Contact information

The goal is to provide a simple and accessible overview of my work as a **software developer and technical architect**.

## Technologies

The website is a **static website** built with:

* HTML5
* CSS3
* JavaScript
* Bootstrap (responsive layout and reusable UI components)

No backend or server-side framework is used.

## Project Structure

```
.
├── index.html                     # Main entry point of the website
├── css/                           # Stylesheets used across the site
├── js/                            # JavaScript files for interactions and UI behavior
├── img/                           # Images, icons, and visual assets
├── projects/                      # Project pages linked from the cards on the main page
├── Christian_Drochon_CV_2026.pdf  # Downloadable resume
├── package.json                   # Project metadata and Surge dependency for local testing/deployment checks
├── CNAME                          # Custom domain configuration for GitHub Pages
└── LICENSE                        # MIT license
```

## Local Development

To run the site locally, you can use a simple local server:

```
python -m http.server 5137
```

Then open:

```
http://localhost:5137
```

Because the site is served from the root on GitHub Pages, assets can be referenced using either **relative paths** or *
*root-relative paths**.

## Deployment

The website is automatically deployed via **GitHub Pages**.

Repository:

```
christiandrochon/christiandrochon.github.io
```

Deployment configuration:

- **Branch: main**

- **Folder: / (root)**

The repository also uses a custom domain configured through the CNAME file:

```
https://www.christiandrochon.dev
```

Any push to the `main` branch automatically updates the website.

## Contact

For professional inquiries, you can reach me at:

- Email : [hello@christiandrochon.dev](mailto:hello@christiandrochon.dev?subject=Contact%20from%20GitHub)
- Website: https://www.christiandrochon.dev

## License

This project is released under the **MIT License**.
