// Buka/tutup menu hamburger (HP & tablet)
(function () {
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    const iconOpen = document.getElementById('iconHamburger');
    const iconClose = document.getElementById('closeIcon');
    if (!btn || !menu) return;

    function setOpen(open) {
        menu.classList.toggle('translate-x-full', !open);
        iconOpen.classList.toggle('hidden', open);
        iconClose.classList.toggle('hidden', !open);
        document.body.classList.toggle('overflow-hidden', open);
    }

    btn.addEventListener('click', () => {
        setOpen(menu.classList.contains('translate-x-full'));
    });

    // Tutup menu setelah salah satu link diklik
    menu.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => setOpen(false))
    );

    // Tutup otomatis kalau layar dibesarkan ke desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) setOpen(false);
    });
})();