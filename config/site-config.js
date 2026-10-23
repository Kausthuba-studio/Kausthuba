/**
 * ============================================================================
 * KAUSTHUBA AI CREATIVE STUDIO — MASTER SITE CONFIGURATION
 * ============================================================================
 * Central configuration file for Kausthuba Studio.
 * 
 * Update image paths, videos, texts, links, or studio information here without
 * risking breaking HTML markup or animation parameters!
 * 
 * HOW TO SWAP AN IMAGE:
 *   1. Locate the section below (e.g. `wallOfWorks`, `sprint`, `commercialArc`).
 *   2. Change the image path (e.g. 'assets/images/work/work-1.jpg' -> 'assets/images/my-new-image.jpg').
 *   3. Save and refresh browser!
 * ============================================================================
 */

const SITE_CONFIG = {
    // ------------------------------------------------------------------------
    // 1. BRAND & CONTACT INFORMATION
    // ------------------------------------------------------------------------
    brand: {
        name: "KAUSTHUBA",
        tagline: "AI Creative Studio",
        subTagline: "Turning ideas into digital experiences",
        logo: "assets/images/kausthuba-logo.webp",
        location: "Rajahmundry, Andhra Pradesh, India",
        coordinates: "17.000° N, 81.780° E • IST UTC +5:30",
        timezone: "IST",
        workingHours: "09:00 - 21:00",
        status: "OPEN",
        email: "kausthuba.studio@gmail.com",
        socials: {
            instagram: {
                handle: "@kausthuba.studio",
                url: "https://www.instagram.com/kausthuba.studio/",
                qrImage: "assets/images/qr-instagram.webp"
            },
            youtube: {
                badge: "YT",
                subtext: "SHOWREEL",
                url: "https://www.youtube.com/@kausthuba.studio"
            },
            linkedin: {
                badge: "IN",
                subtext: "NETWORK",
                url: "https://www.linkedin.com/company/kausthuba-studio/home/"
            },
            facebook: {
                badge: "FB",
                subtext: "PAGE",
                url: "https://www.facebook.com/people/Kausthuba-AI-Creative-Studio/61595798758241/"
            }
        }
    },

    // ------------------------------------------------------------------------
    // 2. HERO SECTION (#hero)
    // ------------------------------------------------------------------------
    hero: {
        servicesTag: "// Creative Services",
        ideasTag: "// Ideas In Action",
        titleLine1: "KAUSTHUBA",
        titleLine2: "STUDIO",
        description: "Transforming brand communication problems into original visual concepts and story-driven animated experiences.",
        marquee: [
            "Turning Bold Ideas Into Meaningful Digital Experiences",
            "✦",
            "Turning Bold Ideas Into Meaningful Digital Experiences",
            "✦"
        ]
    },

    // ------------------------------------------------------------------------
    // 3. ABOUT PHILOSOPHY (#about)
    // ------------------------------------------------------------------------
    about: {
        statement: "We develop the creative concept first, then use storytelling, design, animation, and AI-assisted production to bring it to life. The story is the communication strategy. The animation is how we express it.",
        ctaText: "More About Us",
        ctaHref: "about.html"
    },

    // ------------------------------------------------------------------------
    // 4. THE 120-SECOND COMMERCIAL STANDARD (#commercial-standard)
    // Cutout images & story arcs
    // ------------------------------------------------------------------------
    commercialArc: {
        badge: "// THE 120-SECOND STANDARD",
        title: "Our 5-Stage",
        titleHighlight: "Commercial Arc.",
        subtitle: "Every brand film follows one consistent character journey—moving from problem friction to the ultimate 3D brand resolution.",
        timerText: "00:00 / 02:00",
        stages: [
            {
                number: "01",
                timestamp: "STAGE 01 — 00:03s",
                tag: "// HOOK",
                cutout: "./assets/images/cutout-1.webp",
                cutoutAlt: "Stage 01 Disruption Hook Boy",
                category: "CHARACTER INTRODUCTION",
                title: "The Disruption Hook",
                description: "Introduce the main character and their world with an engaging opening that captures attention and sets the story in motion.",
                badge: "DISRUPTION HOOK"
            },
            {
                number: "02",
                timestamp: "STAGE 02 — 00:25s",
                tag: "// CONFLICT",
                cutout: "./assets/images/cutout-2.webp",
                cutoutAlt: "Stage 02 Problem Friction Boy",
                category: "BRAND PROBLEM FRICTION",
                title: "The Core Problem",
                description: "Unveiling the character's frustration to represent your target audience's exact pain point.",
                badge: "PROBLEM FRICTION"
            },
            {
                number: "03",
                timestamp: "STAGE 03 — 00:50s",
                tag: "// SOLUTION",
                cutout: "./assets/images/cutout-3.webp",
                cutoutAlt: "Stage 03 Solution Discovery Boy",
                category: "PRODUCT DISCOVERY",
                title: "The Turning Point",
                description: "Introducing your product as the catalyst that changes everything for the protagonist.",
                badge: "SOLUTION DISCOVERY"
            },
            {
                number: "04",
                timestamp: "STAGE 04 — 01:25s",
                tag: "// TRIUMPH",
                cutout: "./assets/images/cutout-4.webp",
                cutoutAlt: "Stage 04 Triumphant Climax Boy",
                category: "TRANSFORMATION ARC",
                title: "The Triumphant Climax",
                description: "Celebrating the breakthrough moment when the problem is solved and your brand value shines.",
                badge: "TRIUMPHANT CLIMAX"
            },
            {
                number: "05",
                timestamp: "STAGE 05 — 02:00s",
                tag: "// RESOLUTION",
                cutout: "./assets/images/cutout-5.webp",
                cutoutAlt: "Stage 05 Brand Outro Boy",
                category: "CALL TO ACTION",
                title: "Brand Outro & Resolution",
                description: "Cementing your brand identity with clear call-to-action and memorable closing visuals.",
                badge: "BRAND OUTRO"
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 5. CREATIVE SPRINT (#s06-sprint-section)
    // 5 3D spatial flip cards with background cover images
    // ------------------------------------------------------------------------
    sprint: {
        cards: [
            {
                step: "STEP 01",
                stage: "STAGE_01",
                pillarClass: "card-pillar-1",
                image: "assets/images/work/work-1.webp",
                title: "Character Design",
                tag: "RESEARCH & CONCEPT",
                detailsTitle: "STEP 01 DETAILS",
                description: "From character appearance to expressions, we establish a consistent look that carries through the story.",
                footerTag: "BRAND STORY"
            },
            {
                step: "STEP 02",
                stage: "STAGE_02",
                pillarClass: "card-pillar-2",
                image: "assets/images/work/work-2.webp",
                title: "World Building",
                tag: "VISUAL CONSISTENCY",
                detailsTitle: "STEP 02 DETAILS",
                description: "From the world around the characters to the smallest scene details, we build environments that support the story.",
                footerTag: "CHARACTER FLOW"
            },
            {
                step: "STEP 03",
                stage: "STAGE_03",
                pillarClass: "card-pillar-3",
                image: "assets/images/work/work-3.webp",
                title: "Scene Composition",
                tag: "VIDEO PRODUCTION",
                detailsTitle: "STEP 03 DETAILS",
                description: "We structure each scene through thoughtful framing, camera placement, and transitions that guide the audience through the story.",
                footerTag: "SCENE BUILD"
            },
            {
                step: "STEP 04",
                stage: "STAGE_04",
                pillarClass: "card-pillar-4",
                image: "assets/images/work/work-4.webp",
                title: "Animation Style",
                tag: "VISUAL DIRECTION",
                detailsTitle: "STEP 04 DETAILS",
                description: "From expressive, Pixar-inspired 3D animation to other suitable visual styles, we choose an approach that fits the brand and story.",
                footerTag: "AUDIO & VISUALS"
            },
            {
                step: "STEP 05",
                stage: "STAGE_05",
                pillarClass: "card-pillar-5",
                image: "assets/images/work/work-5.webp",
                title: "Visual Storytelling",
                tag: "SOUND & MUSIC",
                detailsTitle: "STEP 05 DETAILS",
                description: "We bring together movement, rhythm, and pacing to create an engaging visual story that connects with the audience.",
                footerTag: "FINAL FILM"
            }
        ]
    },

    // ------------------------------------------------------------------------
    // 6. THE KAUSTHUBA EDGE (#stack-container)
    // 5 Edge stack cards
    // ------------------------------------------------------------------------
    edgeStack: [
        {
            number: "01",
            tag: "01 / LIVE-ACTION COMPARISON",
            reason: "Reason One",
            title: "We Are Not a Physical Production Setup.",
            desc: "A traditional live-action shoot involves actors, locations, cameras, lighting, equipment, and a heavy production crew. <strong class=\"text-white font-semibold\">Instead, we build the entire story around animated characters and designed 3D environments</strong>, eliminating physical production friction when the concept suits animation.",
            transitionLabel: "PHYSICAL PRODUCTION → ANIMATION-LED PRODUCTION",
            count: "01 OF 05"
        },
        {
            number: "02",
            tag: "02 / MANUAL ANIMATION COMPARISON",
            reason: "Reason Two",
            title: "We Are Not a Manual 3D Animation House.",
            desc: "Traditional animation requires extensive, months-long artist modeling, manual keyframing, rendering, and heavy overhead. <strong class=\"text-white font-semibold\">Instead, we leverage generative AI tools under strict creative direction</strong> to generate and refine visual scenes rapidly without sacrificing quality.",
            transitionLabel: "MANUAL ANIMATION WORKFLOW → AI-ASSISTED WORKFLOW",
            count: "02 OF 05"
        },
        {
            number: "03",
            tag: "03 / INFLUENCER PROMOTION COMPARISON",
            reason: "Reason Three",
            title: "We Are Not an Influencer Ad Agency.",
            desc: "Influencer marketing relies on personalities promoting products to their followers. <strong class=\"text-white font-semibold\">Instead, we build original brand intellectual property</strong>—characters, worlds, and narratives that belong entirely to your company and appreciate in value over time.",
            transitionLabel: "PERSONALITY ENDORSEMENT → ORIGINAL BRAND IP",
            count: "03 OF 05"
        },
        {
            number: "04",
            tag: "04 / UNGUIDED AI NOISE COMPARISON",
            reason: "Reason Four",
            title: "We Do Not Make Random Visuals.",
            desc: "Many AI-generated videos simply string together impressive clips without narrative intent. <strong class=\"text-white font-semibold\">Instead, every scene we construct has a dedicated story purpose</strong>—anchored to the customer journey and engineered for emotional resonance.",
            transitionLabel: "DISPOSABLE CLIPS → STORY-LED BRAND ADS",
            count: "04 OF 05"
        },
        {
            number: "05",
            tag: "05 / THE STRATEGIC INTEGRATION",
            reason: "Reason Five",
            title: "We Are a Creative Storytelling Studio.",
            desc: "We diagnose your brand's unique value, translate it into character motivation, and use cutting-edge AI animation tools to deliver commercial-grade films with remarkable speed and creative fidelity.",
            transitionLabel: "THE KAUSTHUBA DIFFERENCE",
            count: "05 OF 05"
        }
    ],

    // ------------------------------------------------------------------------
    // 7. PRODUCTION TIMELINE (#working-process-section)
    // ------------------------------------------------------------------------
    workingProcess: [
        { badge: "DAY 01", title: "Brand Discovery", desc: "We learn about your brand, audience, customer problem, solution, and key difference.", num: "01 / DISCOVERY" },
        { badge: "DAYS 02–03", title: "Story Development", desc: "We develop the creative concept, script, characters, and scene plan around the brand's message.", num: "02 / STORY" },
        { badge: "DAYS 04–05", title: "Video Generation", desc: "We generate the animated clips and refine the scenes, characters, and visual consistency.", num: "03 / PRODUCTION" },
        { badge: "DAY 06", title: "Sound & Music", desc: "We bring the story together with original sound effects, audio design, and custom music tracks.", num: "04 / SOUND DESIGN" },
        { badge: "DAY 07", title: "Final Delivery", desc: "We assemble the complete edit, apply final color grading, and deliver the finished master video files.", num: "05 / DELIVERY" }
    ],

    // ------------------------------------------------------------------------
    // 8. WALL OF WORKS (Infinite Moving Image Wall) (#s09a-wall-of-works)
    // Swap ANY image here to update the wall!
    // ------------------------------------------------------------------------
    wallOfWorks: {
        row1: [
            { src: "./assets/images/work/work-1.webp", alt: "Work 01", aspect: "16:9" },
            { src: "./assets/images/work/work-2.webp", alt: "Work 02", aspect: "1:1" },
            { src: "./assets/images/work/work-3.webp", alt: "Work 03", aspect: "4:3" },
            { src: "./assets/images/work/work-4.webp", alt: "Work 04", aspect: "16:9" },
            { src: "./assets/images/work/work-5.webp", alt: "Work 05", aspect: "1:1" },
            { src: "./assets/images/work/work-6.webp", alt: "Work 06", aspect: "4:3" },
            { src: "./assets/images/work/work-7.webp", alt: "Work 07", aspect: "16:9" },
            { src: "./assets/images/work/work-8.webp", alt: "Work 08", aspect: "1:1" },
            { src: "./assets/images/work/work-9.webp", alt: "Work 09", aspect: "4:3" },
            { src: "./assets/images/work/work-10.webp", alt: "Work 10", aspect: "16:9" },
            { src: "./assets/images/work/work-11.webp", alt: "Work 11", aspect: "1:1" },
            { src: "./assets/images/work/work-12.webp", alt: "Work 12", aspect: "4:3" }
        ],
        row2: [
            { src: "./assets/images/work/work-13.webp", alt: "Work 13", aspect: "4:3" },
            { src: "./assets/images/work/work-14.webp", alt: "Work 14", aspect: "16:9" },
            { src: "./assets/images/work/work-15.webp", alt: "Work 15", aspect: "1:1" },
            { src: "./assets/images/work/work-16.webp", alt: "Work 16", aspect: "4:3" },
            { src: "./assets/images/work/work-17.webp", alt: "Work 17", aspect: "16:9" },
            { src: "./assets/images/work/work-18.webp", alt: "Work 18", aspect: "1:1" },
            { src: "./assets/images/work/work-19.webp", alt: "Work 19", aspect: "4:3" },
            { src: "./assets/images/work/work-20.webp", alt: "Work 20", aspect: "16:9" },
            { src: "./assets/images/work/work-21.webp", alt: "Work 21", aspect: "1:1" },
            { src: "./assets/images/work/work-22.webp", alt: "Work 22", aspect: "4:3" },
            { src: "./assets/images/work/work-23.webp", alt: "Work 23", aspect: "16:9" },
            { src: "./assets/images/work/work-24.webp", alt: "Work 24", aspect: "1:1" }
        ],
        row3: [
            { src: "./assets/images/work/work-25.webp", alt: "Work 25", aspect: "1:1" },
            { src: "./assets/images/work/work-26.webp", alt: "Work 26", aspect: "16:9" },
            { src: "./assets/images/work/work-27.webp", alt: "Work 27", aspect: "4:3" },
            { src: "./assets/images/work/work-28.webp", alt: "Work 28", aspect: "1:1" },
            { src: "./assets/images/work/work-29.webp", alt: "Work 29", aspect: "16:9" },
            { src: "./assets/images/work/work-30.webp", alt: "Work 30", aspect: "4:3" },
            { src: "./assets/images/work/work-31.webp", alt: "Work 31", aspect: "1:1" },
            { src: "./assets/images/work/work-32.webp", alt: "Work 32", aspect: "16:9" },
            { src: "./assets/images/work/work-33.webp", alt: "Work 33", aspect: "4:3" },
            { src: "./assets/images/work/work-34.webp", alt: "Work 34", aspect: "1:1" },
            { src: "./assets/images/work/work-35.webp", alt: "Work 35", aspect: "4:3" },
            { src: "./assets/images/work/work-36.webp", alt: "Work 36", aspect: "16:9" }
        ]
    },

    // ------------------------------------------------------------------------
    // 9. SELECTED WORKS (3D Revolving Reel) (#selected-works)
    // 5 Case Studies + 1 Show All Works Collage Hub (EXACT PREVIOUS CONTENT)
    // ------------------------------------------------------------------------
    selectedWorks: [
        {
            cardClass: "card-01",
            isActive: true,
            video: "./assets/videos/work-1.mp4",
            poster: "./assets/videos/posters/work-1.webp",
            badge: "01 / BRAND FILM",
            caseCode: "CASE_01",
            client: "AETHER HOROLOGY",
            title: "The Silent Watchmaker",
            shortDesc: "120s luxury watchmaker narrative structured for high audience retention.",
            aspectBadge: "4:3 CINEMATIC CUT",
            backLogo: "Æ",
            backTitle: "AETHER HOROLOGY",
            backLocation: "GENEVA, SWITZERLAND",
            backNarrative: "Pioneering minimalist mechanical art. We directed a cinematic 120s launch film celebrating macro-craftsmanship, mechanical resonance, and micro-jewel engineering under dramatic studio chiaroscuro.",
            metrics: [
                { label: "• PRODUCTION:", value: "Macro Film + 3D CAD", isHighlight: false },
                { label: "• RETENTION RATE:", value: "78% (3x Benchmark)", isHighlight: true },
                { label: "• MEDIA ROLLOUT:", value: "Cinema 4K + Global Social", isHighlight: false }
            ],
            socials: {
                instagram: "https://instagram.com",
                youtube: "https://youtube.com",
                linkedin: "https://linkedin.com",
                web: "https://aether-watches.com"
            },
            ctaText: "[ WATCH OUR CREATION ↗ ]",
            ctaHref: "https://youtube.com"
        },
        {
            cardClass: "card-02",
            isActive: false,
            video: "./assets/videos/work-2.mp4",
            poster: "./assets/videos/posters/work-2.webp",
            badge: "02 / 3D COMMERCIAL",
            caseCode: "CASE_02",
            client: "VALKYRIE AUDIO",
            title: "Resonance of Light",
            shortDesc: "Octane studio lighting and bespoke spatial audio direction.",
            aspectBadge: "4:3 CINEMATIC CUT",
            backLogo: "VK",
            backTitle: "VALKYRIE AUDIO",
            backLocation: "BERLIN, GERMANY",
            backNarrative: "Acoustic research lab engineering spatial headphones. We created a hyper-real Octane 3D commercial sculpting light refraction over metallic surfaces paired with custom Dolby Atmos sound scoring.",
            metrics: [
                { label: "• RENDER ENGINE:", value: "Octane GPU Raytracing", isHighlight: false },
                { label: "• CONVERSION UPLIFT:", value: "+42% E-Commerce Lift", isHighlight: true },
                { label: "• AUDIO SCOPE:", value: "Spatial Soundscape Design", isHighlight: false }
            ],
            socials: {
                instagram: "https://instagram.com",
                behance: "https://behance.net",
                web: "https://valkyrie.audio"
            },
            ctaText: "[ WATCH OUR CREATION ↗ ]",
            ctaHref: "https://youtube.com"
        },
        {
            cardClass: "card-03",
            isActive: false,
            video: "./assets/videos/work-3.mp4",
            poster: "./assets/videos/posters/work-3.webp",
            badge: "03 / FLAGSHIP SHORT",
            caseCode: "CASE_03",
            client: "STUDIO ORIGINAL FILM",
            title: "TITAN: Boy & Guardian",
            shortDesc: "Non-verbal Pixar-style short with custom Foley sound scoring.",
            aspectBadge: "4:3 CINEMATIC CUT",
            backLogo: "TN",
            backTitle: "TITAN SHORT FILM",
            backLocation: "LOS ANGELES, CA",
            backNarrative: "An emotional narrative centering on an 8-year-old boy and a guardian robot. Written and produced entirely in-house without spoken dialogue, relying strictly on Pixar-level character lighting and tactile Foley sound design.",
            metrics: [
                { label: "• ANIMATION PIPELINE:", value: "Disney/Pixar Style 3D", isHighlight: false },
                { label: "• ACCOLADES:", value: "Official Festival Selection", isHighlight: true },
                { label: "• FOLEY SCORE:", value: "Custom Acoustic Scoring", isHighlight: false }
            ],
            socials: {
                instagram: "https://instagram.com",
                x: "https://x.com",
                youtube: "https://youtube.com",
                web: "https://titan-shortfilm.com"
            },
            ctaText: "[ WATCH OUR CREATION ↗ ]",
            ctaHref: "https://youtube.com"
        },
        {
            cardClass: "card-04",
            isActive: false,
            video: "./assets/videos/work-4.mp4",
            poster: "./assets/videos/posters/work-4.webp",
            badge: "04 / FEED CAMPAIGN",
            caseCode: "CASE_04",
            client: "KINETIC LABS",
            title: "Pulse of Velocity",
            shortDesc: "Multi-ratio feed rollout optimized for social algorithms.",
            aspectBadge: "4:3 CINEMATIC CUT",
            backLogo: "KN",
            backTitle: "KINETIC LABS",
            backLocation: "LONDON, UK",
            backNarrative: "High-performance sportswear label launching next-gen sneakers. We architected a 12-asset dynamic video campaign featuring high-contrast velocity trails engineered for maximum algorithmic retention.",
            metrics: [
                { label: "• IMPRESSIONS:", value: "4.8M Global Views", isHighlight: true },
                { label: "• FORMAT ROLLOUT:", value: "9:16, 16:9, 1:1 Feed", isHighlight: false },
                { label: "• CLICK-THROUGH:", value: "+31% Conversion Rise", isHighlight: false }
            ],
            socials: {
                instagram: "https://instagram.com",
                x: "https://x.com",
                linkedin: "https://linkedin.com",
                web: "https://kinetic.com"
            },
            ctaText: "[ WATCH OUR CREATION ↗ ]",
            ctaHref: "https://youtube.com"
        },
        {
            cardClass: "card-05",
            isActive: false,
            video: "./assets/videos/work-5.mp4",
            poster: "./assets/videos/posters/work-5.webp",
            badge: "05 / CINEMATIC IDENTITY",
            caseCode: "CASE_05",
            client: "AURA LABS",
            title: "Prism Architecture",
            shortDesc: "Brand visual launch combining 3D geometry & generative art.",
            aspectBadge: "4:3 CINEMATIC CUT",
            backLogo: "AU",
            backTitle: "AURA LABS",
            backLocation: "TOKYO, JAPAN",
            backNarrative: "Generative digital art platform and Web3 architectural studio. We designed a generative motion system utilizing glass prism light refraction and algorithmic real-time geometry shaders.",
            metrics: [
                { label: "• TECH STACK:", value: "WebGL + Octane 3D", isHighlight: false },
                { label: "• HONORS:", value: "FWA & Awwwards SOTD", isHighlight: true },
                { label: "• ASSETS DELIVERED:", value: "3D Motion System", isHighlight: false }
            ],
            socials: {
                instagram: "https://instagram.com",
                behance: "https://behance.net",
                x: "https://x.com",
                web: "https://auralabs.io"
            },
            ctaText: "[ WATCH OUR CREATION ↗ ]",
            ctaHref: "https://youtube.com"
        },
        // EXACT ORIGINAL CARD 06: SHOW ALL WORKS COLLAGE HUB
        {
            cardClass: "card-06",
            isCollageHub: true,
            badge: "06 / ALL CAMPAIGNS",
            archiveText: "30+ ARCHIVE",
            collageVideos: [
                "./assets/videos/work-1.mp4",
                "./assets/videos/work-2.mp4",
                "./assets/videos/work-3.mp4",
                "./assets/videos/work-4.mp4",
                "./assets/videos/work-5.mp4"
            ],
            collagePosters: [
                "./assets/videos/posters/work-1.webp",
                "./assets/videos/posters/work-2.webp",
                "./assets/videos/posters/work-3.webp",
                "./assets/videos/posters/work-4.webp",
                "./assets/videos/posters/work-5.webp"
            ],
            moreBadgeText: "+25",
            moreBadgeSub: "MORE",
            title: "Explore Full Portfolio",
            desc: "Browse all commercial films, 3D brand assets, and case studies.",
            ctaText: "[ SHOW ALL WORKS → ]",
            ctaHref: "./works.html"
        }
    ],

    // ------------------------------------------------------------------------
    // 10. WHAT OUR CLIENTS SAY ABOUT US (#sec-testimonials)
    // EXACT 3 ORIGINAL CARDS PRESERVED
    // ------------------------------------------------------------------------
    testimonials: [
        // Card 01: BE OUR FIRST CUSTOMER
        {
            type: "firstCustomer",
            initial: "K",
            studioName: "KAUSTHUBA STUDIO",
            tagline: "A NEW CREATIVE JOURNEY",
            badge: "BE FIRST",
            eyebrow: "// OUR FIRST CHAPTER",
            title: "BE OUR <span class=\"text-[#9B111E]\">FIRST</span> CUSTOMER.",
            quote: "Every great creative journey starts somewhere. Be the first brand to partner with Kausthuba and help us bring your brand's story to life through AI-assisted animation and visual storytelling.",
            footerLeft: "YOUR BRAND. OUR FIRST STORY.",
            ctaText: "LET'S TALK ↗",
            ctaHref: "#sec-inquiry"
        },
        // Card 02: SEE ALL REVIEWS ARCHIVE
        {
            type: "archive",
            badge: "[ ALL REVIEWS ]",
            archiveCount: "40+ STORIES",
            title: "SEE ALL <span class=\"text-[#9B111E]\">REVIEWS</span>",
            desc: "Explore full client testimonials, case metrics, and audio/video production breakdowns in our archive.",
            ctaText: "[ READ ALL FEEDBACK ↗ ]",
            ctaHref: "./testimonials.html"
        },
        // Card 03: "WE'RE JUST GETTING STARTED"
        {
            type: "videoCard",
            video: "./assets/videos/work-6.mp4",
            poster: "./assets/videos/posters/work-6.webp",
            topBadge: "// REEL PAUSED",
            studioYear: "STUDIO_2026",
            eyebrow: "// WE RAN OUT OF CARDS",
            title: "THAT'S ALL FOR NOW. <br/><span class=\"text-[#9B111E]\">(UNLESS YOU'RE NEXT.)</span>",
            desc: "We've got plenty of screen time left. Let's make your brand the main event.",
            ctaText: "[ CLAIM THE NEXT SLOT → ]",
            ctaHref: "pages/about.html"
        }
    ],

    // ------------------------------------------------------------------------
    // 10b. CAPABILITIES & STORY ANGLES (#sec-capabilities)
    // ------------------------------------------------------------------------
    capabilities: [
        {
            index: "0",
            number: "01",
            label: "01 // THE PROBLEM",
            hudValue: "CUSTOMER FRICTION",
            title: "The Problem",
            description: "Show the customer's frustration before the product. We capture real-world struggles and friction points through an engaging, relatable character scenario.",
            video: "./assets/videos/work-11.mp4",
            poster: "./assets/videos/posters/work-11.webp"
        },
        {
            index: "1",
            number: "02",
            label: "02 // THE SOLUTION",
            hudValue: "PRODUCT VALUE",
            title: "The Solution",
            description: "Bring the product's core value to life through a clear, visual story showing exactly how your brand solves the customer's challenge.",
            video: "./assets/videos/work-12.mp4",
            poster: "./assets/videos/posters/work-12.webp"
        },
        {
            index: "2",
            number: "03",
            label: "03 // THE DIFFERENCE",
            hudValue: "MARKET STANDOUT",
            title: "The Difference",
            description: "Explain why your brand stands out from conventional alternatives, highlighting your unique differentiator in a memorable animated narrative.",
            video: "./assets/videos/work-13.mp4",
            poster: "./assets/videos/posters/work-13.webp"
        },
        {
            index: "3",
            number: "04",
            label: "04 // THE EMOTION",
            hudValue: "BRAND BOND",
            title: "The Emotion",
            description: "Build a memorable, character-driven narrative around the brand that resonates emotionally with viewers and inspires lasting customer trust.",
            video: "./assets/videos/work-14.mp4",
            poster: "./assets/videos/posters/work-14.webp"
        }
    ],

    // ------------------------------------------------------------------------
    // 11. FAQ ACCORDION (#sec-faq)
    // ALL 5 EXACT ORIGINAL CARDS INCLUDED
    // ------------------------------------------------------------------------
    faq: [
        {
            id: "faq-card-1",
            depth: "0.04",
            position: "top-12 md:top-16 left-0 sm:left-4 md:left-8",
            borderClass: "border-[#9B111E]/40",
            bgClass: "bg-[#140b0d]/95",
            hoverClass: "hover:border-[#C41E3A]",
            titleColor: "text-[#E8D5D8]",
            btnBg: "bg-[#9B111E]/20 text-[#E8D5D8]",
            btnHover: "group-hover:bg-[#9B111E] group-hover:text-white",
            lineColor: "border-[#9B111E]/20",
            question: "What is Kausthuba, and what do you create?",
            answer: "Kausthuba is an AI-assisted creative storytelling studio for brand advertising. We turn a brand’s customer problem, solution, and unique value into an engaging visual story, then bring it to life through animated scenes, editing, music, and sound."
        },
        {
            id: "faq-card-2",
            depth: "0.03",
            position: "top-12 md:top-16 right-0 sm:right-4 md:right-8",
            borderClass: "border-[#C41E3A]/40",
            bgClass: "bg-[#1a0c0f]/95",
            hoverClass: "hover:border-[#9B111E]",
            titleColor: "text-white",
            btnBg: "bg-[#C41E3A]/20 text-white",
            btnHover: "group-hover:bg-[#C41E3A]",
            lineColor: "border-[#C41E3A]/20",
            question: "How does the Kausthuba process work?",
            answer: "We start by understanding your brand, audience, and what makes your solution different. Then we develop the story, plan the scenes, generate and refine the visuals, and assemble everything into a finished advertisement with music and sound effects."
        },
        {
            id: "faq-card-3",
            depth: "0.05",
            position: "bottom-28 left-0 sm:left-4 md:left-8",
            borderClass: "border-[#800020]/50",
            bgClass: "bg-[#12080a]/95",
            hoverClass: "hover:border-[#9B111E]",
            titleColor: "text-[#E8D5D8]",
            btnBg: "bg-[#800020]/30 text-[#E8D5D8]",
            btnHover: "group-hover:bg-[#9B111E] group-hover:text-white",
            lineColor: "border-[#800020]/30",
            question: "How long does it take to create an advertisement?",
            answer: "Most projects follow a 7-day production plan, from brand discovery to final quality checks. More complex stories may take up to 11 days, depending on the creative requirements, additional refinement, and revisions."
        },
        {
            id: "faq-card-4",
            depth: "0.035",
            position: "bottom-28 right-0 sm:right-4 md:right-8",
            borderClass: "border-[#9B111E]/40",
            bgClass: "bg-[#170a0c]/95",
            hoverClass: "hover:border-[#C41E3A]",
            titleColor: "text-white",
            btnBg: "bg-[#9B111E]/20 text-white",
            btnHover: "group-hover:bg-[#9B111E]",
            lineColor: "border-[#9B111E]/20",
            question: "How much does a Kausthuba advertisement cost?",
            answer: "Pricing depends on the story, video duration, and production complexity. Once we understand your brand and requirements, we can suggest a suitable creative direction and provide a project-specific quote."
        },
        // 5TH CARD: POPPING BOTTOM CTA BOX
        {
            id: "faq-card-5",
            depth: "0.02",
            isCtaCard: true,
            title: "Can't find your answer?",
            desc: "If you have questions or need more details, feel free to reach out.",
            ctaText: "LET'S TALK TODAY",
            ctaHref: "pages/contact.html"
        }
    ],

    // ------------------------------------------------------------------------
    // 12. PROJECT INQUIRY FORM & ARCH (#sec-inquiry)
    // ------------------------------------------------------------------------
    inquiry: {
        totalOrbitalCards: 25,
        statusPrefix: "// PROJECT INQUIRY",
        studioName: "KAUSTHUBA STUDIO",
        tagline: "BUILT AROUND YOUR VISION",
        badge: "[ START YOUR BRAND FILM ]",
        titleLine1: "LET'S BUILD YOUR",
        titleHighlight: "STORY TOGETHER",
        submitButtonText: "[ TRANSMIT INQUIRY ]"
    },

    // ------------------------------------------------------------------------
    // 13. SECTION 14 BENTO PRODUCTION MATRIX (#sec-14-stage)
    // ------------------------------------------------------------------------
    bento: {
        centerVideo: "assets/videos/work.mp4",
        centerVideoPoster: "assets/videos/posters/work.webp"
    }
};

// Export for browser and node
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
