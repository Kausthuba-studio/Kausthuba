const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const headerContent = `    <!-- =========================================================================
     HEADER / NAVBAR (UNIFIED TYPOGRAPHY & TEXT-HOVER STYLE)
     ========================================================================= -->
    <header class="fixed md:absolute top-0 left-0 w-full z-50 px-4 md:px-12 py-3 md:py-8 bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500" id="navbar">
        <nav class="max-w-7xl mx-auto flex justify-between items-center text-brand-black">
            
            <!-- Brand Logo -->
            <a href="../index.html#hero" class="flex items-center gap-3 group">
                <img src="../assets/images/kausthuba-logo.png" alt="Kausthuba Studio Logo" class="h-9 w-9 rounded-full object-cover border border-brand-ruby shadow-md transition-transform duration-300 group-hover:scale-110" />
                <div class="flex flex-col text-left">
                    <span class="text-xs font-black tracking-[0.25em] uppercase text-brand-black">KAUSTHUBA</span>
                    <span class="text-[9px] font-mono tracking-widest text-brand-ruby uppercase">AI Creative Studio</span>
                </div>
            </a>

            <!-- Navigation Menu -->
            <ul class="hidden md:flex items-center space-x-8 lg:space-x-10 text-xs font-bold tracking-[0.2em] uppercase text-gray-700">
                <!-- Home -->
                <li>
                    <a href="../index.html#hero" class="nav-link relative py-1 hover:text-brand-ruby transition-colors">Home</a>
                </li>

                <!-- Studio Dropdown -->
                <li class="relative group py-1">
                    <a href="../index.html#about" class="nav-link inline-flex items-center gap-1.5 hover:text-brand-ruby transition-colors cursor-pointer">
                        Studio <span class="text-[8px] transition-transform duration-300 group-hover:rotate-180 text-brand-ruby">▼</span>
                    </a>
                    <div class="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-black/10 shadow-xl space-y-2 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-700">
                            <a href="../index.html#about" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                Studio Overview
                            </a>
                            <a href="../index.html#stack-container" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                The Kausthuba Edge
                            </a>
                        </div>
                    </div>
                </li>

                <!-- Process Dropdown -->
                <li class="relative group py-1">
                    <a href="../index.html#working-process-section" class="nav-link inline-flex items-center gap-1.5 hover:text-brand-ruby transition-colors cursor-pointer">
                        Process <span class="text-[8px] transition-transform duration-300 group-hover:rotate-180 text-brand-ruby">▼</span>
                    </a>
                    <div class="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-black/10 shadow-xl space-y-2 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-700">
                            <a href="../index.html#commercial-standard" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                120-Second Commercial Arc
                            </a>
                            <a href="../index.html#pipeline-diamond-section" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                Production Pipeline
                            </a>
                            <a href="../index.html#s06-sprint-section" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                Creative Design Sprint
                            </a>
                            <a href="../index.html#working-process-section" class="block py-1.5 px-2 hover:text-brand-ruby transition-colors">
                                Production Schedule
                            </a>
                        </div>
                    </div>
                </li>

                <!-- Our Work -->
                <li>
                    <a href="../index.html#s09a-wall-of-works" class="nav-link relative py-1 hover:text-brand-ruby transition-colors">Our Work</a>
                </li>

                <!-- Client Reviews -->
                <li>
                    <a href="../index.html#sec-testimonials" class="nav-link relative py-1 hover:text-brand-ruby transition-colors">Client Reviews</a>
                </li>

                <!-- FAQ -->
                <li>
                    <a href="../index.html#sec-faq" class="nav-link relative py-1 hover:text-brand-ruby transition-colors">FAQ</a>
                </li>
            </ul>

            <!-- Header Actions: Start a Project + Mobile Menu Toggle -->
            <div class="flex items-center gap-3">
                <a href="../index.html#sec-inquiry" class="hidden sm:inline-flex items-center justify-center border border-brand-black px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-ruby hover:border-brand-ruby hover:text-white transition-all duration-300">
                    Start a Project ↗
                </a>

                <!-- Mobile Hamburger Menu Button (3 horizontal bars) -->
                <button id="mobile-menu-toggle" class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-black/5 hover:bg-brand-ruby/10 border border-black/10 transition-all p-2.5 z-50 cursor-pointer shadow-sm" aria-label="Toggle Mobile Navigation">
                    <span class="w-5 h-[2px] bg-brand-black transition-all duration-300 origin-center mb-1.5 bar-top rounded-full"></span>
                    <span class="w-5 h-[2px] bg-brand-ruby transition-all duration-300 origin-center mb-1.5 bar-mid rounded-full"></span>
                    <span class="w-5 h-[2px] bg-brand-black transition-all duration-300 origin-center bar-bot rounded-full"></span>
                </button>
            </div>

        </nav>
    </header>

    <!-- =========================================================================
     MOBILE NAVIGATION DRAWER OVERLAY (STREAMLINED & UNIFIED WITH TOPBAR NAVBAR)
     ========================================================================= -->
    <div id="mobile-nav-drawer" class="fixed inset-0 h-[100dvh] max-h-[100dvh] z-[9999] opacity-0 pointer-events-none transition-all duration-300 flex flex-col justify-between p-5 sm:p-7 md:hidden overflow-hidden">
        
        <!-- Top bar with brand and close button (Fixed Header) -->
        <div class="flex items-center justify-between border-b border-white/10 pb-3.5 shrink-0">
            <a href="../index.html#hero" class="flex items-center gap-3 mobile-nav-link group">
                <img src="../assets/images/kausthuba-logo.png" alt="Kausthuba Logo" class="w-9 h-9 rounded-full border border-brand-ruby shadow-md" />
                <div class="flex flex-col text-left">
                    <span class="text-xs font-black tracking-[0.25em] uppercase text-white font-mono">KAUSTHUBA</span>
                    <span class="text-[9px] font-mono tracking-widest text-brand-ruby uppercase">AI Creative Studio</span>
                </div>
            </a>
            <button id="mobile-menu-close" class="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-base border border-white/15 hover:bg-brand-ruby hover:border-brand-ruby transition-all cursor-pointer shadow-md" aria-label="Close Navigation Menu">
                ✕
            </button>
        </div>

        <!-- Scrollable Links List (Aligned with Topbar Navbar & No Numbers) -->
        <div id="mobile-nav-links-scroll" class="flex-1 min-h-0 overflow-y-auto py-3 space-y-3 font-mono text-xs uppercase tracking-wider pr-1.5 my-1.5">
            
            <!-- Home -->
            <div>
                <a href="../index.html#hero" class="mobile-nav-link mobile-nav-item block py-2 px-3 rounded-xl text-white/95 hover:text-white flex items-center justify-between font-bold text-sm">
                    <span>Home</span>
                    <span class="text-brand-ruby text-sm opacity-60">→</span>
                </a>
            </div>

            <!-- Studio Group -->
            <div class="space-y-1">
                <span class="text-[9px] text-brand-ruby font-bold tracking-[0.25em] block px-3 mb-1">// STUDIO</span>
                <a href="../index.html#about" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Studio Overview</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#stack-container" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>The Kausthuba Edge</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
            </div>

            <!-- Process Group -->
            <div class="space-y-1">
                <span class="text-[9px] text-brand-ruby font-bold tracking-[0.25em] block px-3 mb-1">// PROCESS</span>
                <a href="../index.html#commercial-standard" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>120s Commercial Arc</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#pipeline-diamond-section" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Production Pipeline</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#s06-sprint-section" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Creative Design Sprint</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#working-process-section" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Production Schedule</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
            </div>

            <!-- Work & FAQ -->
            <div class="space-y-1">
                <span class="text-[9px] text-brand-ruby font-bold tracking-[0.25em] block px-3 mb-1">// WORK & FAQ</span>
                <a href="../index.html#s09a-wall-of-works" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Our Work</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#sec-testimonials" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>Client Reviews</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
                <a href="../index.html#sec-faq" class="mobile-nav-link mobile-nav-item block py-1.5 px-3 rounded-xl text-white/85 hover:text-white flex items-center justify-between font-bold">
                    <span>FAQ</span>
                    <span class="text-brand-ruby text-xs opacity-60">→</span>
                </a>
            </div>

            <div class="h-6 shrink-0"></div>
        </div>

        <!-- Bottom Action CTA & Coordinates (Fixed Footer with Safe-Area Clearance) -->
        <div class="pt-3 border-t border-white/10 space-y-2.5 shrink-0 bg-[#08090c]/60 backdrop-blur-md">
            <a href="../index.html#sec-inquiry" class="mobile-nav-link w-full py-3 bg-gradient-to-r from-[#9B111E] to-[#7a0d17] hover:from-[#b51423] hover:to-[#9B111E] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(155,17,30,0.35)] border border-[#9B111E]/50 transition-all">
                <span>START A PROJECT COMMISSION</span>
                <span>↘</span>
            </a>
            <div class="flex justify-between items-center text-[9px] font-mono text-gray-400">
                <span>RAJAHMUNDRY, AP, INDIA</span>
                <span class="text-brand-ruby font-bold">IST UTC +5:30</span>
            </div>
        </div>

    </div>`;

