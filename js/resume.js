/* /js/resume.js — COPIE / COLLE TEL QUEL */
document.addEventListener("DOMContentLoaded", () => {
    const sections = Array.from(document.querySelectorAll("section[data-section]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
        });
    };

    // verrou pendant scrollIntoView smooth (clic)
    let lockId = null;
    let lockTimer = null;
    const lockActive = (id, ms = 900) => {
        lockId = id;
        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => (lockId = null), ms);
    };

    // clic: active immédiat + verrou + scroll
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.dataset.section;
            const target = document.getElementById(id);
            if (!target) return;

            setActive(id);
            lockActive(id, 1000);
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // scroll-spy
    const ratios = new Map();
    let currentId = sections[0].id;

    const updateActive = () => {
        if (lockId) return;

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

    // FORCE BAS DE PAGE (même si IntersectionObserver ne déclenche pas)
    const BOTTOM_FORCE_PX = 450; // augmente si besoin (ex: 700)
    const checkBottomForce = () => {
        if (lockId) return;
        const bottom = window.scrollY + window.innerHeight;
        const pageH = document.documentElement.scrollHeight;
        if (bottom >= pageH - BOTTOM_FORCE_PX) {
            currentId = sections[sections.length - 1].id;
            setActive(currentId);
            return true;
        }
        return false;
    };

    const observer = new IntersectionObserver(
        (entries) => {
            for (const e of entries) ratios.set(e.target.id, e.intersectionRatio);
            if (checkBottomForce()) return;
            updateActive();
        },
        {
            root: null,
            rootMargin: "-15% 0px -55% 0px",
            threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        }
    );

    sections.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", () => {
        if (checkBottomForce()) return;
        updateActive();
    }, { passive: true });

    window.addEventListener("resize", () => {
        if (checkBottomForce()) return;
        updateActive();
    });

    setActive(currentId);
    checkBottomForce();
});