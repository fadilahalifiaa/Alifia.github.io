// Overlay gelap makin pekat saat scroll — dibatasi 1x per frame supaya halus di HP
(function () {
    const overlay = document.getElementById('bg-overlay');
    if (!overlay) return;

    let ticking = false;
    let lastOpacity = -1;

    function update() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        const value = Math.round(Math.min(Math.max(progress, 0) * 0.8, 0.8) * 100) / 100;
        if (value !== lastOpacity) {
            overlay.style.opacity = value;
            lastOpacity = value;
        }
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
})();