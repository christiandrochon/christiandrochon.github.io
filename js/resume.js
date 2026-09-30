/* /js/resume.js — COPIE / COLLE TEL QUEL */
document.addEventListener("DOMContentLoaded", () => {
    const sections = Array.from(document.querySelectorAll("section[data-section]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.dataset.section === id;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    // verrou pendant scrollIntoView smooth (clic) : levé au premier de deux
    // événements, la fin réelle du scroll (scrollend) ou un délai de sécurité.
    // La durée d'un scroll animé dépend du navigateur et de la distance, un délai
    // seul expirait parfois avant la fin et laissait l'état actif vaciller.
    // Sans scrollend (Safari plus ancien), le délai fixe reste le seul mécanisme.
    const HAS_SCROLLEND = "onscrollend" in window;
    let lockId = null;
    let lockTimer = null;
    const releaseLock = () => {
        if (lockId === null) return;
        lockId = null;
        clearTimeout(lockTimer);
        window.removeEventListener("scrollend", releaseLock);
        // resynchronise l'état avec la position finale
        if (!checkBottomForce()) updateActive();
    };
    const lockActive = (id, ms = 900) => {
        lockId = id;
        clearTimeout(lockTimer);
        window.removeEventListener("scrollend", releaseLock);
        if (HAS_SCROLLEND) window.addEventListener("scrollend", releaseLock, { once: true });
        lockTimer = setTimeout(releaseLock, ms);
    };

    // clic: active immédiat + verrou + scroll
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.dataset.section;
            const target = document.getElementById(id);
            if (!target) return;

            currentId = id;
            setActive(id);
            // filet de sécurité : 1000 ms sans scrollend ; plus long avec scrollend (jamais
            // le mécanisme normal de libération, seulement si l'événement ne vient pas)
            lockActive(id, HAS_SCROLLEND ? 2500 : 1000);
            // scroll animé voulu au clic, désactivé si l'utilisateur demande moins
            // d'animations (un scroll-behavior CSS ne peut pas neutraliser un smooth
            // explicite). Le positionnement initial sur une ancre reste instantané
            // grâce à :root:has(:target) dans resume-gatsbyjs-colors.css (le scroll-behavior
            // smooth de :root vient de Bootstrap 5.3.3, pas du CSS du site).
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
            // Rend la section courante partageable par lien sans provoquer de saut
            // de scroll ni casser l'animation (jamais pushState, jamais location.hash).
            history.replaceState(null, "", `#${id}`);
        });
    });

    // scroll-spy par position : la section active est la dernière dont le haut
    // a franchi une ligne de référence, quelle que soit la hauteur des sections
    // (le calcul par ratio d'intersection échouait avec des sections plus hautes
    // que l'écran en mobile). La ligne est sous la position d'arrivée d'un clic
    // (scroll-margin-top de 5rem, seul décalage d'arrivée) pour que la section cible soit toujours retenue.
    let currentId = sections[0].id;

    // taille du rem en cache : lire le style calculé à chaque scroll forcerait un recalcul
    const readRem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let rem = readRem();

    // Indépendante de la hauteur du viewport (la barre d'URL mobile la fait varier
    // en cours de scroll, différemment selon la plateforme). Strictement supérieure
    // à la position d'arrivée d'un clic (5 rem) : 5 rem + 24 px.
    const referenceLine = () => 5 * rem + 24;

    const updateActive = () => {
        if (lockId) return;

        const line = referenceLine();
        let bestId = sections[0].id;
        for (const s of sections) {
            if (s.getBoundingClientRect().top <= line) bestId = s.id;
        }

        if (bestId !== currentId) {
            currentId = bestId;
            setActive(currentId);
        }
    };

    // FORCE BAS DE PAGE : « Contact », section courte, doit devenir active en fin de page.
    // Hauteur de viewport « small » (barre d'URL déployée) mesurée via 100svh :
    // constante pendant le scroll, contrairement à window.innerHeight. Repli : plus
    // petite innerHeight observée si svh n'est pas pris en charge.
    const BOTTOM_FORCE_PX = 450; // augmente si besoin (ex: 700)
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    let minInner = window.innerHeight;
    const stableViewportH = () => {
        minInner = Math.min(minInner, window.innerHeight);
        return probe.offsetHeight || minInner;
    };
    const checkBottomForce = () => {
        if (lockId) return;
        const bottom = window.scrollY + stableViewportH();
        const pageH = document.documentElement.scrollHeight;
        if (bottom >= pageH - BOTTOM_FORCE_PX) {
            currentId = sections[sections.length - 1].id;
            setActive(currentId);
            return true;
        }
        return false;
    };

    window.addEventListener("scroll", () => {
        if (checkBottomForce()) return;
        updateActive();
    }, { passive: true });

    window.addEventListener("resize", () => {
        rem = readRem();
        if (checkBottomForce()) return;
        updateActive();
    });

    setActive(currentId);
    if (!checkBottomForce()) updateActive();
});
