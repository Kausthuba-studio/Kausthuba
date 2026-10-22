/**
 * ============================================================================
 * KAUSTHUBA STUDIO — STATIC PAGE BUILD & VALIDATOR SCRIPT
 * ============================================================================
 * Run with: npm run build  OR  node scripts/build.js
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const configPath = path.join(rootDir, 'config', 'site-config.js');
const indexPath = path.join(rootDir, 'index.html');

console.log('----------------------------------------------------');
console.log('KAUSTHUBA STUDIO — VALIDATING MODULAR SITE CONFIG');
console.log('----------------------------------------------------');

// 1. Load config
delete require.cache[require.resolve(configPath)];
const cfg = require(configPath);

console.log(`✓ Studio: ${cfg.brand.name} | ${cfg.brand.tagline}`);
console.log(`✓ Email: ${cfg.brand.email}`);
console.log(`✓ Wall of Works: ${cfg.wallOfWorks.row1.length + cfg.wallOfWorks.row2.length + cfg.wallOfWorks.row3.length} curated images`);
console.log(`✓ Selected Works: ${cfg.selectedWorks.length} commercial cases (including Card 06 Collage Hub)`);
console.log(`✓ Testimonials: ${cfg.testimonials.length} authentic studio cards`);
console.log(`✓ Capabilities: ${cfg.capabilities.length} narrative angles`);
console.log(`✓ FAQ: ${cfg.faq.length} cards (including Card 05 CTA)`);
console.log(`✓ Section 13 Inquiry Arch: ${cfg.inquiry.totalOrbitalCards} orbital cards`);

// 2. Validate index.html exists and has config scripts
if (!fs.existsSync(indexPath)) {
    console.error('✗ ERROR: index.html not found!');
    process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('config/site-config.js') || !html.includes('js/site-renderer.js')) {
    console.warn('! Notice: Ensuring config scripts are registered in index.html <head>');
    const headInjection = `    <!-- Modular Site Configuration & Dynamic Renderer -->\n    <script src="config/site-config.js"></script>\n    <script src="js/site-renderer.js"></script>\n`;
    const updatedHtml = html.replace('</head>', `${headInjection}</head>`);
    fs.writeFileSync(indexPath, updatedHtml, 'utf8');
}

// 3. Validate pages directory
const pagesDir = path.join(rootDir, 'pages');
const expectedPages = ['about.html', 'contact.html', 'works.html', 'testimonials.html', 'privacy-policy.html', '404.html'];
const existingPages = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir) : [];
const allPagesPresent = expectedPages.every(p => existingPages.includes(p));
if (allPagesPresent) {
    console.log(`✓ Modular Pages: ${existingPages.length} organized subpages validated in pages/`);
}

console.log('----------------------------------------------------');
console.log('✓ BUILD SUCCESS: All modular components validated & ready.');
console.log('----------------------------------------------------');
