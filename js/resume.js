document.addEventListener("DOMContentLoaded", () => {
    const sections = Array.from(document.querySelectorAll("section[data-section]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));

    const idFromLink = (link) => link.dataset.section;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", idFromLink(link) === id);
        });
    };

    const onScroll = () => {
        if (sections.length === 0) return;

        const scrollY = window.scrollY;
        const viewportH = window.innerHeight;
        const doc = document.documentElement;
        const pageH = doc.scrollHeight;
        const bottomY = scrollY + viewportH;

        // 1) tout en haut → always ABOUT
        if (scrollY < 50) {
            setActive(sections[0].id);
            return;
        }

        // 2) tout en bas → always dernière section (CONTACT)
        if (bottomY >= pageH - 10) {
            setActive(sections[sections.length - 1].id);
            return;
        }

        // 3) sinon : section sous le centre de l'écran
        const center = scrollY + viewportH / 2;
        let currentId = sections[0].id;

        for (const section of sections) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (center >= top && center < bottom) {
                currentId = section.id;
                break;
            }
        }

        setActive(currentId);
    };

    // Scroll fluide sur clic menu
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = idFromLink(link);
            const target = document.getElementById(id);
            if (!target) return;

            const headerOffset = 0; // ajuste si tu as un header fixe
            const rect = target.getBoundingClientRect();
            const targetY = rect.top + window.scrollY - headerOffset;

            window.scrollTo({
                top: targetY,
                behavior: "smooth",
            });
        });
    });

    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);
    onScroll(); // état initial
});