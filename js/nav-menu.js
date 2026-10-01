/*
 * Menu de navigation mobile (<= 639px) : motif "disclosure".
 * Ne manipule ni les .nav-link ni leur état actif (géré par resume.js) :
 * il se limite à ouvrir/fermer le panneau et à gérer aria-expanded et le focus.
 * Au-dessus de 639px, le bouton est masqué par la CSS et ce script est inerte.
 */
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".site-menu");
    const toggle = document.getElementById("menu-toggle");
    const panel = document.getElementById("nav-panel");
    if (!menu || !toggle || !panel) return;

    const icon = toggle.querySelector("i");
    const mobile = window.matchMedia("(max-width: 639px)");
    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    const setOpen = (open, { restoreFocus = false } = {}) => {
        toggle.setAttribute("aria-expanded", String(open));
        panel.classList.toggle("is-open", open);
        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-times", open);
        }
        if (open) {
            const first = panel.querySelector("a");
            if (first) first.focus({ preventScroll: true });
        } else if (restoreFocus) {
            toggle.focus({ preventScroll: true });
        }
    };

    // Le mode "menu" n'est activé que si du JS s'exécute (sans JS, la navigation
    // reste affichée en clair plutôt que de devenir inaccessible). Le script en ligne
    // de index.html l'a déjà posé pendant le parsing, avant toute mise en page de
    // l'ancre ; cet appel reste le repli si ce script en ligne venait à manquer.
    menu.classList.add("menu-ready");

    toggle.addEventListener("click", () => setOpen(!isOpen(), { restoreFocus: true }));

    // Clic sur un lien du panneau (section ou CV) : fermeture, focus rendu au bouton.
    panel.addEventListener("click", (e) => {
        if (isOpen() && e.target.closest("a")) setOpen(false, { restoreFocus: true });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) setOpen(false, { restoreFocus: true });
    });

    // Clic en dehors du menu : fermeture sans déplacer le focus.
    document.addEventListener("click", (e) => {
        if (isOpen() && !menu.contains(e.target)) setOpen(false);
    });

    // Passage à une largeur non mobile : on remet l'état à zéro.
    mobile.addEventListener("change", () => {
        if (!mobile.matches && isOpen()) setOpen(false);
    });
});