const footerContent = `    <!-- =========================================================================
     FOOTER / BOTTOM NAVIGATION (UNIFIED BRAND PALETTE & SOCIAL CHANNELS)
     ========================================================================= -->
    <footer class="bg-[#F5F5F7] text-[#111111] border-t border-[#9B111E]/20 pt-12 pb-10 px-6 sm:px-12 relative z-40 mt-0 font-sans shadow-[0_-20px_50px_rgba(0,0,0,0.08)]" id="site-footer">
        
        <div class="max-w-[1440px] mx-auto relative z-10">
            
            <!-- TOP ROW: BRAND STATEMENT & NAVIGATION GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#9B111E]/15">
                
                <!-- Left Column: Identity & Commission CTA -->
                <div class="lg:col-span-5 flex flex-col justify-between items-start">
                    <div>
                        <!-- Studio Identity Node -->
                        <div class="flex items-center gap-3.5 mb-6">
                            <img src="../assets/images/kausthuba-logo.png" alt="Kausthuba Studio Logo" class="w-10 h-10 rounded-xl object-cover shadow-[0_0_15px_rgba(155,17,30,0.35)] border border-[#9B111E]/20" />
                            <span class="text-base font-sans font-black tracking-tight uppercase text-[#111111]">KAUSTHUBA | AI CREATIVE STUDIO</span>
                        </div>

                        <!-- Main Statement -->
                        <h2 class="text-2xl sm:text-3xl font-sans font-black tracking-tight text-[#111111] leading-[1.25] max-w-md">
                            We turn brands and vision into cinematic stories through AI motion.
                        </h2>
                    </div>

                    <!-- Direct Commission CTA Link -->
                    <a href="contact.html" class="inline-flex items-center gap-2 mt-8 text-[11px] font-mono font-bold text-[#9B111E] uppercase tracking-widest group border-b-2 border-[#9B111E] pb-1 hover:text-[#111111] hover:border-[#111111] transition-colors">
                        <span>START A PROJECT COMMISSION</span>
                        <span class="group-hover:translate-x-1 transition-transform">↘</span>
                    </a>
                </div>

                <!-- Right Navigation Columns -->
                <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
                    
                    <!-- Col 1: Studio Navigation -->
                    <div>
                        <span class="block text-[9px] font-mono text-[#9B111E] font-bold tracking-widest uppercase mb-4">// NAVIGATION</span>
                        <ul class="space-y-3 text-xs font-mono text-gray-700">
                            <li><a href="../index.html#hero" class="hover:text-[#9B111E] transition-colors">Home</a></li>
                            <li><a href="about.html" class="hover:text-[#9B111E] transition-colors">Studio Overview</a></li>
                            <li><a href="../index.html#stack-container" class="hover:text-[#9B111E] transition-colors">The Kausthuba Edge</a></li>
                            <li><a href="works.html" class="hover:text-[#9B111E] transition-colors">Our Work</a></li>
                            <li><a href="testimonials.html" class="hover:text-[#9B111E] transition-colors">Client Reviews</a></li>
                            <li><a href="contact.html" class="hover:text-[#9B111E] transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <!-- Col 2: Production Process -->
                    <div>
                        <span class="block text-[9px] font-mono text-[#9B111E] font-bold tracking-widest uppercase mb-4">// PROCESS</span>
                        <ul class="space-y-3 text-xs font-mono text-gray-700">
                            <li><a href="../index.html#commercial-standard" class="hover:text-[#9B111E] transition-colors">120s Commercial Arc</a></li>
                            <li><a href="../index.html#pipeline-diamond-section" class="hover:text-[#9B111E] transition-colors">Production Pipeline</a></li>
                            <li><a href="../index.html#s06-sprint-section" class="hover:text-[#9B111E] transition-colors">Creative Design Sprint</a></li>
                            <li><a href="../index.html#working-process-section" class="hover:text-[#9B111E] transition-colors">Production Schedule</a></li>
                        </ul>
                    </div>

                    <!-- Col 3: Direct Connect (UPDATED SOCIAL LINKS) -->
                    <div class="col-span-2 sm:col-span-1">
                        <span class="block text-[9px] font-mono text-[#9B111E] font-bold tracking-widest uppercase mb-4">// CONNECT</span>
                        <ul class="space-y-3 text-xs font-mono text-gray-700">
                            <li>
                                <a href="https://www.instagram.com/kausthuba.studio/" target="_blank" rel="noopener noreferrer" class="hover:text-[#9B111E] transition-colors inline-flex items-center gap-1">
                                    Instagram ↗
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/@kausthuba.studio" target="_blank" rel="noopener noreferrer" class="hover:text-[#9B111E] transition-colors inline-flex items-center gap-1">
                                    YouTube ↗
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/kausthuba-studio/home/" target="_blank" rel="noopener noreferrer" class="hover:text-[#9B111E] transition-colors inline-flex items-center gap-1">
                                    LinkedIn ↗
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/people/Kausthuba-AI-Creative-Studio/61595798758241/" target="_blank" rel="noopener noreferrer" class="hover:text-[#9B111E] transition-colors inline-flex items-center gap-1">
                                    Facebook ↗
                                </a>
                            </li>
                            <li>
                                <a href="mailto:kausthuba.studio@gmail.com" class="hover:text-[#9B111E] transition-colors inline-flex items-center gap-1">
                                    Direct Email ↗
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <!-- BOTTOM ROW: CONTACT, LOCATION & COPYRIGHT -->
            <div class="pt-8 pb-16 md:pb-0 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-4 text-[10px] font-mono text-gray-500">
                
                <div>
                    Contact us: <a href="mailto:kausthuba.studio@gmail.com" class="font-bold text-[#111111] hover:text-[#9B111E] transition-colors">kausthuba.studio@gmail.com</a>
                </div>

                <div>
                    Find us: <strong class="text-[#111111]">Rajahmundry, Andhra Pradesh, India</strong> (17.000° N, 81.780° E • IST UTC +5:30)
                </div>

                <div>
                    © 2026 <strong class="text-[#111111]">Kausthuba | AI Creative Studio</strong>. All rights reserved. • <a href="privacy-policy.html" class="hover:text-[#9B111E] transition-colors">Privacy Policy</a>
                </div>

            </div>

        </div>
    </footer>`;

