/* /js/spec-panel.js
   Panneau modal "Certificat / Cours" pour la section #specialisations.
   Intercepte les liens marqués data-cert pour afficher, dans un panneau à
   deux volets, le certificat PDF (iframe) et une carte vers la page du
   cours (nouvel onglet). Les liens restent de vrais <a href> fonctionnels
   sans JS (fallback no-JS / SEO) : ce script se contente d'empêcher la
   navigation directe et d'ouvrir le panneau à la place.
*/
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("spec-panel-overlay");
    const panel = document.getElementById("spec-panel");
    const closeBtn = document.getElementById("spec-panel-close");
    const backBtn = document.getElementById("spec-panel-back");
    const titleEl = document.getElementById("spec-panel-title");
    const iframeEl = document.getElementById("spec-panel-iframe");
    const certLinkEl = document.getElementById("spec-panel-cert-link");
    const courseTitleEl = document.getElementById("spec-panel-course-title");
    const courseLinkEl = document.getElementById("spec-panel-course-link");

    const triggers = Array.from(document.querySelectorAll("a[data-cert]"));
    if (!overlay || !panel || !triggers.length) return;

    let lastFocusedEl = null;

    const getFocusableEls = () =>
        Array.from(
            panel.querySelectorAll(
                'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const trapFocus = (e) => {
        if (e.key !== "Tab") return;
        const focusable = getFocusableEls();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const onKeydown = (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            closePanel();
            return;
        }
        trapFocus(e);
    };

    const openPanel = (trigger) => {
        const certUrl = trigger.getAttribute("data-cert");
        const courseUrl = trigger.getAttribute("data-course-url") || trigger.getAttribute("href");
        // Texte de l'entrée, normalisé (le HTML source peut contenir des
        // retours à la ligne/espaces multiples entre le texte et l'icône FA).
        const label = trigger.textContent.trim().replace(/\s+/g, " ");

        titleEl.textContent = label;
        iframeEl.setAttribute("src", certUrl);
        iframeEl.setAttribute("title", `Certificat — ${label}`);
        certLinkEl.setAttribute("href", certUrl);
        courseTitleEl.textContent = label;
        courseLinkEl.setAttribute("href", courseUrl);

        lastFocusedEl = trigger;
        overlay.hidden = false;
        document.body.style.overflow = "hidden";

        document.addEventListener("keydown", onKeydown, true);

        // Focus déplacé dans le panneau (bouton fermer, en tête).
        closeBtn.focus();
    };

    const closePanel = () => {
        overlay.hidden = true;
        document.body.style.overflow = "";
        iframeEl.setAttribute("src", "about:blank");

        document.removeEventListener("keydown", onKeydown, true);

        if (lastFocusedEl) {
            lastFocusedEl.focus();
            lastFocusedEl = null;
        }
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openPanel(trigger);
        });
    });

    closeBtn.addEventListener("click", closePanel);
    if (backBtn) backBtn.addEventListener("click", closePanel);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePanel();
    });
});
