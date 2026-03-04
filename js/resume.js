document.addEventListener("DOMContentLoaded", () => {
    const sections = Array.from(document.querySelectorAll("section[data-section]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === id));
    };

    // Verrou : tant qu'on scrolle suite à un clic, on n'écrase pas l'active
    let lockId = null;
    let lockTimer = null;

    const lockActive = (id, ms = 900) => {
        lockId = id;
        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => {
            lockId = null;
        }, ms);
    };

    // Clic : active immédiat + verrou + scroll
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.dataset.section;
            const target = document.getElementById(id);
            if (!target) return;

            setActive(id);        // feedback immédiat
            lockActive(id, 1000); // verrou pendant l'animation

            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Observer : ne change l'active QUE si pas verrouillé
    const ratios = new Map();
    let currentId = sections[0].id;

    const updateActive = () => {
        if (lockId) return; // <-- IMPORTANT

        let bestId = currentId;
        let bestRatio = -1;

        for (const s of sections) {
            const r = ratios.get(s.id) ?? 0;
            if (r > bestRatio) {
                bestRatio = r;
                bestId = s.id;
            }
        }

        const currentRatio = ratios.get(currentId) ?? 0;
        if (bestId !== currentId && bestRatio >= currentRatio + 0.08) {
            currentId = bestId;
            setActive(currentId);
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            for (const e of entries) ratios.set(e.target.id, e.intersectionRatio);

            if (lockId) return; // <-- IMPORTANT

            // bas de page => force dernière section
            const bottom = window.scrollY + window.innerHeight;
            const pageH = document.documentElement.scrollHeight;
            if (bottom >= pageH - 4) {
                currentId = sections[sections.length - 1].id;
                setActive(currentId);
                return;
            }

            updateActive();
        },
        {
            root: null,
            rootMargin: "-15% 0px -55% 0px",
            threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        }
    );

    sections.forEach((s) => observer.observe(s));
    setActive(currentId);
});