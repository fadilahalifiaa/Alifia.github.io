<!DOCTYPE html>
<html class="scroll-smooth" lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="D-Day.css">

    <!--- CSS TAMBAHAN: efek dan animasi yang susah kalau cuma pakai Tailwind --->
    <style>
        html { scroll-padding-top: 90px; }
        body { overflow-x: hidden; background: #1a0a07; }

        /* judul section: tulisan putih, garis coklat, bayangan */
        .judul { text-transform: uppercase; line-height: 1; color: #fff; font-weight: 400;
            -webkit-text-stroke: 1px #7A3D21; text-shadow: 0 5px 0 #7A3D21; }
        @media (min-width: 1024px) { .judul { -webkit-text-stroke: 2px #7A3D21; text-shadow: 0 10px 0 #7A3D21; } }

        /* tombol oranye (dipakai di hero & papan skills) */
        .tombol { display: inline-block; text-transform: uppercase; color: #fff; border-radius: 8px; border: 1px solid #F3B641; outline: 1px solid #592918;
            background: linear-gradient(to bottom, #F36F41 0%, #F39241 50%, #F36F41 50%, #F39241 100%); box-shadow: 0 8px 0 #592918;
            font-size: clamp(1.1rem, 4.5vw, 1.75rem); padding: 6px 48px; cursor: pointer;
            transition: transform .2s ease, box-shadow .2s, filter .2s, translate .35s ease; }
        @media (min-width: 768px) { .tombol { padding: 8px 110px; } }
        .tombol:hover { transform: translateY(-3px); filter: brightness(1.08); }
        .tombol:active { transform: translateY(6px); box-shadow: 0 2px 0 #592918; }

        /* latar belakang */
        #progress { position: fixed; top: 0; left: 0; width: 100%; height: 4px; z-index: 100; transform: scaleX(0); transform-origin: left;
            background: linear-gradient(90deg, #F36F41, #F3B641); }
        #glow { position: fixed; left: -150px; top: -150px; width: 300px; height: 300px; z-index: -5; pointer-events: none; opacity: 0; transition: opacity .4s;
            background: radial-gradient(circle, rgba(243, 182, 65, .28), transparent 65%); mix-blend-mode: screen; }
        @media (hover: none) { #glow { display: none; } }

        /* navbar */
        #header { transition: transform .5s cubic-bezier(.4, 0, .2, 1); }
        #header.sembunyi { transform: translateY(-100%); }
        #header nav { transition: background .4s; }
        #header.scrolled nav { background: rgba(25, 8, 5, .82); }
        .link-nav { position: relative; transition: color .25s; }
        .link-nav::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 3px; background: #F3B641;
            transform: scaleX(0); transform-origin: right; transition: transform .4s ease; }
        .link-nav:hover, .link-nav.aktif { color: #F3B641; }
        .link-nav:hover::after, .link-nav.aktif::after { transform: scaleX(1); transform-origin: left; }

        /* hamburger: ikon menu berputar jadi ikon silang */
        #iconHamburger, #closeIcon { transition: opacity .3s, transform .4s ease; }
        #closeIcon { opacity: 0; transform: rotate(-90deg) scale(.5); }
        #hamburgerBtn.buka #iconHamburger { opacity: 0; transform: rotate(90deg) scale(.5); }
        #hamburgerBtn.buka #closeIcon { opacity: 1; transform: none; }

        /* menu hp: melebar dari pojok kanan atas */
        #mobileMenu { clip-path: circle(0 at calc(100% - 40px) 38px); visibility: hidden; transition: clip-path .7s cubic-bezier(.7, 0, .2, 1), visibility 0s .7s; }
        #mobileMenu.buka { clip-path: circle(150% at calc(100% - 40px) 38px); visibility: visible; transition-delay: 0s; }
        #mobileMenu li { opacity: 0; transform: translateY(24px); transition: opacity .5s, transform .6s ease; }
        #mobileMenu.buka li { opacity: 1; transform: none; transition-delay: calc(.2s + var(--i) * .07s); }

        /* animasi muncul saat di-scroll */
        .muncul { opacity: 0; transform: translateY(46px); transition: opacity 1s ease, transform 1s cubic-bezier(.2, .7, .2, 1); transition-delay: calc(var(--i, 0) * 110ms); }
        .muncul.tampil { opacity: 1; transform: none; }

        /* judul hero: huruf jatuh satu-satu, lalu melayang */
        #hero h1 { animation: melayang 4.5s ease-in-out infinite; }
        .kata { display: inline-block; white-space: nowrap; }
        .huruf { display: inline-block; animation: jatuh .9s cubic-bezier(.2, .9, .3, 1.25) both; animation-delay: calc(var(--n) * 55ms + .25s); }
        @keyframes jatuh { from { opacity: 0; transform: translateY(-70px) rotate(-12deg); } }
        @keyframes melayang { 50% { transform: translateY(-10px); } }

        /* kartu profil */
        .kartu { will-change: transform; animation: ambang 5s ease-in-out infinite; filter: drop-shadow(0 18px 24px rgba(0, 0, 0, .45)); }
        @keyframes ambang { 50% { translate: 0 -8px; } }

        /* papan kayu skills: ukuran tulisan ikut lebar papan */
        .papan { container-type: inline-size; }
        .papan-isi { padding: 9% 9% 0; }
        .papan-isi h2 { font-size: 8cqw; text-align: center; }
        .papan-isi ul { align-self: flex-start; margin: 2cqw 0 0 4cqw; padding-left: 5cqw; font-size: 5cqw; line-height: 1.25; }
        .papan-isi li { transition: transform .25s, color .25s; }
        .papan-isi li:hover { transform: translateX(10px); color: #B3361B; }
        .papan-isi .tombol { position: absolute; bottom: 9%; font-size: 5.5cqw; padding: 3px 7cqw 0; line-height: 1.2; text-transform: none; box-shadow: 0 5px 0 #592918; }

        /* kartu My Favorite Activities: ketuk buat buka */
        .kg { position: relative; display: block; width: 100%; padding: 14px 54px 14px 86px; text-align: left; cursor: pointer; border: 3px solid #F3B641; border-radius: 18px;
            background: rgba(40, 14, 8, .72); box-shadow: 0 6px 0 #7A3D21; -webkit-tap-highlight-color: transparent; transition: transform .4s ease, border-color .3s, background .3s; }
        .kg:hover { transform: translateY(-4px); }
        .kg:active { transform: scale(.98); }
        .kg .ikon { position: absolute; left: 16px; top: 14px; width: 54px; height: 54px; border-radius: 14px; background: #4C1C0E; display: grid; place-items: center; transition: background .3s; }
        .kg svg { width: 30px; height: 30px; fill: none; stroke: #F3B641; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; transition: stroke .3s; }
        .kg .nm { display: flex; align-items: center; min-height: 54px; font-size: clamp(1.2rem, 4.6vw, 1.5rem); line-height: 1.15; }
        .kg .tanda { position: absolute; right: 18px; top: 24px; font-size: 1.8rem; line-height: 1; color: #F3B641; transition: transform .45s ease; }
        .kg .isi { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s ease; }
        .kg .isi > span { display: block; overflow: hidden; }
        .kg .ket { display: block; margin-top: 10px; color: #F9DCB4; line-height: 1.4; font-size: 1.1rem; }
        .kg .meter { display: block; height: 10px; margin: 12px 0 4px; border-radius: 10px; background: rgba(255, 255, 255, .15); overflow: hidden; }
        .kg .meter i { display: block; height: 100%; width: 0; border-radius: 10px; background: linear-gradient(90deg, #F36F41, #F3B641); transition: width 1s ease .15s; }
        .kg.buka { border-color: #FFD976; background: rgba(60, 20, 10, .88); }
        .kg.buka .isi { grid-template-rows: 1fr; }
        .kg.buka .meter i { width: var(--v); }
        .kg.buka .tanda { transform: rotate(45deg); }
        .kg.buka .ikon { background: #F3B641; animation: loncat .6s ease; }
        .kg.buka svg { stroke: #4C1C0E; }
        @keyframes loncat { 40% { transform: translateY(-8px) rotate(-8deg) scale(1.1); } }

        /* foto My Experience */
        .exp { transition: transform .4s ease; }
        .exp:hover { transform: translateY(-6px); }
        .foto-a { aspect-ratio: 4 / 3; border: 3px solid #F3B641; border-radius: 16px; overflow: hidden; background: #3a1510; }
        .foto-a img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
        .exp:hover img { transform: scale(1.07); }

        /* tombol ke atas */
        #naik { position: fixed; right: 16px; bottom: 16px; z-index: 55; width: 44px; height: 44px; border: 2px solid #F3B641; border-radius: 50%; background: #4C1C0E; color: #fff;
            font-size: 1.4rem; line-height: 1; cursor: pointer; opacity: 0; transform: translateY(20px); pointer-events: none; transition: opacity .4s, transform .5s ease; }
        #naik.tampil { opacity: 1; transform: none; pointer-events: auto; }

        @media (prefers-reduced-motion: reduce) { .muncul { opacity: 1; transform: none; transition: none; } * { animation: none !important; } }
    </style>
</head>

<body class="font-zelda">

    <!--- LATAR BELAKANG: progress bar, gambar, bintang, lapisan gelap otomatis, cahaya kursor (diatur js/bgScrollEffect.js) --->
    <div id="progress"></div>
    <div id="bg" class="fixed inset-x-0 -z-30 bg-cover bg-center bg-[url('images/hero/IGNIS.png')]" style="top:-6%;bottom:-6%"></div>
    <canvas id="stars" class="fixed inset-0 -z-20 w-full h-full pointer-events-none"></canvas>
    <div id="bg-overlay" class="fixed inset-0 -z-10 bg-black opacity-0 pointer-events-none"></div>
    <div id="glow"></div>

    <!--- NAVBAR: logo, menu desktop, ikon sosmed, tombol hamburger, menu hp (diatur js/mobileNav.js) --->
    <header id="header" class="z-[60] sticky top-0">
        <nav class="relative z-[60] flex items-center justify-between backdrop-blur-md bg-[#190805]/50 border-b border-[#F3B641]/20
            px-4 sm:px-6 md:px-10 xl:px-[70px] h-[76px] xl:h-[90px]">

            <!--- Logo + menu desktop (muncul mulai layar 1280px ke atas) --->
            <div class="flex flex-row items-center gap-6 xl:gap-12">
                <a href="#hero"><img class="h-12 xl:h-14 w-auto transition-transform duration-300 hover:rotate-[-8deg] hover:scale-110" src="./images/navbar/navbar-logo.svg" alt="Home"></a>

                <ul class="hidden xl:flex xl:flex-row gap-8 text-white text-[1.7rem]">
                    <li><a class="link-nav" href="#hero">Home</a></li>
                    <li><a class="link-nav" href="#aboutme">About Me</a></li>
                    <li><a class="link-nav" href="#myskills">My Skills</a></li>
                    <li><a class="link-nav" href="#activities">Activities</a></li>
                    <li><a class="link-nav" href="#experience">My Experience</a></li>
                </ul>
            </div>

            <div class="flex flex-row items-center gap-3">
                <!--- Ikon sosmed (desktop) --->
                <div class="hidden xl:flex xl:flex-row items-center gap-[15px]">
                    <a href="https://x.com/HMSI_ITS" class="transition duration-300 hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener">
                        <img class="w-11" src="./images/navbar/x-logo.svg" alt="X">
                    </a>
                    <a href="https://tiktok.com/@hmsi_its" class="transition duration-300 hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener">
                        <img class="w-11" src="./images/navbar/tiktok-logo.svg" alt="tiktok">
                    </a>
                    <a href="https://instagram.com/simetri.hmsiits" class="transition duration-300 hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener">
                        <img class="w-11" src="./images/navbar/ig-logo.svg" alt="instagram">
                    </a>
                    <a href="https://youtube.com/@layarHMSI" class="transition duration-300 hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener">
                        <img class="w-11" src="./images/navbar/yt-logo.svg" alt="youtube">
                    </a>
                </div>

                <!--- Tombol hamburger (hp & tablet) --->
                <button id="hamburgerBtn" aria-label="Menu" aria-expanded="false"
                    class="relative flex xl:hidden items-center justify-center w-[48px] h-[48px] bg-[#4C1C0E] rounded-lg z-[60] transition-transform active:scale-90">
                    <img id="iconHamburger" src="./images/navbar/menu.svg" alt="hamburger" class="absolute h-[38.97px] w-[38.97px]">
                    <img id="closeIcon" src="images/navbar/exit.svg" alt="exit" class="absolute h-[38.97px] w-[38.97px]">
                </button>
            </div>
        </nav>

        <!--- Menu layar penuh untuk hp & tablet --->
        <div id="mobileMenu" class="xl:hidden backdrop-blur-md bg-[#190805]/90 fixed inset-0 z-[50]">
            <div class="h-[90px]"></div>
            <ul class="flex flex-col items-center text-center py-6 text-white text-[2rem]">
                <li class="w-full py-3" style="--i:0"><a class="link-nav" href="#hero">Home</a></li>
                <li class="w-full py-3" style="--i:1"><a class="link-nav" href="#aboutme">About Me</a></li>
                <li class="w-full py-3" style="--i:2"><a class="link-nav" href="#myskills">My Skills</a></li>
                <li class="w-full py-3" style="--i:3"><a class="link-nav" href="#activities">Activities</a></li>
                <li class="w-full py-3" style="--i:4"><a class="link-nav" href="#experience">My Experience</a></li>

                <!--- Logo medsos di menu hp --->
                <li class="w-full py-6 flex justify-center items-center gap-6" style="--i:5">
                    <a href="https://instagram.com/simetri.hmsiits" target="_blank" rel="noopener"><img src="./images/navbar/ig-logo.svg" alt="ig" class="w-10 h-10 object-contain" /></a>
                    <a href="https://tiktok.com/@hmsi_its" target="_blank" rel="noopener"><img src="./images/navbar/tiktok-logo.svg" alt="tiktok" class="w-10 h-10 object-contain" /></a>
                    <a href="https://x.com/HMSI_ITS" target="_blank" rel="noopener"><img src="./images/navbar/x-logo.svg" alt="x" class="w-10 h-10 object-contain" /></a>
                    <a href="https://youtube.com/@layarHMSI" target="_blank" rel="noopener"><img src="./images/navbar/yt-logo.svg" alt="yt" class="w-10 h-10 object-contain" /></a>
                </li>
            </ul>
        </div>
    </header>

    <main class="text-white">

        <!--- SECTION 1 - HERO: judul, nama, tombol Explore More --->
        <section id="hero" class="w-full flex flex-col pt-[80px] md:pt-[180px] lg:pt-[230px] justify-center items-center gap-4 px-4 mb-16 md:mb-24">
            <h1 id="judulHero" class="judul text-center text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem]">My Portfolio</h1>

            <!--- Banner nama (kertas gulung) --->
            <div class="muncul flex w-[92vw] max-w-[700px] items-center justify-center px-8 py-3 lg:py-4 bg-center bg-no-repeat bg-[length:100%_100%]
                bg-[url('images/hero/paper-scroll-hero-mobile.svg')] lg:bg-[url('images/hero/paper-scroll-hero-desktop.svg')]" style="--i:6">
                <p class="text-[#7A3D21] text-[1.2rem] sm:text-[1.7rem] md:text-[2rem] font-times font-bold text-center">Fadilah Alifia Ramadhani.</p>
            </div>

            <!--- Tombol Explore More --->
            <div class="muncul mt-3" style="--i:7"><a href="#aboutme" class="tombol">Explore More</a></div>
        </section>

        <!--- SECTION 2 - ABOUT ME: kartu profil + perkenalan --->
        <section id="aboutme" class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 px-6 md:px-16 lg:px-[90px] mt-24 lg:mt-48 mb-16 md:mb-24">

            <!--- Kartu profil (miring ngikutin kursor, diatur script paling bawah) --->
            <div class="muncul order-1 lg:order-2 shrink-0">
                <div id="kartu" class="kartu relative w-[240px] md:w-[280px] lg:w-[340px] aspect-[700/1040]">
                    <img src="images/fotoku/my foto.png" alt="Kartu profil" class="absolute inset-0 w-full h-full z-10 pointer-events-none" />
                </div>
            </div>
            <!--- OPSIONAL: mau pakai frame HD (frame-idcard.svg) + foto sendiri? Ganti <img> di atas dengan dua baris ini:
                <img src="images/fotoku/foto-profil.png" alt="" class="absolute object-cover" style="left:15.7%;top:8.6%;width:68.6%;height:58.7%;border-radius:48% 48% 0 0/30% 30% 0 0">
                <img src="images/fotoku/frame-idcard.svg" alt="Kartu profil" class="absolute inset-0 w-full h-full z-10 pointer-events-none">
            --->

            <!--- Teks About Me --->
            <div class="muncul order-2 lg:order-1 flex flex-col gap-4 max-w-[560px] text-center lg:text-left" style="--i:2">
                <h1 class="judul text-center lg:text-left text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]">About Me</h1>
                <p class="font-times text-[#F9DCB4] text-[1.05rem] md:text-[1.25rem] lg:text-[1.5rem] leading-snug">
                    Halo, guys! Namaku Fadilah Alifia Ramadhani. Kalian bisa panggil aku Lifi.
                </p>
            </div>
        </section>

        <!--- SECTION 3 - MY SKILLS: papan kayu, tulisannya ikut mengecil di layar kecil --->
        <section id="myskills" class="flex flex-col items-center justify-center mt-28 md:mt-40 mb-16 md:mb-24 px-3">
            <h1 class="muncul judul text-center text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]">My Skills</h1>

            <div class="muncul papan relative w-[94vw] max-w-[25rem] md:max-w-none md:w-[500px] lg:w-[769px] mt-3">
                <!--- Papan untuk laptop/tablet --->
                <img src="images/images/My Skills/wood plank.svg" alt="Papan kayu" class="hidden md:block w-full">
                <!--- Papan untuk hp --->
                <img src="images/images/My Skills/wood plank - mobile.svg" alt="Papan kayu" class="block md:hidden w-full">

                <div class="papan-isi absolute inset-0 flex flex-col items-center text-[#592918]">
                    <h2>Aku suka belajar:</h2>
                    <ul class="font-times list-disc">
                        <li>Matematika</li>
                        <li>Bahasa Inggris</li>
                        <li>Biologi</li>
                    </ul>
                    <a href="#experience" class="tombol">My Experience</a>
                </div>
            </div>
        </section>

        <!--- SECTION 4 - MY FAVORITE ACTIVITIES: 4 kartu yang bisa diketuk / diklik, isinya muncul pelan-pelan --->
        <section id="activities" class="mt-28 md:mt-40 mb-16 md:mb-24 px-4">
            <h1 class="muncul judul text-center text-[3rem] md:text-[4.5rem] lg:text-[6rem]">My Favorite Activities</h1>
            <p class="muncul font-times text-[#F9DCB4] text-center text-[1.05rem] md:text-[1.25rem] mt-4" style="--i:1">Ketuk kartunya buat lihat ceritanya.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[900px] mx-auto mt-8 items-start">

                <!--- Kartu 1: Watching Movies (angka v = seberapa suka, 0 sampai 100) --->
                <div class="muncul" style="--i:0">
                    <button class="kg" aria-expanded="false">
                        <span class="ikon"><svg viewBox="0 0 24 24"><path d="M4 9h16v11H4zM4 9l2-5h3L7 9M10 9l2-5h3l-2 5M16 9l2-5h2l-1 5"/></svg></span>
                        <span class="nm">Watching Movies</span><span class="tanda">+</span>
                        <span class="isi"><span><span class="ket font-times">Nonton film itu cara favoritku buat istirahat. Genre apa pun aku jabanin, yang penting ceritanya seru.</span><span class="meter"><i style="--v:90%"></i></span></span></span>
                    </button>
                </div>

                <!--- Kartu 2: Playing Games --->
                <div class="muncul" style="--i:1">
                    <button class="kg" aria-expanded="false">
                        <span class="ikon"><svg viewBox="0 0 24 24"><path d="M7 8h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5 2.2l-1-1H9l-1 1A3 3 0 0 1 3 13v-1a4 4 0 0 1 4-4zM8 10.5v3M6.5 12h3"/><circle cx="16" cy="11.5" r=".7"/><circle cx="18" cy="13.5" r=".7"/></svg></span>
                        <span class="nm">Playing Games</span><span class="tanda">+</span>
                        <span class="isi"><span><span class="ket font-times">Main game buat lepas penat. Apalagi kalau lagi menang terus, senengnya nggak ketulungan.</span><span class="meter"><i style="--v:85%"></i></span></span></span>
                    </button>
                </div>

                <!--- Kartu 3: Main sama Temen-temen --->
                <div class="muncul" style="--i:2">
                    <button class="kg" aria-expanded="false">
                        <span class="ikon"><svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c0-4 2.5-6 5.5-6s5.5 2 5.5 6M14 15.5c.8-.4 1.6-.5 2.5-.5 2.8 0 5 1.8 5 5"/></svg></span>
                        <span class="nm">Main sama Temen-temen</span><span class="tanda">+</span>
                        <span class="isi"><span><span class="ket font-times">Ngumpul dan main sama temen-temen bikin capek hilang. Ketawa bareng itu paling juara.</span><span class="meter"><i style="--v:95%"></i></span></span></span>
                    </button>
                </div>

                <!--- Kartu 4: Hangout sama Keluarga --->
                <div class="muncul" style="--i:3">
                    <button class="kg" aria-expanded="false">
                        <span class="ikon"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5.5 9.5V20h13V9.5"/><path d="M12 17c-1.8-1.3-2.8-2.3-2.8-3.4 0-.9.7-1.5 1.4-1.5.6 0 1.1.4 1.4.9.3-.5.8-.9 1.4-.9.7 0 1.4.6 1.4 1.5 0 1.1-1 2.1-2.8 3.4z"/></svg></span>
                        <span class="nm">Hangout sama Keluarga</span><span class="tanda">+</span>
                        <span class="isi"><span><span class="ket font-times">Waktu paling nyaman buatku. Makan bareng, cerita-cerita santai, dan jalan bareng keluarga.</span><span class="meter"><i style="--v:100%"></i></span></span></span>
                    </button>
                </div>
            </div>
        </section>

        <!--- SECTION 5 - MY EXPERIENCE: 4 foto, 1 kolom di hp, 2 kolom di tablet/laptop --->
        <section id="experience" class="mt-28 md:mt-40 mb-32 px-4">
            <h1 class="muncul judul text-center text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]">My Experience</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-[1000px] mx-auto mt-8">
                <div class="muncul" style="--i:0"><div class="exp"><div class="foto-a"><img src="images/fotoku/foto1.png" alt="Deskripsi foto 1"></div></div></div>
                <div class="muncul" style="--i:1"><div class="exp"><div class="foto-a"><img src="images/fotoku/foto2.png" alt="Deskripsi foto 2"></div></div></div>
                <div class="muncul" style="--i:2"><div class="exp"><div class="foto-a"><img src="images/fotoku/foto3.png" alt="Deskripsi foto 3"></div></div></div>
                <div class="muncul" style="--i:3"><div class="exp"><div class="foto-a"><img src="images/fotoku/foto1.png" alt="Deskripsi foto 4"></div></div></div>
            </div>
        </section>
    </main>

    <!--- FOOTER: frame, menu bawah, copyright --->
    <footer class="w-full h-[500px] md:h-[350px] lg:h-[600px]
        bg-[url('images/footer/bg-footer.png')] bg-cover bg-center px-4 py-8 lg:px-[90px]
        lg:py-[88px] lg:border-t-[20px] lg:border-t-[#7A3D21] flex justify-center items-center">

        <!--- Frame footer (gambar beda untuk hp dan laptop) --->
        <div class="flex flex-col w-full h-[440px] md:w-[680px] lg:w-[1000px] lg:h-full
            bg-[url('images/footer/frame-footer-mobile.png')] md:bg-[url('images/footer/frame-footer-desktop.png')]
            bg-center bg-contain bg-no-repeat px-6 py-10 lg:px-[20px] lg:py-10 items-center justify-center">

            <!--- Menu footer --->
            <div class="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-2 md:gap-x-6">
                <a class="text-[#C07E4E] hover:text-[#F9DCB4] transition-colors text-[1.5rem] lg:text-[32px]" href="#hero">Home</a>
                <a class="text-[#C07E4E] hover:text-[#F9DCB4] transition-colors text-[1.5rem] lg:text-[32px]" href="#aboutme">About me</a>
                <a class="text-[#C07E4E] hover:text-[#F9DCB4] transition-colors text-[1.5rem] lg:text-[32px]" href="#myskills">My Skills</a>
                <a class="text-[#C07E4E] hover:text-[#F9DCB4] transition-colors text-[1.5rem] lg:text-[32px]" href="#activities">Activities</a>
                <a class="text-[#C07E4E] hover:text-[#F9DCB4] transition-colors text-[1.5rem] lg:text-[32px]" href="#experience">My Experience</a>
            </div>

            <!--- Copyright --->
            <p class="font-times font-bold text-[#F9DCB4] text-[15px] lg:text-[20px] mt-4">&copy; SIMETRI HMSI ITS</p>
        </div>
    </footer>

    <!--- Tombol kembali ke atas --->
    <button id="naik" aria-label="Ke atas">&uarr;</button>

    <!--- SCRIPT: mobileNav.js = navbar & menu hp, bgScrollEffect.js = efek latar saat scroll --->
    <script src="./js/mobileNav.js"></script>
    <script src="js/bgScrollEffect.js"></script>

    <!--- SCRIPT KECIL: judul hero, animasi muncul, kartu miring, tombol ketarik, kartu aktivitas --->
    <script>
        (() => {
            // judul hero dipecah per huruf biar bisa jatuh satu-satu
            const judul = document.getElementById('judulHero');
            let n = 0;
            judul.setAttribute('aria-label', judul.textContent.trim());
            judul.innerHTML = judul.textContent.trim().split(' ').map(k =>
                '<span class="kata" aria-hidden="true">' + [...k].map(c => `<span class="huruf" style="--n:${n++}">${c}</span>`).join('') + '</span>').join(' ');

            // elemen .muncul tampil pelan saat masuk layar
            const io = new IntersectionObserver(es => es.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('tampil'); io.unobserve(e.target); }
            }), { threshold: 0.12 });
            document.querySelectorAll('.muncul').forEach(el => io.observe(el));

            // kartu profil miring ngikutin kursor (gerakannya dikejar pelan biar halus)
            const kartu = document.getElementById('kartu');
            let rx = 0, ry = 0, tx = 0, ty = 0, jalan = false;
            function step() {
                rx += (tx - rx) * .1; ry += (ty - ry) * .1;
                kartu.style.transform = `perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`;
                if (Math.abs(tx - rx) > .01 || Math.abs(ty - ry) > .01) requestAnimationFrame(step); else jalan = false;
            }
            kartu.addEventListener('pointermove', e => {
                if (e.pointerType === 'touch') return;
                const r = kartu.getBoundingClientRect();
                ty = ((e.clientX - r.left) / r.width - .5) * 20;
                tx = (.5 - (e.clientY - r.top) / r.height) * 20;
                if (!jalan) { jalan = true; requestAnimationFrame(step); }
            });
            kartu.addEventListener('pointerleave', () => { tx = ty = 0; if (!jalan) { jalan = true; requestAnimationFrame(step); } });

            // tombol agak ketarik ke arah kursor (cuma di desktop)
            document.querySelectorAll('.tombol').forEach(b => {
                b.addEventListener('pointermove', e => {
                    if (e.pointerType !== 'mouse') return;
                    const r = b.getBoundingClientRect();
                    b.style.translate = `${(e.clientX - r.left - r.width / 2) * .15}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
                });
                b.addEventListener('pointerleave', () => { b.style.translate = ''; });
            });

            // kartu aktivitas: ketuk buat buka / tutup
            document.querySelectorAll('.kg').forEach(k => k.addEventListener('click', () => {
                k.setAttribute('aria-expanded', k.classList.toggle('buka'));
            }));
        })();
    </script>
</body>

</html>