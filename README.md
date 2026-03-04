# Christian Drochon — Personal Resume Website

This repository contains the source code for my personal resume website.

The site is hosted using **GitHub Pages** and is available at:

**https://christiandrochon.github.io**

## Purpose

This website presents:

* My professional profile
* Technical skills
* Selected projects
* Downloadable CV
* Contact information

The goal is to provide a simple and accessible overview of my work as a **software developer and technical architect**.

## Technologies

The website is a **static site** built with standard web technologies:

* HTML5
* CSS3
* JavaScript
* Bootstrap (for layout and responsive design)

No backend or server-side framework is used.

## Project Structure

```
.
├── index.html
├── css/
├── js/
├── img/
├── projects/
├── Christian_Drochon_CV_2026.pdf
└── package.json
```

Main elements:

* `index.html` — entry point of the website
* `css/` — stylesheets
* `js/` — JavaScript scripts
* `img/` — images and icons
* `projects/` — project pages
* `Christian_Drochon_CV_2026.pdf` — downloadable CV

## Local Development

To run the site locally, simply open `index.html` in a browser.

Example:
```
firefox index.html
```

Alternatively you can use a simple local server:
```
python3 -m http.server 5137
```

Then open:
```
http://localhost:5137
```

Because the site is served from the root on GitHub Pages, all assets must use **relative paths**.

## Deployment

The website is automatically deployed via **GitHub Pages**.

Repository:
```
christiandrochon/christiandrochon.github.io
```

Deployment configuration:

* Branch: `main`
* Folder: `/ (root)`

Any push to `main` updates the live site.

## License

This project is released under the **MIT License**.