const targetFiles = [
    'about.html',
    'contact.html',
    'works.html',
    'testimonials.html',
    'privacy-policy.html'
];

targetFiles.forEach(fileName => {
    const filePath = path.join(rootDir, 'pages', fileName);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Remove rogue scroll-behavior: smooth from style tags to eliminate auto-scrolling
    html = html.replace(/scroll-behavior:\s*smooth;?/gi, 'scroll-behavior: auto !important;');

    // 2. Ensure ../css/styles.css and ../js/site-renderer.js are in <head>
    html = html.replace(/href="styles\.css"/g, 'href="../css/styles.css"');
    html = html.replace(/href="css\/styles\.css"/g, 'href="../css/styles.css"');
    html = html.replace(/src="site-renderer\.js"/g, 'src="../js/site-renderer.js"');
    html = html.replace(/src="js\/site-renderer\.js"/g, 'src="../js/site-renderer.js"');
    
    if (!html.includes('../css/styles.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="../css/styles.css">\n</head>');
    }
    if (!html.includes('../js/site-renderer.js')) {
        html = html.replace('</head>', '    <script src="../js/site-renderer.js"></script>\n</head>');
    }

    // 3. Replace Header & Mobile Drawer cleanly up to the first <section
    const headerWithDrawerRegex = /(?:<!--\s*={5,}\s*HEADER[\s\S]*?|<header[\s\S]*?)<\/header>[\s\S]*?(?=\s*<section)/i;

    if (headerWithDrawerRegex.test(html)) {
        html = html.replace(headerWithDrawerRegex, headerContent + '\n\n    ');
    }

    // 4. Replace Footer
    const footerRegex = /<!--\s*={5,}\s*FOOTER[\s\S]*?<\/footer>/i;
    const fallbackFooterRegex = /<footer[\s\S]*?<\/footer>/i;

    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, footerContent);
    } else if (fallbackFooterRegex.test(html)) {
        html = html.replace(fallbackFooterRegex, footerContent);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[Synced Header & Footer]: ${fileName}`);
});
