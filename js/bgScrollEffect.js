// js/bgScrollEffect.js
// Isi: efek latar saat scroll (geser + zoom, gelap otomatis), progress bar, bintang, bintang jatuh, cahaya kursor
(() => {
    const bg = document.getElementById('bg');
    const overlay = document.getElementById('bg-overlay');
    const bar = document.getElementById('progress');
    const glow = document.getElementById('glow');
    const hero = document.getElementById('hero');
    const cv = document.getElementById('stars'), ctx = cv.getContext('2d');
    const kurangGerak = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- bintang ----
    let bintang = [], meteor = null;
    function siapkan() {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bintang = Array.from({ length: Math.min(160, Math.round(innerWidth * innerHeight / 9000)) }, () => ({
            x: Math.random() * innerWidth, y: Math.random() * innerHeight,
            r: Math.random() * 1.6 + .4,        // ukuran
            d: Math.random() * .5 + .1,         // seberapa cepat geser saat scroll
            f: Math.random() * 6.28, s: Math.random() * 1.5 + .5   // kedipan
        }));
    }
    function gambarBintang(t, sy) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (const b of bintang) {
            const y = ((b.y - sy * b.d) % innerHeight + innerHeight) % innerHeight;
            ctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(t / 1000 * b.s + b.f));
            ctx.fillStyle = b.r > 1.4 ? '#FFE9A8' : '#fff';
            ctx.beginPath(); ctx.arc(b.x, y, b.r, 0, 6.28); ctx.fill();
        }
        // bintang jatuh, muncul sesekali
        if (!meteor && Math.random() < .003) meteor = { x: innerWidth * (.4 + Math.random() * .6), y: Math.random() * innerHeight * .4, t: 0 };
        if (meteor) {
            const k = ++meteor.t * 14, x = meteor.x - k, y = meteor.y + k * .5;
            const g = ctx.createLinearGradient(x, y, x + 90, y - 45);
            g.addColorStop(0, 'rgba(255,233,168,.9)'); g.addColorStop(1, 'rgba(255,233,168,0)');
            ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90, y - 45); ctx.stroke();
            if (x < -100 || y > innerHeight) meteor = null;
        }
    }
    addEventListener('resize', siapkan);
    siapkan();

    // ---- cahaya yang ngikutin kursor ----
    let gx = -300, gy = -300, gtx = -300, gty = -300;
    addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { gtx = e.clientX; gty = e.clientY; glow.style.opacity = 1; } });
    document.addEventListener('pointerleave', () => { glow.style.opacity = 0; });

    // ---- satu loop untuk semua efek scroll ----
    // posisi scroll "dikejar" pelan-pelan (sy) supaya gerakan latar tidak patah-patah
    let sy = scrollY;
    function loop(t) {
        sy += (scrollY - sy) * .09;
        if (Math.abs(scrollY - sy) < .1) sy = scrollY;

        const maks = document.documentElement.scrollHeight - innerHeight;
        const p = maks > 0 ? Math.min(Math.max(sy / maks, 0), 1) : 0;   // 0 = paling atas, 1 = paling bawah

        overlay.style.opacity = Math.min(p * 0.85, 0.75);                // makin ke bawah makin gelap
        bar.style.transform = `scaleX(${p})`;

        if (!kurangGerak) {
            bg.style.transform = `translate3d(0, ${-p * 5}%, 0) scale(${1 + p * 0.08})`;
            if (sy < innerHeight * 1.2) {                                // hero bergeser pelan & memudar
                hero.style.translate = `0 ${sy * .3}px`;
                hero.style.opacity = Math.max(0, 1 - sy / (innerHeight * .85));
            }
            gx += (gtx - gx) * .12; gy += (gty - gy) * .12;
            glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
            gambarBintang(t, sy);
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
})();