/**
 * ============================================================================
 * KAUSTHUBA STUDIO — MODULAR SITE HYDRATION & CONFIG RENDERER
 * ============================================================================
 * Reads configuration from window.SITE_CONFIG (config/site-config.js) and
 * dynamically updates the DOM elements.
 * 
 * Allows users to swap ANY image, video, text, metric, or link in 1 line
 * inside config/site-config.js without modifying HTML markup or breaking
 * GSAP / 3D orbital animation parameters.
 * ============================================================================
 */

(function () {
    'use strict';

    function getCfg() {
        return window.SITE_CONFIG || null;
    }

    // Helper: Safely update video source
    function setVideoSrc(videoEl, newSrc) {
        if (!videoEl || !newSrc) return;
        const source = videoEl.querySelector('source') || videoEl;
        const currentSrc = source.getAttribute('src');
        if (currentSrc !== newSrc) {
            source.setAttribute('src', newSrc);
            if (videoEl.load) videoEl.load();
        }
    }

    // Helper: Safely update image source
    function setImgSrc(imgEl, newSrc, altText) {
        if (!imgEl || !newSrc) return;
        if (imgEl.getAttribute('src') !== newSrc) {
            imgEl.setAttribute('src', newSrc);
        }
        if (altText) imgEl.setAttribute('alt', altText);
    }

    // ------------------------------------------------------------------------
    // 1. Commercial Arc (5 Expandable Cutout Cards)
    // ------------------------------------------------------------------------
    function updateCommercialArc(cfg) {
        if (!cfg || !cfg.commercialArc || !cfg.commercialArc.stages) return;
        const cards = document.querySelectorAll('#expandable-cards-wrapper .expand-card');
        cfg.commercialArc.stages.forEach((stage, idx) => {
            const card = cards[idx];
            if (!card) return;

            const cutoutImg = card.querySelector('.card-cutout-img');
            setImgSrc(cutoutImg, stage.cutout, stage.cutoutAlt);

            const titleEl = card.querySelector('h3');
            if (titleEl && stage.title) titleEl.textContent = stage.title;

            const descEl = card.querySelector('.card-expanded-view p');
            if (descEl && stage.description) descEl.textContent = stage.description;
        });
    }

    // ------------------------------------------------------------------------
    // 2. Creative Sprint (5 3D Flip Cards with Cover Images)
    // ------------------------------------------------------------------------
    function updateSprint(cfg) {
        if (!cfg || !cfg.sprint || !cfg.sprint.cards) return;
        const cards = document.querySelectorAll('#s06-spatial-container .s06-spatial-card');
        cfg.sprint.cards.forEach((c, idx) => {
            const card = cards[idx];
            if (!card) return;

            const img = card.querySelector('.s06-flip-front img');
            setImgSrc(img, c.image, c.imageAlt || c.title);

            const frontTitle = card.querySelector('.s06-flip-front h3');
            if (frontTitle && c.title) frontTitle.textContent = c.title;

            const backTitle = card.querySelector('.s06-flip-back h3');
            if (backTitle && c.title) backTitle.textContent = c.title;

            const backDesc = card.querySelector('.s06-flip-back p');
            if (backDesc && c.description) backDesc.textContent = c.description;
        });
    }

    // ------------------------------------------------------------------------
    // 3. Wall of Works Infinite Marquee Images
    // ------------------------------------------------------------------------
    function updateWallOfWorks(cfg) {
        if (!cfg || !cfg.wallOfWorks) return;
        const tracks = document.querySelectorAll('#s09a-wall-of-works-tracks .s09a-marquee-track');

        const rows = [cfg.wallOfWorks.row1, cfg.wallOfWorks.row2, cfg.wallOfWorks.row3];
        tracks.forEach((track, rowIdx) => {
            const rowData = rows[rowIdx];
            if (!rowData) return;

            const imgs = track.querySelectorAll('img');
            imgs.forEach((img, imgIdx) => {
                const item = rowData[imgIdx % rowData.length];
                if (item) setImgSrc(img, item.src, item.alt);
            });
        });
    }

    // ------------------------------------------------------------------------
    // 4. Selected Works (3D Revolving Reel: Cards 01-05 + Card 06 Collage Hub)
    // ------------------------------------------------------------------------
    function updateSelectedWorks(cfg) {
        if (!cfg || !cfg.selectedWorks) return;
        const cards = document.querySelectorAll('#s09-orbit-ring .s09-3d-card');

        cfg.selectedWorks.forEach((w, idx) => {
            const card = cards[idx];
            if (!card) return;

            // Card 06: SHOW ALL WORKS COLLAGE HUB
            if (w.isCollageHub || card.classList.contains('card-06')) {
                if (w.collageVideos && Array.isArray(w.collageVideos)) {
                    const collageVideos = card.querySelectorAll('video');
                    w.collageVideos.forEach((vSrc, vIdx) => {
                        setVideoSrc(collageVideos[vIdx], vSrc);
                    });
                }
                const titleEl = card.querySelector('h3');
                if (titleEl && w.title) titleEl.textContent = w.title;

                const descEl = card.querySelector('p');
                if (descEl && w.desc) descEl.textContent = w.desc;

                const ctaEl = card.querySelector('a');
                if (ctaEl) {
                    if (w.ctaText) ctaEl.textContent = w.ctaText;
                    if (w.ctaHref) ctaEl.setAttribute('href', w.ctaHref);
                }
                return;
            }

            // Cards 01-05: Case Studies
            const video = card.querySelector('.s09-card-front video');
            setVideoSrc(video, w.video);

            const titleEl = card.querySelector('.s09-card-front h3');
            if (titleEl && w.title) titleEl.textContent = w.title;

            const clientEl = card.querySelector('.s09-card-front span.block');
            if (clientEl && w.client) clientEl.textContent = `// CLIENT: ${w.client}`;

            const descEl = card.querySelector('.s09-card-front p');
            if (descEl && w.shortDesc) descEl.textContent = w.shortDesc;

            // Card Back
            const backTitle = card.querySelector('.s09-card-back h4');
            if (backTitle && w.backTitle) backTitle.textContent = w.backTitle;

            const backNarrative = card.querySelector('.s09-card-back p');
            if (backNarrative && w.backNarrative) backNarrative.textContent = w.backNarrative;

            const ctaBtn = card.querySelector('.s09-card-back .s09-cta-btn') || card.querySelector('.s09-card-back a.s09-cta-btn') || card.querySelector('.s09-card-back > div:last-child > a:last-child');
            if (ctaBtn) {
                if (w.ctaText) ctaBtn.textContent = w.ctaText;
                if (w.ctaHref) ctaBtn.setAttribute('href', w.ctaHref);
            }
        });
    }

    // ------------------------------------------------------------------------
    // 5. What Our Clients Say (Exact 3 Cards)
    // ------------------------------------------------------------------------
    function updateTestimonials(cfg) {
        if (!cfg || !cfg.testimonials) return;
        const cards = document.querySelectorAll('#tm-cards-reel .tm-glass-card');

        cfg.testimonials.forEach((c, idx) => {
            const card = cards[idx];
            if (!card) return;

            // Card 01: BE OUR FIRST CUSTOMER
            if (c.type === 'firstCustomer' || idx === 0) {
                const titleEl = card.querySelector('h3');
                if (titleEl && c.title) titleEl.innerHTML = c.title;

                const quoteEl = card.querySelector('p');
                if (quoteEl && c.quote) quoteEl.textContent = c.quote;

                const ctaEl = card.querySelector('a');
                if (ctaEl) {
                    if (c.ctaText) ctaEl.textContent = c.ctaText;
                    if (c.ctaHref) ctaEl.setAttribute('href', c.ctaHref);
                }
            }
            // Card 02: SEE ALL REVIEWS
            else if (c.type === 'archive' || idx === 1) {
                const titleEl = card.querySelector('h3');
                if (titleEl && c.title) titleEl.innerHTML = c.title;

                const descEl = card.querySelector('p');
                if (descEl && c.desc) descEl.textContent = c.desc;

                const ctaEl = card.querySelector('a');
                if (ctaEl) {
                    if (c.ctaText) ctaEl.textContent = c.ctaText;
                    if (c.ctaHref) ctaEl.setAttribute('href', c.ctaHref);
                }
            }
            // Card 03: THAT'S ALL FOR NOW (Video Card)
            else if (c.type === 'videoCard' || idx === 2) {
                const video = card.querySelector('video');
                setVideoSrc(video, c.video);

                const titleEl = card.querySelector('h3');
                if (titleEl && c.title) titleEl.innerHTML = c.title;

                const descEl = card.querySelector('p');
                if (descEl && c.desc) descEl.textContent = c.desc;

                const ctaEl = card.querySelector('a');
                if (ctaEl) {
                    if (c.ctaText) ctaEl.textContent = c.ctaText;
                    if (c.ctaHref) {
                        ctaEl.setAttribute('href', c.ctaHref);
                        card.style.cursor = 'pointer';
                        card.onclick = () => { window.location.href = c.ctaHref; };
                    }
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // 6. Capabilities & Narrative Angles (#sec-capabilities)
    // ------------------------------------------------------------------------
    function updateCapabilities(cfg) {
        if (!cfg || !cfg.capabilities) return;
        const items = document.querySelectorAll('#s11-services-list .s11-service-item');
        const videos = document.querySelectorAll('#s11-floating-card video');

        cfg.capabilities.forEach((cap, idx) => {
            const item = items[idx];
            if (item) {
                const titleEl = item.querySelector('h3');
                if (titleEl && cap.title) {
                    const arrow = titleEl.querySelector('.s11-arrow');
                    titleEl.textContent = cap.title;
                    if (arrow) titleEl.prepend(arrow);
                }
                const descEl = item.querySelector('p');
                if (descEl && cap.description) descEl.textContent = cap.description;
            }

            const video = videos[idx];
            if (video && cap.video) {
                setVideoSrc(video, cap.video);
            }
        });
    }

    // ------------------------------------------------------------------------
    // 7. FAQ Section (#sec-faq) — All 5 Cards
    // ------------------------------------------------------------------------
    function updateFaq(cfg) {
        if (!cfg || !cfg.faq) return;

        cfg.faq.forEach(item => {
            const card = document.getElementById(item.id);
            if (!card) return;

            // Card 05: Popping bottom CTA card
            if (item.isCtaCard || item.id === 'faq-card-5') {
                const titleEl = card.querySelector('h4');
                if (titleEl && item.title) titleEl.textContent = item.title;

                const descEl = card.querySelector('p');
                if (descEl && item.desc) descEl.textContent = item.desc;

                const ctaLinks = card.querySelectorAll('a');
                ctaLinks.forEach(ctaLink => {
                    if (item.ctaHref) ctaLink.setAttribute('href', item.ctaHref);
                });
                const firstLink = ctaLinks[0];
                if (firstLink && item.ctaText) firstLink.textContent = item.ctaText;
                return;
            }

            // Cards 01-04: Accordion Questions
            const questionEl = card.querySelector('.faq-trigger h3');
            if (questionEl && item.question) questionEl.textContent = item.question;

            const answerEl = card.querySelector('.faq-content p');
            if (answerEl && item.answer) answerEl.textContent = item.answer;
        });
    }

    // ------------------------------------------------------------------------
    // 8. Bento Grid Media (#sec-14-stage)
    // ------------------------------------------------------------------------
    function updateBento(cfg) {
        if (!cfg || !cfg.bento) return;
        const heroVideo = document.getElementById('hero-bg-video');
        if (heroVideo && cfg.bento.centerVideo) {
            setVideoSrc(heroVideo, cfg.bento.centerVideo);
        }
    }

    // ------------------------------------------------------------------------
    // 9. Mobile Navigation Drawer & Hamburger Controller
    // ------------------------------------------------------------------------
    function initMobileNav() {
        const toggle = document.getElementById("mobile-menu-toggle");
        const close = document.getElementById("mobile-menu-close");
        const drawer = document.getElementById("mobile-nav-drawer");
        const links = document.querySelectorAll(".mobile-nav-link");

        if (!toggle || !drawer || toggle.dataset.navBound === "true") return;
        toggle.dataset.navBound = "true";

        function openDrawer() {
            drawer.classList.add("is-active");
            toggle.classList.add("is-active");
            document.body.style.overflow = "hidden";
            if (window.lenis) window.lenis.stop();
        }

        function closeDrawer() {
            drawer.classList.remove("is-active");
            toggle.classList.remove("is-active");
            document.body.style.overflow = "";
            if (window.lenis) window.lenis.start();
        }

        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (drawer.classList.contains("is-active")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        if (close) {
            close.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeDrawer();
            });
        }

        links.forEach(l => {
            l.addEventListener("click", () => {
                closeDrawer();
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer.classList.contains("is-active")) {
                closeDrawer();
            }
        });

        window.openMobileNav = openDrawer;
        window.closeMobileNav = closeDrawer;
    }

    // ------------------------------------------------------------------------
    // 10. Universal Seamless Navigation & Hash Glider
    // ------------------------------------------------------------------------
    function initNavigationHandler() {
        if (window.__navHandlerInitialized) return;
        window.__navHandlerInitialized = true;

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href) return;

            // Handle external links or mailto
            if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) {
                return;
            }

            // Check if href points to an anchor hash (e.g. "#about" or "../index.html#about" or "index.html#about")
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                const hash = href.substring(hashIndex);
                if (!hash || hash === '#') return;

                const isMainPage = document.getElementById('anti-ai-factory') !== null ||
                                   window.location.pathname === '/' ||
                                   window.location.pathname.endsWith('index.html');

                if (isMainPage) {
                    // We are on index.html! Smoothly glide to the target section
                    const targetEl = document.querySelector(hash);
                    if (targetEl) {
                        e.preventDefault();
                        if (window.closeMobileNav) window.closeMobileNav();
                        if (window.lenis) {
                            window.lenis.scrollTo(targetEl, { offset: -30, duration: 1.2 });
                        } else {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                        if (history.pushState) {
                            history.pushState(null, '', hash);
                        } else {
                            window.location.hash = hash;
                        }
                    }
                } else {
                    // We are on a subpage in /pages/!
                    // Navigate cleanly to index.html with the target hash
                    e.preventDefault();
                    if (window.closeMobileNav) window.closeMobileNav();
                    const targetUrl = (window.location.protocol === 'file:') ? ('../index.html' + hash) : ('/index.html' + hash);
                    window.location.href = targetUrl;
                }
            }
        });

        // On main page load, if a hash exists, glide to it after hydration
        const isMainPage = document.getElementById('anti-ai-factory') !== null ||
                           window.location.pathname === '/' ||
                           window.location.pathname.endsWith('index.html');

        if (isMainPage && window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target && window.lenis) {
                    window.lenis.scrollTo(target, { offset: -30, duration: 1.2 });
                }
            }, 300);
        }
    }

    // ------------------------------------------------------------------------
    // MASTER HYDRATION FUNCTION
    // ------------------------------------------------------------------------
    function renderSite() {
        initMobileNav();
        initNavigationHandler();
        const cfg = getCfg();
        if (!cfg) return;

        try {
            updateCommercialArc(cfg);
            updateSprint(cfg);
            updateWallOfWorks(cfg);
            updateSelectedWorks(cfg);
            updateTestimonials(cfg);
            updateCapabilities(cfg);
            updateFaq(cfg);
            updateBento(cfg);

            document.dispatchEvent(new CustomEvent('siteConfigHydrated'));
        } catch (e) {
            console.error('[SiteRenderer] Hydration error:', e);
        }
    }

    // Execute immediately or at first DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initMobileNav();
            initNavigationHandler();
            renderSite();
        }, { once: true });
    } else {
        initMobileNav();
        initNavigationHandler();
        renderSite();
    }

    window.renderSiteConfig = renderSite;
})();
