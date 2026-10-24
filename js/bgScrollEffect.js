// Overlay gelap makin pekat saat halaman di-scroll
(function () {
    const overlay = document.getElementById('bg-overlay');
    if (!overlay) return;

    function update() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        overlay.style.opacity = Math.min(progress * 0.8, 0.8).toFixed(2);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();