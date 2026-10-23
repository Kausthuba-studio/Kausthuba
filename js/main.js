document.addEventListener("DOMContentLoaded", () => {
    
    // Hydrate modular components from config/site-config.js before initializing GSAP
    if (typeof window.renderSiteConfig === 'function') {
        window.renderSiteConfig();
    }
    
    // 1. Ultra-Smooth Scroll Configuration via Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        smoothWheel: true,
    });

    window.lenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    // =========================================================================
    // MOBILE NAVIGATION DRAWER & HAMBURGER CONTROLLER (HANDLED BY SITE-RENDERER)
    // =========================================================================
    // Note: Mobile drawer opening/closing is cleanly managed by site-renderer.js
    // to prevent double-click event interference across all template pages.

    // =========================================================================
    // SECTION 01: HERO (#hero)
    // =========================================================================
    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom 10%",
        onLeave: () => {
            if (window.innerWidth >= 768) {
                gsap.to("#navbar", { y: -100, opacity: 0, duration: 0.4, ease: "power3.inOut" });
            }
        },
        onEnterBack: () => {
            if (window.innerWidth >= 768) {
                gsap.to("#navbar", { y: 0, opacity: 1, duration: 0.4, ease: "power3.inOut" });
            }
        }
    });

    const marqueeEl = document.querySelector("#marquee");
    if (marqueeEl) {
        gsap.to("#marquee", {
            xPercent: -40,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });
    }

    // =========================================================================
    // SECTION 02: STUDIO PHILOSOPHY / ABOUT (#about)
    // =========================================================================
    const revealTextEl = document.querySelector(".reveal-text");
    if (revealTextEl) {
        const words = revealTextEl.textContent.trim().split(/\s+/);
        revealTextEl.innerHTML = words
            .map(word => `<span class="reveal-word opacity-20 text-gray-400 translate-y-6 mr-[0.25em]">${word}</span>`)
            .join("");

        const wordElements = revealTextEl.querySelectorAll(".reveal-word");

        gsap.to(wordElements, {
            opacity: 1,
            color: "#E05252",
            y: 0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                end: "bottom 40%",
                scrub: 1
            }
        });
    }

    // =========================================================================
    // SECTION 03: THE ANTI-AI FACTORY STATEMENT (#anti-ai-factory)
    // =========================================================================
    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#anti-ai-factory",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    headerTl
        .fromTo(".header-reveal-badge", 
            { yPercent: 100, opacity: 0 }, 
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(".header-title-line", 
            { yPercent: 120, opacity: 0 }, 
            { yPercent: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }, 
            "-=0.5"
        )
        .fromTo(".header-subtitle", 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 
            "-=0.6"
        )
        .fromTo(".header-column-titles", 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
            "-=0.5"
        );

    const timelineFill = document.querySelector(".timeline-line-fill");
    if (timelineFill) {
        gsap.to(timelineFill, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "#split-timeline",
                start: "top 65%",
                end: "bottom 75%",
                scrub: 0.5
            }
        });
    }

    const pointRows = gsap.utils.toArray("#split-timeline .point-row");
    pointRows.forEach((row) => {
        const leftEl = row.querySelector(".point-left");
        const rightEl = row.querySelector(".point-right");

        const rowTl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });

        rowTl.fromTo(leftEl, 
            { x: -70, opacity: 0, filter: "blur(4px)" }, 
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }, 
            0
        ).fromTo(rightEl, 
            { x: 70, opacity: 0, filter: "blur(4px)" }, 
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }, 
            0
        );
    });

    // =========================================================================
    // SECTION 04: THE 120-SECOND COMMERCIAL STANDARD (5-CARD ACCORDION)
    // =========================================================================
    const gaugeFill = document.querySelector(".gauge-progress-fill");
    const gaugeTimerText = document.getElementById("gauge-timer-text");
    const expandCards = gsap.utils.toArray("#commercial-standard .expand-card");
    const collapsedViews = expandCards.map(card => card.querySelector(".card-collapsed-view"));
    const expandedViews = expandCards.map(card => card.querySelector(".card-expanded-view"));

    if (expandCards.length === 5 && document.querySelector("#commercial-standard")) {
        gsap.set(expandCards[0], { flexGrow: 5, x: 60, opacity: 0 });
        gsap.set(collapsedViews[0], { opacity: 0 });
        gsap.set(expandedViews[0], { opacity: 1 });
        
        for (let i = 1; i < expandCards.length; i++) {
            gsap.set(expandCards[i], { flexGrow: 1, x: 60, opacity: 0 });
            gsap.set(collapsedViews[i], { opacity: 1 });
            gsap.set(expandedViews[i], { opacity: 0 });
        }

        const masterStandardTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#commercial-standard",
                start: "top top",
                end: "+=4200",
                pin: true,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1
            }
        });

        masterStandardTl.to(expandCards, {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out"
        }, 0);

        if (gaugeFill) {
            masterStandardTl.to(gaugeFill, {
                width: "100%",
                ease: "none",
                duration: 4,
                onUpdate: function () {
                    const totalSeconds = Math.floor(this.progress() * 120);
                    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
                    const secs = String(totalSeconds % 60).padStart(2, '0');
                    if (gaugeTimerText) {
                        gaugeTimerText.textContent = `${mins}:${secs} / 02:00`;
                    }
                }
            }, 0.8);
        }

        masterStandardTl
            .to(expandCards[0], { flexGrow: 1, duration: 0.8, ease: "power2.inOut" }, 0.8)
            .to(expandedViews[0], { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.8)
            .to(collapsedViews[0], { opacity: 1, duration: 0.3, ease: "power1.out" }, 1.1)
            
            .to(expandCards[1], { flexGrow: 5, duration: 0.8, ease: "power2.inOut" }, 0.8)
            .to(collapsedViews[1], { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.8)
            .to(expandedViews[1], { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.2)

            .to(expandCards[1], { flexGrow: 1, duration: 0.8, ease: "power2.inOut" }, 1.8)
            .to(expandedViews[1], { opacity: 0, duration: 0.3, ease: "power1.in" }, 1.8)
            .to(collapsedViews[1], { opacity: 1, duration: 0.3, ease: "power1.out" }, 2.1)
            
            .to(expandCards[2], { flexGrow: 5, duration: 0.8, ease: "power2.inOut" }, 1.8)
            .to(collapsedViews[2], { opacity: 0, duration: 0.3, ease: "power1.in" }, 1.8)
            .to(expandedViews[2], { opacity: 1, duration: 0.4, ease: "power2.out" }, 2.2)

            .to(expandCards[2], { flexGrow: 1, duration: 0.8, ease: "power2.inOut" }, 2.8)
            .to(expandedViews[2], { opacity: 0, duration: 0.3, ease: "power1.in" }, 2.8)
            .to(collapsedViews[2], { opacity: 1, duration: 0.3, ease: "power1.out" }, 3.1)
            
            .to(expandCards[3], { flexGrow: 5, duration: 0.8, ease: "power2.inOut" }, 2.8)
            .to(collapsedViews[3], { opacity: 0, duration: 0.3, ease: "power1.in" }, 2.8)
            .to(expandedViews[3], { opacity: 1, duration: 0.4, ease: "power2.out" }, 3.2)

            .to(expandCards[3], { flexGrow: 1, duration: 0.8, ease: "power2.inOut" }, 3.8)
            .to(expandedViews[3], { opacity: 0, duration: 0.3, ease: "power1.in" }, 3.8)
            .to(collapsedViews[3], { opacity: 1, duration: 0.3, ease: "power1.out" }, 4.1)
            
            .to(expandCards[4], { flexGrow: 5, duration: 0.8, ease: "power2.inOut" }, 3.8)
            .to(collapsedViews[4], { opacity: 0, duration: 0.3, ease: "power1.in" }, 3.8)
            .to(expandedViews[4], { opacity: 1, duration: 0.4, ease: "power2.out" }, 4.2);

        ScrollTrigger.refresh();
    }

    // =========================================================================
    // SECTION 05: DIAMOND PRODUCTION PIPELINE (#pipeline-diamond-section)
    // =========================================================================
    const slotTop = document.querySelector("#pipeline-diamond-section .diamond-slot-top");
    const slotLeft = document.querySelector("#pipeline-diamond-section .diamond-slot-left");
    const slotBottom = document.querySelector("#pipeline-diamond-section .diamond-slot-bottom");
    const slotRight = document.querySelector("#pipeline-diamond-section .diamond-slot-right");
    
    const diamondCards = [
        slotTop ? slotTop.querySelector(".diamond-card") : null,
        slotLeft ? slotLeft.querySelector(".diamond-card") : null,
        slotBottom ? slotBottom.querySelector(".diamond-card") : null,
        slotRight ? slotRight.querySelector(".diamond-card") : null
    ];

    if (slotTop && slotBottom && slotLeft && slotRight && diamondCards.every(card => card !== null)) {
        function setActiveDiamond(activeIndex) {
            diamondCards.forEach((card, index) => {
                if (index === activeIndex) {
                    card.classList.add("is-active");
                } else {
                    card.classList.remove("is-active");
                }
            });
        }

        setActiveDiamond(0);

        const diamondMasterTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#pipeline-diamond-section",
                start: "top top",
                end: "+=3600",
                pin: true,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1
            }
        });

        diamondMasterTl
            .fromTo(slotTop, { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0)
            .fromTo(slotLeft, { x: -260, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0)
            .fromTo(slotBottom, { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0)
            .fromTo(slotRight, { x: 260, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);

        diamondMasterTl
            .call(() => setActiveDiamond(0), null, 1.0)
            .to(".path-1", { strokeDashoffset: 0, duration: 1, ease: "none" }, 1.0)

            .call(() => setActiveDiamond(1), null, 2.0)
            .to(".path-2", { strokeDashoffset: 0, duration: 1, ease: "none" }, 2.0)

            .call(() => setActiveDiamond(2), null, 3.0)
            .to(".path-3", { strokeDashoffset: 0, duration: 1, ease: "none" }, 3.0)

            .call(() => setActiveDiamond(3), null, 4.0)
            .to(".path-4", { strokeDashoffset: 0, duration: 1, ease: "none" }, 4.0);

        ScrollTrigger.refresh();
    }

    // =========================================================================
    // SECTION 06: 3D PERSPECTIVE BASEMENT STAGE (#s06-sprint-section)
    // =========================================================================
    const s06PillarLines = gsap.utils.toArray("#s06-sprint-section .s06-pillar-line");
    const s06Cards3D = gsap.utils.toArray("#s06-sprint-section .s06-spatial-card");
    const isDesktop3D = window.innerWidth >= 1024;

    if (s06Cards3D.length === 5 && document.querySelector("#s06-sprint-section")) {

        if (isDesktop3D) {
            // Elevated Spatial Depth & Height Offsets
            const spatialOffsets = [
                { z: -180, y: -55, scale: 0.88 }, // Card 01 (Elevated)
                { z: -80,  y: 15,  scale: 0.94 }, // Card 02 (Elevated)
                { z: 40,   y: -40, scale: 1.05 }, // Card 03 (Elevated Center)
                { z: -60,  y: 20,  scale: 0.95 }, // Card 04 (Elevated)
                { z: 120,  y: -25, scale: 1.10 }  // Card 05 (Elevated Foreground Hero)
            ];

            s06Cards3D.forEach((card) => {
                gsap.set(card, {
                    opacity: 0,
                    y: 160,
                    z: -300,
                    scale: 0.7
                });
            });

            s06PillarLines.forEach((line) => {
                gsap.set(line, { height: "0%" });
            });

            const s06StageTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#s06-sprint-section",
                    start: "top top",
                    end: "+=2600",
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.8,
                    anticipatePin: 1
                }
            });

            // 1. Raise Pillar lines
            s06StageTl.to(s06PillarLines, {
                height: "85%",
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            }, 0);

            // 2. Elevate Cards higher up into 3D Depth coordinates
            s06Cards3D.forEach((card, i) => {
                s06StageTl.to(card, {
                    opacity: 1,
                    y: spatialOffsets[i].y,
                    z: spatialOffsets[i].z,
                    scale: spatialOffsets[i].scale,
                    duration: 1,
                    ease: "power3.out"
                }, 0.2 + (i * 0.45));
            });
        } else {
            // Mobile: Alternating side-by-side entrance animation on scroll (cards enter from alternate left/right sides)
            s06Cards3D.forEach((card, index) => {
                const fromLeft = index % 2 === 0;
                gsap.set(card, { opacity: 1, x: 0, y: 0, z: 0, scale: 1, clearProps: "transform" });
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    },
                    x: fromLeft ? -60 : 60,
                    y: 20,
                    rotation: fromLeft ? -2 : 2,
                    opacity: 0,
                    duration: 0.75,
                    ease: "power3.out"
                });
            });
        }

        ScrollTrigger.refresh();
    }

    // =========================================================================
    // SECTION 07: PROCESS FILE STACK (#stack-container — Image 1)
    // =========================================================================
    const stackCards = gsap.utils.toArray(".stack-card");
    const isDesktopStack = window.innerWidth >= 1024;

    if (stackCards.length > 0 && document.querySelector("#stack-container")) {
        if (isDesktopStack) {
            stackCards.forEach((card, index) => {
                if (index === 0) {
                    gsap.set(card, { yPercent: 0, scale: 1, opacity: 1 });
                } else {
                    gsap.set(card, {
                        yPercent: 120,
                        scale: 0.9 + (index * 0.02),
                        opacity: 0
                    });
                }
            });

            const stackTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#stack-container",
                    start: "top top",
                    end: "+=3200",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.2,
                    anticipatePin: 1
                }
            });

            stackCards.forEach((card, i) => {
                if (i > 0) {
                    stackTl.to(card, {
                        yPercent: 0,
                        scale: 1,
                        opacity: 1,
                        ease: "power2.out",
                        duration: 1
                    }, `card-${i}`);

                    for (let j = 0; j < i; j++) {
                        stackTl.to(stackCards[j], {
                            scale: 0.94 - ((i - j) * 0.03),
                            yPercent: -4 * (i - j),
                            opacity: 0.5,
                            ease: "power2.out",
                            duration: 1
                        }, `card-${i}`);
                    }
                }
            });
        } else {
            // Mobile: Flow cards naturally in sequence below the globe so all 5 cards are visible and readable
            stackCards.forEach((card) => {
                gsap.set(card, { yPercent: 0, scale: 1, opacity: 1, clearProps: "transform" });
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 35,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        }
    }

    // =========================================================================
    // SECTION 08: WORKING PROCESS UN-FANNING (#working-process-section — Image 2)
    // =========================================================================
    const processCards = gsap.utils.toArray(".process-card");
    const isDesktopProcess = window.innerWidth >= 1024;

    if (processCards.length > 0 && document.querySelector("#working-process-section")) {
        if (isDesktopProcess) {
            const rotationAngles = [-14, -7, 0, 7, 14];
            const yOffsets = [28, 14, 0, 14, 28];

            processCards.forEach((card, index) => {
                gsap.set(card, {
                    x: 0,
                    y: yOffsets[index],
                    rotation: rotationAngles[index],
                    scale: 1,
                    zIndex: index + 1
                });
            });

            const processTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#working-process-section",
                    start: "top top",
                    end: "+=1200",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            processCards.forEach((card, i) => {
                const totalCards = processCards.length;
                const spacing = 290;
                const targetX = (i - (totalCards - 1) / 2) * spacing;

                processTl.to(card, {
                    x: targetX,
                    y: 0,
                    rotation: 0,
                    ease: "power3.out",
                    duration: 1
                }, 0);
            });
        } else {
            // Mobile: Sequentially glide cards 0 to 4 through the center view on scroll so every single card is seen clearly
            processCards.forEach((card, index) => {
                gsap.set(card, {
                    xPercent: index === 0 ? 0 : 130,
                    opacity: index === 0 ? 1 : 0,
                    rotation: 0,
                    y: 0,
                    scale: index === 0 ? 1 : 0.9,
                    zIndex: index + 1
                });
            });

            const processTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#working-process-section",
                    start: "top top",
                    end: "+=2200",
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.8,
                    anticipatePin: 1
                }
            });

            for (let i = 0; i < processCards.length - 1; i++) {
                const step = i + 1;
                processTl.to(processCards[i], {
                    xPercent: -130,
                    opacity: 0,
                    scale: 0.85,
                    duration: 0.8,
                    ease: "power2.inOut"
                }, step);
                processTl.to(processCards[i + 1], {
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                }, step);
            }
        }
    }




    // =========================================================================
    // SECTION 09a: WALL OF WORKS HERO ENTRANCE
    // =========================================================================
    if (document.querySelector("#s09a-wall-of-works")) {
        gsap.fromTo("#s09a-hero-card", 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#s09a-wall-of-works",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }




    // =========================================================================
    // SECTION 09b: 3D REVOLVING REEL & SMOOTH FLIP + TILT CONTROLLER
    // =========================================================================
    const s09Cards = gsap.utils.toArray("#selected-works .s09-3d-card");
    const s09Ring = document.getElementById("s09-orbit-ring");
    const isDesktop09 = window.innerWidth >= 1024;

    if (s09Cards.length === 6 && s09Ring && document.querySelector("#selected-works")) {

        const totalCards = 6;
        const radius = isDesktop09 ? 380 : 230;       
        const verticalGap = isDesktop09 ? 220 : 175;  
        const angleStep = 360 / totalCards;           

        s09Cards.forEach((card, i) => {
            const angle = i * angleStep;
            const initialY = (i - 0) * verticalGap;
            const isFirst = (i === 0);

            gsap.set(card, {
                rotationY: angle,
                y: initialY,
                z: radius,
                transformOrigin: `50% 50% -${radius}px`,
                opacity: isFirst ? 1 : 0.15,
                scale: isFirst ? 1.08 : 0.75,
                filter: isFirst ? "blur(0px)" : "blur(6px)"
            });
        });

        const s09MasterTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#selected-works",
                start: "top top",
                end: "+=4800",
                pin: true,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1
            }
        });

        for (let step = 0; step < totalCards; step++) {
            const timeOffset = step * 1.0;
            const targetRotY = -step * angleStep;
            const targetY = -step * verticalGap;

            s09MasterTl.to(s09Ring, {
                rotationY: targetRotY,
                y: targetY,
                duration: 1,
                ease: "power2.inOut"
            }, timeOffset);

            s09MasterTl.call(() => {
                s09Cards.forEach((c, idx) => {
                    if (idx === step) {
                        c.classList.add("is-active");
                    } else {
                        c.classList.remove("is-active");
                        const inner = c.querySelector(".s09-card-inner");
                        const tiltCard = c.querySelector(".s09-tilt-card");
                        if (inner) inner.classList.remove("is-flipped");
                        if (tiltCard) tiltCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
                    }
                });
            }, null, timeOffset);

            s09Cards.forEach((card, idx) => {
                const distance = Math.abs(idx - step);
                const isFront = (idx === step);

                s09MasterTl.to(card, {
                    opacity: isFront ? 1 : Math.max(0.1, 0.4 - distance * 0.15),
                    scale: isFront ? 1.08 : Math.max(0.72, 0.88 - distance * 0.08),
                    filter: isFront ? "blur(0px)" : `blur(${Math.min(6, distance * 2)}px)`,
                    duration: 0.8,
                    ease: "power2.out"
                }, timeOffset);
            });
        }

        // 4-Corner Mouse Hover 3D Tilt Interaction (Stabilized for Flip State)
        document.querySelectorAll(".s09-tilt-card").forEach(tiltCard => {
            tiltCard.addEventListener("mousemove", (e) => {
                const inner = tiltCard.querySelector(".s09-card-inner");
                const isFlipped = inner && inner.classList.contains("is-flipped");

                const rect = tiltCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; 
                // Reverse Y tilt calculation when flipped so physics match mouse orientation
                const rotateY = ((x - centerX) / centerX) * (isFlipped ? -10 : 10);  
                
                tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            tiltCard.addEventListener("mouseleave", () => {
                tiltCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
            });
        });

        // Flip & Unflip Handlers with Smooth Reset
        document.querySelectorAll(".s09-flip-trigger").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tiltCard = btn.closest(".s09-tilt-card");
                const inner = btn.closest(".s09-card-inner");
                if (tiltCard) tiltCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
                if (inner) inner.classList.add("is-flipped");
            });
        });

        document.querySelectorAll(".s09-unflip-trigger").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tiltCard = btn.closest(".s09-tilt-card");
                const inner = btn.closest(".s09-card-inner");
                if (tiltCard) tiltCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
                if (inner) inner.classList.remove("is-flipped");
            });
        });

        ScrollTrigger.refresh();
    }




    // =========================================================================
    // SECTION 10: PINNED OPPOSING TITLES EXIT + FULL CARDS TRACK SEQUENCE
    // =========================================================================
    if (document.querySelector("#s10-clients-stage")) {

        const s10TopTitle = document.getElementById("s10-title-top");
        const s10BottomTitle = document.getElementById("s10-title-bottom");
        const s10CardsTrack = document.getElementById("s10-cards-track");

        const s10MasterTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#s10-clients-stage",
                start: "top top",
                end: "+=4200", // Pinned scroll distance for smooth horizontal scrolling of all 6 cards
                pin: true,
                pinSpacing: true,
                scrub: 0.8,
                anticipatePin: 1
            }
        });

        // STEP 1: Both Title Lines slide out opposite directions
        s10MasterTl.to(s10TopTitle, {
            x: "-125vw",
            ease: "power2.in",
            duration: 1
        }, 0);

        s10MasterTl.to(s10BottomTitle, {
            x: "125vw",
            ease: "power2.in",
            duration: 1
        }, 0);

        // STEP 2: Cards enter into the cleared region
        s10MasterTl.to(s10CardsTrack, {
            x: () => -(s10CardsTrack.scrollWidth - window.innerWidth + 120),
            ease: "power1.out",
            duration: 2.2
        }, 0.7);

        ScrollTrigger.refresh();
    }
    
    
    
    // =========================================================================
    // SECTION 10: LOCKED EDGE-TO-EDGE SCROLLTRIGGER TIMELINE
    // =========================================================================
    function initTestimonialsSection() {
        const stage = document.getElementById("sec-testimonials");
        const textTop = document.getElementById("tm-text-top");
        const textBottom = document.getElementById("tm-text-bottom");
        const cardsReel = document.getElementById("tm-cards-reel");

        if (!stage || !textTop || !textBottom || !cardsReel) return;

        gsap.set(textTop, { x: 0 });
        gsap.set(textBottom, { x: 0 });

        const getWinWidth = () => window.innerWidth;

        const tmTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec-testimonials",
                start: "top top",
                end: "+=2800",
                pin: true,
                pinSpacing: true,
                scrub: 0.7,
                invalidateOnRefresh: true
            }
        });

        // 1. Line 1 exits to LEFT
        tmTimeline.to(textTop, {
            x: () => -getWinWidth() * 1.3,
            ease: "power2.inOut",
            duration: 1
        }, 0);

        // 2. Line 2 exits to RIGHT
        tmTimeline.to(textBottom, {
            x: () => getWinWidth() * 1.3,
            ease: "power2.inOut",
            duration: 1
        }, 0);

        // 3. Cards reel glides smoothly edge-to-edge across the screen
        tmTimeline.fromTo(cardsReel, 
            { x: () => getWinWidth() },
            { 
                x: () => -(cardsReel.offsetWidth - getWinWidth() + 24),
                ease: "power1.out",
                duration: 2.2
            }, 
            0.25
        );

        ScrollTrigger.refresh();
    }

    if (document.readyState === "complete") {
        initTestimonialsSection();
    } else {
        window.addEventListener("load", initTestimonialsSection);
    }
        

    

    // =========================================================================
    // SECTION 11: PINNED SCROLLTRACKER & 3D CARD TILT MECHANICS
    // =========================================================================
    function initSection11Capabilities() {
        const stage = document.getElementById("sec-capabilities");
        const serviceItems = document.querySelectorAll(".s11-service-item");
        const mediaItems = document.querySelectorAll(".s11-card-media");
        const floatingCard = document.getElementById("s11-floating-card");
        const hudLabel = document.getElementById("s11-hud-label");
        const hudValue = document.getElementById("s11-hud-value");

        if (!stage || !serviceItems.length) return;

        // Card Rotation Profiles strictly alternating: Left -> Right -> Left -> Right
        const cardAngles = [
            { rx: 10,  ry: -14, rz: 3 },   // Service 01: LEFT TILT
            { rx: -8,  ry: 14,  rz: -3 },  // Service 02: RIGHT TILT
            { rx: 12,  ry: -14, rz: 4 },   // Service 03: LEFT TILT
            { rx: -10, ry: 14,  rz: -4 }   // Service 04: RIGHT TILT
        ];

        function activateService(index) {
            serviceItems.forEach((item, i) => {
                const desc = item.querySelector(".s11-desc");
                const arrow = item.querySelector(".s11-arrow");

                if (i === index) {
                    item.classList.add("active");
                    item.style.opacity = "1";
                    if (desc) desc.classList.remove("hidden");
                    if (arrow) arrow.style.opacity = "1";

                    // Update HUD Telemetry Bar
                    if (hudLabel) hudLabel.innerText = item.getAttribute("data-label");
                    if (hudValue) hudValue.innerText = item.getAttribute("data-[#9B111E]");
                } else {
                    item.classList.remove("active");
                    item.style.opacity = "0.4";
                    if (desc) desc.classList.add("hidden");
                    if (arrow) arrow.style.opacity = "0";
                }
            });

            // Crossfade Media on Floating Card
            mediaItems.forEach((media, i) => {
                if (i === index) {
                    media.style.opacity = "1";
                } else {
                    media.style.opacity = "0";
                }
            });

            // Apply Alternating 3D Tilt Angle to Card
            if (floatingCard && cardAngles[index]) {
                const angle = cardAngles[index];
                floatingCard.style.transform = `rotateX(${angle.rx}deg) rotateY(${angle.ry}deg) rotateZ(${angle.rz}deg)`;
            }
        }

        // GSAP ScrollTrigger sequence pinning Section 11 while scrolling services
        ScrollTrigger.create({
            trigger: "#sec-capabilities",
            start: "top top",
            end: "+=2400",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const total = serviceItems.length;
                const currentIndex = Math.min(Math.floor(progress * total), total - 1);
                activateService(currentIndex);
            }
        });

        // Manual Click Handler
        serviceItems.forEach((item, i) => {
            item.addEventListener("click", () => activateService(i));
        });
    }

    if (document.readyState === "complete") {
        initSection11Capabilities();
    } else {
        window.addEventListener("load", initSection11Capabilities);
    }



    // =========================================================================
    // SECTION 12: PINNED STEP-BY-STEP CARDS + MOUSE PARALLAX FLOAT
    // =========================================================================
    function initSection12FAQ() {
        const stage = document.getElementById("sec-faq");
        const cards = [
            document.getElementById("faq-card-1"),
            document.getElementById("faq-card-2"),
            document.getElementById("faq-card-3"),
            document.getElementById("faq-card-4"),
            document.getElementById("faq-card-5")
        ];

        if (!stage || !cards[0]) return;

        // 1. Initially hide cards with slight scale-down
        cards.forEach(card => {
            if (card) {
                gsap.set(card, { opacity: 0, scale: 0.85, y: 20 });
            }
        });

        // 2. Create Pinned ScrollTrigger Entrance Timeline
        const faqTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec-faq",
                start: "top top",
                end: "+=2200",
                pin: true,
                pinSpacing: true,
                scrub: 0.5,
                anticipatePin: 1
            }
        });

        // Step-by-step card popups matching reference video sequence
        faqTimeline.to(cards[0], { opacity: 1, scale: 1, y: 0, duration: 1 }, 0.2);
        faqTimeline.to(cards[1], { opacity: 1, scale: 1, y: 0, duration: 1 }, 0.6);
        faqTimeline.to([cards[2], cards[3]], { opacity: 1, scale: 1, y: 0, duration: 1 }, 1.0);
        faqTimeline.to(cards[4], { opacity: 1, scale: 1, y: 0, duration: 1 }, 1.4);

        // 3. Mouse Parallax Floating Motion
        stage.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = clientX - centerX;
            const moveY = clientY - centerY;

            cards.forEach(card => {
                if (!card || card.style.opacity === "0") return;
                const depth = parseFloat(card.getAttribute("data-depth")) || 0.03;

                gsap.to(card, {
                    x: moveX * depth,
                    y: moveY * depth,
                    duration: 0.8,
                    ease: "power1.out",
                    overwrite: "auto"
                });
            });
        });

        // 4. Accordion Toggle
        cards.forEach(card => {
            if (!card) return;
            const trigger = card.querySelector(".faq-trigger");
            if (!trigger) return;

            trigger.addEventListener("click", () => {
                const isOpen = card.classList.contains("open");
                cards.forEach(c => c && c.classList.remove("open"));
                if (!isOpen) {
                    card.classList.add("open");
                }
            });
        });

        ScrollTrigger.refresh();
    }

    if (document.readyState === "complete") {
        initSection12FAQ();
    } else {
        window.addEventListener("load", initSection12FAQ);
    }

    


    // =========================================================================
    // SECTION 13: MIRRORED REVERSE SCROLL ENTRANCE & EXIT (EXACT OPPOSITE)
    // =========================================================================
    function initSection13Inquiry() {
        const stage = document.getElementById("inquiry-stage");
        const wrapper = document.getElementById("orbital-cards-wrapper");
        const glassCard = document.getElementById("inquiry-glass-card");
        const pills = document.querySelectorAll(".scope-pill");

        if (!wrapper || !stage || !glassCard) return;

        const totalImages = 25;
        const cards = [];

        wrapper.innerHTML = ""; // Clear container

        // 1. Generate 25 Square Image Cards (work-1.webp through work-25.webp)
        for (let i = 1; i <= totalImages; i++) {
            const card = document.createElement("div");
            card.className = "orbit-image-card pointer-events-auto";
            
            const img = document.createElement("img");
            img.src = `./assets/images/work/work-${i}.webp`;
            img.alt = `Portfolio Work ${i}`;
            img.loading = "lazy";
            img.decoding = "async";
            img.width = 120;
            img.height = 120;
            
            card.appendChild(img);
            wrapper.appendChild(card);
            cards.push(card);
        }

        // 2. Parametric Arc Loop with Mirrored Expansion / Contraction
        let angleOffset = 0;
        let expansionProgress = 0; // Animates 0 -> 1 on scroll down, 1 -> 0 on scroll up
        let isRevealed = false;

        function renderOrbit() {
            angleOffset += 0.0015; // Continuous orbital rotation

            const stageWidth = wrapper.clientWidth;
            const stageHeight = wrapper.clientHeight;

            const isMobile = stageWidth < 640;
            const isTablet = stageWidth >= 640 && stageWidth < 1024;

            // Dynamically scale arc radii for any aspect ratio and screen width
            const targetRx = isMobile 
                ? Math.max(165, stageWidth * 0.44) 
                : (isTablet ? Math.min(stageWidth * 0.44, 460) : Math.min(stageWidth * 0.4, 1100));

            const targetRy = isMobile 
                ? Math.max(230, stageHeight * 0.32) 
                : Math.min(stageHeight * 0.65, 600);

            const rx = targetRx * expansionProgress;
            const ry = targetRy * expansionProgress;
            
            // Measure actual card half-width for exact centering
            const cardHalfW = cards[0] && cards[0].offsetWidth > 0 ? cards[0].offsetWidth / 2 : (isMobile ? 36 : 60);
            const centerX = stageWidth / 2 - cardHalfW;
            const centerY = stageHeight / 2 + (isMobile ? -45 : (isTablet ? 170 : 210));

            cards.forEach((card, index) => {
                const theta = (angleOffset + (index / totalImages) * Math.PI * 2) % (Math.PI * 2);

                if (theta >= 0 && theta <= Math.PI) {
                    card.style.display = "block";

                    const x = centerX + rx * Math.cos(theta);
                    const y = centerY - ry * Math.sin(theta);

                    card.style.left = `${x}px`;
                    card.style.top = `${y}px`;

                    const tangentAngle = (Math.PI / 2 - theta) * (180 / Math.PI) * 0.6;
                    const depthScale = (0.85 + 0.2 * Math.sin(theta)) * Math.max(0.05, expansionProgress);

                    card.style.transform = `rotate(${tangentAngle}deg) scale(${depthScale})`;
                    card.style.opacity = Math.min(1, expansionProgress * 2.0);
                    
                    if (isMobile) {
                        // Upper crowning cards float in 3D above the glass form card header (z-35 > z-30)
                        card.style.zIndex = Math.sin(theta) > 0.35 ? 35 : 20;
                    } else {
                        card.style.zIndex = Math.floor(depthScale * 25);
                    }
                } else {
                    card.style.display = "none";
                }
            });

            // 3. Mirrored Two-Way Staggered Sequence Math
            if (isRevealed) {
                // FORWARD: 1. Expand Arc -> 2. Form Rises
                if (expansionProgress < 1) {
                    expansionProgress += (1 - expansionProgress) * 0.05;
                }
                if (expansionProgress > 0.75) {
                    glassCard.classList.add("form-revealed");
                }
            } else {
                // REVERSE (EXACT OPPOSITE): 1. Form Lowers First -> 2. Contract Arc Second
                if (expansionProgress < 0.75) {
                    glassCard.classList.remove("form-revealed");
                }
                if (expansionProgress > 0) {
                    expansionProgress += (0 - expansionProgress) * 0.05;
                    if (expansionProgress < 0.005) {
                        expansionProgress = 0;
                    }
                }
            }

            requestAnimationFrame(renderOrbit);
        }

        requestAnimationFrame(renderOrbit);

        // 4. Bidirectional Scroll Trigger (IntersectionObserver)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isRevealed = true;  // Open forward
                } else {
                    isRevealed = false; // Close in exact reverse
                }
            });
        }, { threshold: 0.05 });

        observer.observe(document.getElementById("sec-inquiry"));

        // 5. Interactive Scope Selector Pills
        pills.forEach(pill => {
            pill.addEventListener("click", () => {
                pills.forEach(p => {
                    p.classList.remove("active", "bg-[#9B111E]", "border-[#9B111E]", "text-white");
                    const dot = p.querySelector(".pill-dot");
                    if (dot) dot.className = "pill-dot w-1 h-1 rounded-full bg-gray-500";
                });

                pill.classList.add("active");
                const activeDot = pill.querySelector(".pill-dot");
                if (activeDot) activeDot.className = "pill-dot w-1 h-1 rounded-full bg-white";
            });
        });
    }

    if (document.readyState === "complete") {
        initSection13Inquiry();
    } else {
        window.addEventListener("load", initSection13Inquiry);
    }

        
    // =========================================================================
    // SECTION 14: SCROLL ZOOM WITH EXTENDED ENTRY BUFFER (SAVE POINT 2)
    // =========================================================================
    function initSection14Interactions() {
        const stage = document.getElementById("sec-14-stage");
        const stickyContainer = document.getElementById("sec-14-sticky");
        const heroCard = document.getElementById("center-crimson-card");
        const cardMesh = document.getElementById("center-card-mesh");
        const heroVideo = document.getElementById("hero-bg-video");
        const pauseBtn = document.getElementById("pause-hero-btn");
        const bentoCards = document.querySelectorAll("[data-bento-card]");

        if (!stage || !heroCard) return;

        const row1Cards = document.querySelectorAll('.mesh-ruby-1, .mesh-ruby-2');
        const row2Cards = document.querySelectorAll('.mesh-ruby-4');
        const row3Cards = document.querySelectorAll('.mesh-ruby-5, .mesh-ruby-6');
        let cardsRevealed = false;

        function isMobileView() {
            return window.innerWidth < 768;
        }

        // On mobile: keep all cards rock-solid, immediately visible, and prevent flickering
        function syncMobileCardState() {
            if (isMobileView()) {
                [...row1Cards, ...row2Cards, ...row3Cards, heroCard].forEach((card) => {
                    if (card) {
                        card.classList.add("is-visible");
                        card.style.transition = "";
                        card.style.transform = "";
                        card.style.opacity = "";
                        card.style.pointerEvents = "auto";
                    }
                });
                if (heroCard) {
                    heroCard.classList.remove("is-scaling");
                    heroCard.style.transform = "";
                    heroCard.style.borderRadius = "";
                    if (cardMesh) cardMesh.style.borderRadius = "";
                    if (heroVideo) heroVideo.style.borderRadius = "";
                }
                cardsRevealed = true;
            }
        }
        syncMobileCardState();

        // 1. Live IST Operational Clock
        function updateISTClock() {
            const clockEl = document.getElementById("live-ist-clock");
            if (!clockEl) return;
            const now = new Date();
            const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false };
            clockEl.textContent = `IST ${now.toLocaleTimeString('en-US', options)}`;
        }
        setInterval(updateISTClock, 1000);
        updateISTClock();

        // 2. Entrance Observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !cardsRevealed) {
                    row1Cards.forEach((card, i) => setTimeout(() => card.classList.add("is-visible"), i * 40));
                    setTimeout(() => row2Cards.forEach((card) => card.classList.add("is-visible")), 90);
                    setTimeout(() => {
                        row3Cards.forEach((card, i) => setTimeout(() => card.classList.add("is-visible"), i * 40));
                        heroCard.classList.add("is-visible");
                        cardsRevealed = true;
                    }, 160);
                } else if (!entry.isIntersecting && stage.getBoundingClientRect().top > 0 && !isMobileView()) {
                    [...row1Cards, ...row2Cards, ...row3Cards, heroCard].forEach((card) => {
                        if (card) card.classList.remove("is-visible");
                    });
                    cardsRevealed = false;
                }
            });
        }, { threshold: 0.15 });

        if (stickyContainer) revealObserver.observe(stickyContainer);

        // Scatter direction vectors
        const scatterVectors = {
            'top-wide':      { x: 0,    y: -400 },
            'right-tall':    { x: 500,  y: 0 },
            'left-mid':      { x: -500, y: 0 },
            'bottom-left':   { x: -400, y: 400 },
            'bottom-center': { x: 0,    y: 400 },
            'bottom-right':  { x: 400,  y: 400 }
        };

        // 3. Scroll Zoom Engine with Extended 25% Scroll Cushion (Desktop Only)
        function handleScrollExpansion() {
            if (isMobileView()) {
                // Ensure desktop scatter transforms are completely cleared on mobile
                if (heroCard.classList.contains("is-scaling")) {
                    heroCard.classList.remove("is-scaling");
                    heroCard.style.transform = "";
                    heroCard.style.borderRadius = "";
                    if (cardMesh) cardMesh.style.borderRadius = "";
                    if (heroVideo) heroVideo.style.borderRadius = "";
                }
                bentoCards.forEach((card) => {
                    if (card.style.transform || card.style.opacity) {
                        card.style.transition = "";
                        card.style.transform = "";
                        card.style.opacity = "";
                        card.style.pointerEvents = "auto";
                    }
                });
                return;
            }

            if (!cardsRevealed) return;

            const stageRect = stage.getBoundingClientRect();
            const totalScrollable = stage.offsetHeight - window.innerHeight;
            let progress = -stageRect.top / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));

            // Start zoom ONLY after user scrolls past 25% of the section height
            const delayThreshold = 0.25;

            if (progress > delayThreshold) {
                // Smoothly complete the zoom across the remaining scroll range
                const p = Math.min(1, (progress - delayThreshold) / 0.45);
                const easeP = p * p * (3 - 2 * p);

                heroCard.classList.add("is-scaling");

                // Measure unscaled offset dimensions
                const baseW = heroCard.offsetWidth || 560;
                const baseH = heroCard.offsetHeight || 315;

                // Target exact viewport bounds (1.0 = zero over-zooming)
                const targetScaleX = window.innerWidth / baseW;
                const targetScaleY = window.innerHeight / baseH;
                const fullCoverageScale = Math.max(targetScaleX, targetScaleY) * 1.0;

                const scale = 1 + (fullCoverageScale - 1) * easeP;
                const borderRadius = 32 * (1 - easeP);

                heroCard.style.transform = `scale(${scale})`;
                heroCard.style.borderRadius = `${borderRadius}px`;
                if (cardMesh) cardMesh.style.borderRadius = `${borderRadius}px`;
                if (heroVideo) heroVideo.style.borderRadius = `${borderRadius}px`;

                bentoCards.forEach((card) => {
                    const dir = card.getAttribute("data-scatter");
                    const vector = scatterVectors[dir] || { x: 0, y: 0 };

                    const moveX = vector.x * easeP;
                    const moveY = vector.y * easeP;
                    const cardScale = Math.max(0.75, 1 - easeP * 0.25);
                    const opacity = Math.max(0, 1 - easeP * 2.0);

                    card.style.transition = "none";
                    card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) scale(${cardScale})`;
                    card.style.opacity = opacity;
                    card.style.pointerEvents = easeP > 0.3 ? "none" : "auto";
                });
            } else {
                // Unscaled base state during the initial 25% scroll window
                heroCard.classList.remove("is-scaling");
                heroCard.style.transform = "scale(1)";
                heroCard.style.borderRadius = "";
                if (cardMesh) cardMesh.style.borderRadius = "";
                if (heroVideo) heroVideo.style.borderRadius = "";

                bentoCards.forEach((card) => {
                    card.style.transition = "";
                    card.style.transform = "";
                    card.style.opacity = "";
                    card.style.pointerEvents = "auto";
                });
            }
        }

        let isTicking = false;
        window.addEventListener("scroll", () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    handleScrollExpansion();
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        window.addEventListener("resize", () => {
            if (isMobileView()) {
                syncMobileCardState();
            }
        });

        // 4. Pause/Play Video Control
        if (pauseBtn && heroVideo) {
            pauseBtn.addEventListener("click", () => {
                if (heroVideo.paused) {
                    heroVideo.play();
                    pauseBtn.textContent = "||";
                } else {
                    heroVideo.pause();
                    pauseBtn.textContent = "▶";
                }
            });
        }

        // 5. Mouse Parallax for Background SVGs
        bentoCards.forEach((card) => {
            const bgIcon = card.querySelector(".bento-bg-icon");
            card.addEventListener("mousemove", (e) => {
                if (!bgIcon) return;
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                bgIcon.style.transform = `translate(${(x / r.width) * 14}px, ${(y / r.height) * 14}px) scale(1.05)`;
            });
            card.addEventListener("mouseleave", () => {
                if (!bgIcon) return;
                bgIcon.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });
    }

    if (document.readyState === "complete") {
        initSection14Interactions();
    } else {
        window.addEventListener("load", initSection14Interactions);
    }


    // =========================================================================
    // GLOBAL BACK TO TOP & REFRESH
    // =========================================================================
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        lenis.on('scroll', (e) => {
            if (e.scroll > 450) {
                backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
                backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
            } else {
                backToTopBtn.classList.add("opacity-0", "pointer-events-none");
                backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            lenis.scrollTo(0, { duration: 1.4 });
        });
    }

    ScrollTrigger.refresh();




    

});



// Standalone 3D Ruby Gem Renderer (Dark Crimson Top & Refined Glints)
function initRubyCanvas() {
    const canvas = document.getElementById('ruby-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, -0.05, 3.8);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(200, 220);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 57-Facet Brilliant Diamond Geometry
        function createBrilliantGem() {
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const N = 8;

            const yTable = 0.38,   rTable = 0.52;
            const yStar = 0.26,    rStar = 0.72;
            const yBezel = 0.14,   rBezel = 0.95;
            const yGirdleUpper = 0.02, rGirdle = 1.05;
            const yGirdleLower = -0.04;
            const yCulet = -0.95;

            function addTriangle(p1, p2, p3) {
                positions.push(p1.x, p1.y, p1.z);
                positions.push(p2.x, p2.y, p2.z);
                positions.push(p3.x, p3.y, p3.z);
            }

            const tableCenter = new THREE.Vector3(0, yTable, 0);
            const culetPoint  = new THREE.Vector3(0, yCulet, 0);

            const tableVerts = [], starVerts = [], bezelVerts = [];
            const girdleUpperVerts = [], girdleLowerVerts = [];

            for (let i = 0; i < N; i++) {
                const aMain = (i / N) * Math.PI * 2;
                const aHalf = ((i + 0.5) / N) * Math.PI * 2;

                tableVerts.push(new THREE.Vector3(Math.cos(aMain) * rTable, yTable, Math.sin(aMain) * rTable));
                starVerts.push(new THREE.Vector3(Math.cos(aHalf) * rStar, yStar, Math.sin(aHalf) * rStar));
                bezelVerts.push(new THREE.Vector3(Math.cos(aMain) * rBezel, yBezel, Math.sin(aMain) * rBezel));

                girdleUpperVerts.push(new THREE.Vector3(Math.cos(aMain) * rGirdle, yGirdleUpper, Math.sin(aMain) * rGirdle));
                girdleUpperVerts.push(new THREE.Vector3(Math.cos(aHalf) * rGirdle, yGirdleUpper, Math.sin(aHalf) * rGirdle));

                girdleLowerVerts.push(new THREE.Vector3(Math.cos(aMain) * rGirdle, yGirdleLower, Math.sin(aMain) * rGirdle));
                girdleLowerVerts.push(new THREE.Vector3(Math.cos(aHalf) * rGirdle, yGirdleLower, Math.sin(aHalf) * rGirdle));
            }

            // Top Table & Crown
            for (let i = 0; i < N; i++) addTriangle(tableCenter, tableVerts[(i + 1) % N], tableVerts[i]);
            for (let i = 0; i < N; i++) addTriangle(tableVerts[i], tableVerts[(i + 1) % N], starVerts[i]);
            for (let i = 0; i < N; i++) {
                const prevStar = (i + N - 1) % N;
                addTriangle(tableVerts[i], starVerts[i], bezelVerts[i]);
                addTriangle(tableVerts[i], bezelVerts[i], starVerts[prevStar]);
            }
            for (let i = 0; i < N; i++) {
                const next = (i + 1) % N;
                const gIdx = i * 2;
                addTriangle(starVerts[i], girdleUpperVerts[gIdx + 1], bezelVerts[i]);
                addTriangle(starVerts[i], bezelVerts[next], girdleUpperVerts[gIdx + 1]);
                addTriangle(bezelVerts[i], girdleUpperVerts[gIdx + 1], girdleUpperVerts[gIdx]);
                addTriangle(bezelVerts[next], girdleUpperVerts[(gIdx + 2) % (N * 2)], girdleUpperVerts[gIdx + 1]);
            }
            // Bottom Pavilion Cone
            for (let i = 0; i < N * 2; i++) {
                addTriangle(girdleLowerVerts[i], girdleLowerVerts[(i + 1) % (N * 2)], culetPoint);
            }
            // Girdle Rim
            for (let i = 0; i < N * 2; i++) {
                const next = (i + 1) % (N * 2);
                addTriangle(girdleUpperVerts[i], girdleUpperVerts[next], girdleLowerVerts[i]);
                addTriangle(girdleUpperVerts[next], girdleLowerVerts[next], girdleLowerVerts[i]);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.computeVertexNormals();
            return geometry;
        }

        const geometry = createBrilliantGem();

        // Darker Crimson Ruby Base Material
        const material = new THREE.MeshPhongMaterial({
            color: 0x8A0012,            // Deep Dark Crimson Ruby
            emissive: 0x220004,         // Dark Crimson Shadow Base
            specular: 0xEE9999,         // Soft Reddish-White Facet Glints
            shininess: 80,              // Crisp Diamond Facet Edge Definition
            flatShading: true
        });

        const ruby = new THREE.Mesh(geometry, material);
        ruby.rotation.x = 0.22;
        ruby.position.y = 0.08;
        scene.add(ruby);

        // Tuned Lighting Architecture (Dark Top Shades with Subtle Specular)
        const ambientLight = new THREE.AmbientLight(0x380006, 1.6);

        const keyRedLight = new THREE.DirectionalLight(0xB30018, 1.4);
        keyRedLight.position.set(2, 4, 3);

        const fillSpecular = new THREE.DirectionalLight(0xFFCCCC, 0.7);
        fillSpecular.position.set(-2, 3, 2);

        scene.add(ambientLight, keyRedLight, fillSpecular);

        // Smooth Rotation
        function animate() {
            requestAnimationFrame(animate);
            ruby.rotation.y += 0.012;
            renderer.render(scene, camera);
        }
        animate();
    } catch (e) {
        console.warn("3D Ruby render skipped:", e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRubyCanvas);
} else {
    initRubyCanvas();
}


// =========================================================================
// SECTION 13 INQUIRY FORM TRANSMISSION HANDLER
// =========================================================================
function initInquiryFormHandler() {
    const form = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('inquiry-submit-btn');
    const btnText = document.getElementById('btn-text');
    const statusBanner = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const payload = {
            name: document.getElementById('form-name').value.trim(),
            email: document.getElementById('form-email').value.trim(),
            brand: document.getElementById('form-brand').value.trim(),
            message: document.getElementById('form-message').value.trim()
        };

        // Loading State
        submitBtn.disabled = true;
        btnText.innerText = '[ TRANSMITTING... ]';
        statusBanner.className = 'text-[10px] font-mono tracking-wider p-3 rounded-xl text-center bg-white/5 text-gray-300 block border border-white/10';
        statusBanner.innerText = 'Connecting to transmission server...';

        try {
            const response = await fetch('/api/send-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                statusBanner.className = 'text-[10px] font-mono tracking-wider p-3 rounded-xl text-center bg-red-950/80 border border-brand-ruby text-red-200 block';
                statusBanner.innerText = '✦ TRANSMISSION SUCCESSFUL. RESPONSE WITHIN 24 HOURS.';
                form.reset();

                // Auto-clear success banner after 5 seconds
                setTimeout(() => {
                    statusBanner.className = 'hidden';
                    statusBanner.innerText = '';
                }, 3000);

            } else {
                throw new Error(result.error || 'Server rejected transmission.');
            }
        } catch (error) {
            console.error('Inquiry Submission Error:', error);
            statusBanner.className = 'text-[10px] font-mono tracking-wider p-3 rounded-xl text-center bg-red-950/90 border border-red-500 text-red-300 block';
            statusBanner.innerText = '⚠️ TRANSMISSION ERROR. PLEASE TRY AGAIN OR EMAIL DIRECTLY.';

            // Auto-clear error banner after 6 seconds
            setTimeout(() => {
                statusBanner.className = 'hidden';
                statusBanner.innerText = '';
            }, 6000);
        } finally {
            submitBtn.disabled = false;
            btnText.innerText = '[ TRANSMIT INQUIRY ]';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInquiryFormHandler);
} else {
    initInquiryFormHandler();
}

// =========================================================================
// HIGH-EFFICIENCY VIDEO LAZY-LOADER & PLAYBACK OBSERVER
// =========================================================================
function initLazyVideos() {
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.paused && video.dataset.autoplay !== 'false') {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {});
                        }
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, {
            rootMargin: '250px 0px 250px 0px',
            threshold: 0.01
        });

        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyVideos);
} else {
    initLazyVideos();
}

// =========================================================================
// GLOBAL DYNAMIC VIEWPORT & ASPECT RATIO RECALIBRATION
// =========================================================================
let globalResizeDebounceTimer;
window.addEventListener('resize', () => {
    clearTimeout(globalResizeDebounceTimer);
    globalResizeDebounceTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 180);
});