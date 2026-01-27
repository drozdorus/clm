# Calma.io — Website Overview

## Company

- **Name**: Calma
- **Domain**: calma.io
- **Tagline**: "Keep calm, Calma generates leads"
- **Pitch**: "Where data meets creativity to fuel lead generation success"
- **Industry**: AI-powered lead generation agency
- **Team**: ~10 members
- **Target market**: US (primary), open to other geographies
- **Contact**: info@calma.io
- **LinkedIn**: https://www.linkedin.com/company/calma-io/
- **Careers**: Managed via Notion — https://calma-io.notion.site/Open-Vacancies-Calma-Agency-169f120c65df806bba68fc5163bcfa52

---

## Tech Stack

- **Static site** — pure HTML/CSS/JavaScript, no frameworks or build tools
- **Hosting**: GitHub Pages (repo: github.com/drozdorus/clm)
- **Form backend**: Formspree (`https://formspree.io/f/xzzgddjo`)
- **Fonts**: Geologica (local TTF, 9 weights) + Nexa (secondary)
- **No analytics code** currently present in the source

---

## Site Structure

Single-page app with anchor navigation + a separate privacy policy page.

### Sections (index.html)

| # | Section | Anchor | Purpose |
|---|---------|--------|---------|
| 1 | Hero | `#top` | Animated wave canvas background, headline, scroll indicator |
| 2 | About | `#about` | Value proposition, AI-driven methodology (3 pillars), traffic sources |
| 3 | Services | `#services` | 6 industry verticals |
| 4 | Events | `#conferences` | Upcoming (3) and past (7, collapsible) conferences |
| 5 | Contact | `#contact` | Contact form + email + careers link |
| 6 | Footer | — | Logo, nav, LinkedIn, copyright, privacy link |

### Separate Pages

- `/privacy/index.html` — Privacy Policy (last updated Nov 19, 2025)

---

## Services (6 Verticals)

1. Auto Insurance
2. Home Insurance
3. Health Insurance
4. Legal Services
5. Home Improvement
6. Financial Services

## Traffic Sources

- Meta (Facebook/Instagram)
- Google Ads
- TikTok Ads

## Methodology (3 Pillars)

1. AI Audience Intelligence
2. Automated Optimization
3. Quality Assurance

---

## Events

### Upcoming

| Event | Location | Dates |
|-------|----------|-------|
| Affiliate Takeover | Miami | Mar 18–19, 2026 |
| LeadsCon | Las Vegas | Apr 20–24, 2026 |
| Affiliate Summit East | New York | Jul 27–28, 2026 |

### Past (7 events, Jul 2024 – Jan 2026)

Affiliate Summit West, Web Summit, SBC, Affiliate World Europe, Affiliate Gala, and others.

---

## Design System

- **Theme**: Dark mode only
- **Background**: `#0a0a0a`
- **Primary accent**: Gold `#FFD700`
- **Secondary accent**: Neon Green `#00FF7F`
- **Text**: White with opacity variants (100% / 70% / 50%)
- **Style**: Glassmorphism (backdrop blur), gradient text, subtle glow effects
- **Layout**: CSS Grid + Flexbox, max-width 1100px container
- **Responsive breakpoints**: 768px (mobile), 480px (small mobile)

---

## Key Interactive Features

- **Canvas wave animation** — 5-layer animated sine waves with color-shifting HSL gradients, scroll-linked parallax and fade
- **Smooth scroll navigation** — anchor links with 80px header offset
- **Intersection Observer animations** — sections fade in on scroll
- **Mobile menu** — full-screen overlay with blur
- **Contact form** — validation, loading states, toast notifications (success/error)
- **Past events accordion** — collapsible with chevron rotation

---

## Assets

- `img/logo.svg` / `img/calma_white-logo.svg` — brand logo
- `img/metaimg.png` — OpenGraph / social sharing image
- `img/meta.svg`, `img/google.svg`, `img/tt.svg` — platform logos
- `img/favicon/` — full favicon set (Android, Apple, standard)
- Conference logos: `ato-logo.png`, `lc-logo.png`, `ase-logo.png`, `asw-logo.png`, `ag-logo.png`, `aw-logo.png`, `ws-logo.png`

---

## Third-Party Integrations

| Service | Purpose | Details |
|---------|---------|---------|
| Formspree | Contact form emails | POST to `https://formspree.io/f/xzzgddjo` |
| LinkedIn | Social presence | Company page linked in header/footer/mobile |
| Notion | Careers/hiring | External vacancies page |
| GitHub Pages | Hosting & deploy | Push to `main` triggers deploy |

---

---

# Feature Development Plan

## Feature 1: Team Section

**Placement**: After About, before Services (`#about` → `#team` → `#services`)

### Team Members

| Name | Creative Title |
|------|---------------|
| Rus | Chaos Coordinator-in-Chief |
| Yehor | Sleepless Bizdev Machine |
| Artur | Traffic Tamer |
| Zakharii | Creative Storm Starter |
| Anastasiia | Process Ninja |
| Vita | Ads Warrior |
| Lisa | Footage Magician |
| Alex | Pixel Perfectionist |
| Julia | Number Whisperer |

### Design Notes

- Illustrational pictures (not real photos) — placeholder images needed from design team
- Card-based grid layout matching existing design system (dark surface cards, gold/green accents)
- Responsive: 3 columns desktop → 2 tablet → 1 mobile

### Implementation Steps

#### Step 1 — HTML skeleton
- Add a new `<section id="team">` between About and Services in `index.html`
- Section heading: "Our Team" (or similar, matching existing heading style)
- Add 9 team member cards with: image placeholder, name, creative title
- Add nav link "Team" to header navigation (desktop + mobile menu)
- **Test**: Page loads, section is visible, navigation scrolls to it

#### Step 2 — Team card CSS
- Add `.team-grid` styles (CSS Grid, responsive columns)
- Add `.team-card` styles matching existing design system:
  - `var(--surface)` background, `var(--radius-md)` corners
  - Hover effect (lift + glow, consistent with service cards)
  - Image container with consistent aspect ratio
- Add gradient text or accent color for creative titles
- **Test**: Cards render correctly at all breakpoints (desktop, tablet, mobile)

#### Step 3 — Placeholder images
- Add illustrational placeholder images to `img/team/` directory
- Files: `rus.png`, `yehor.png`, `artur.png`, `zakharii.png`, `anastasiia.png`, `vita.png`, `lisa.png`, `alex.png`, `julia.png`
- If final illustrations aren't ready, use solid-color SVG placeholders with initials
- **Test**: Images load, correct aspect ratio, no layout shift

#### Step 4 — Scroll animation
- Ensure Intersection Observer picks up the new section for fadeInUp animation
- Verify smooth scroll offset works correctly for the new `#team` anchor
- **Test**: Section animates in on scroll, nav link scrolls to correct position

---

## Feature 2: Case Studies

**Format**: Summary cards on main page → each links to a dedicated case study page
**Count**: 2–3 to start, scalable layout

### Placement

New section on main page after Services, before Events:
`About → Team → Services → Case Studies → Events → Contact`

### Implementation Steps

#### Step 5 — Case studies section HTML (main page)
- Add `<section id="cases">` between Services and Events in `index.html`
- Section heading: "Case Studies" (matching existing heading style)
- Add 2–3 case study cards, each containing:
  - Industry/vertical tag (e.g., "Auto Insurance")
  - Title (e.g., "How We Generated 10K Leads in 30 Days")
  - 1–2 line summary
  - Key metric highlight (e.g., "3x ROI" or "10,000+ leads")
  - "Read more →" link
- Add "Case Studies" nav link to header (desktop + mobile)
- **Test**: Section visible, cards render, nav link works

#### Step 6 — Case study cards CSS
- Add `.cases-grid` styles (CSS Grid, responsive)
- Add `.case-card` styles:
  - Surface background, hover effects consistent with rest of site
  - Industry tag with accent color pill/badge
  - Metric highlight with gradient text (gold → green)
  - "Read more" link with arrow transition on hover
- Responsive: 3 columns → 2 → 1
- **Test**: Cards look correct at all breakpoints, hover states work

#### Step 7 — Case study page template
- Create `/cases/` directory
- Create a reusable HTML page template (`/cases/case-template.html` as reference)
- Page structure:
  - Minimal header (logo + back link to main page `/#cases`)
  - Hero banner with case title + industry tag + key metric
  - Article body area (flexible content: paragraphs, subheadings, pull quotes, metric callouts)
  - Footer (same as main page)
- Shared styles: reuse existing `style.css` or create a lightweight `cases.css` that imports common variables
- **Test**: Template page loads independently, styles are consistent, back link works

#### Step 8 — First case study content
- Create `/cases/case-1/index.html` (or slug-based name)
- Fill in with actual case study content (provided by the team)
- Link the corresponding card on the main page to this URL
- **Test**: Card links to correct page, page renders fully, back navigation works

#### Step 9 — Remaining case studies
- Create `/cases/case-2/index.html` (and case-3 if applicable)
- Link remaining cards on main page
- **Test**: All cards link correctly, all pages render

#### Step 10 — Final polish & QA
- Cross-browser testing (Chrome, Safari, Firefox, mobile Safari)
- Verify all new sections work with existing Intersection Observer
- Check that mobile menu includes new nav links and closes properly
- Confirm smooth scroll offsets are correct for all new anchors
- Verify SEO: update `sitemap.xml` with new case study URLs
- Performance: ensure new images are optimized (compressed, correct dimensions)
- **Test**: Full end-to-end walkthrough on desktop and mobile

---

## Updated Site Structure (After Both Features)

| # | Section | Anchor |
|---|---------|--------|
| 1 | Hero | `#top` |
| 2 | About | `#about` |
| 3 | **Team** | `#team` |
| 4 | Services | `#services` |
| 5 | **Case Studies** | `#cases` |
| 6 | Events | `#conferences` |
| 7 | Contact | `#contact` |
| 8 | Footer | — |

### New Separate Pages

- `/cases/case-1/index.html`
- `/cases/case-2/index.html`
- `/cases/case-3/index.html` (if applicable)

---

# Design Review & 2026 Refresh Recommendations

## What's Already Working Well

The site has strong fundamentals that align with current trends:

- **Dark mode** — Still the dominant aesthetic in 2026 (82%+ of users prefer it)
- **Glassmorphism** — Backdrop blur on header/cards remains relevant; considered "calm futurism"
- **Canvas wave animation** — Organic, dynamic backgrounds are on-trend
- **Clean typography** — Geologica is a solid, modern choice
- **Gradient accents** — Gold-to-green gradient is distinctive and memorable
- **No framework bloat** — Fast load times, which is increasingly important

## Recommended Refreshes

### 1. Fix the Services section color disconnect (Priority: High)

The Services section (`section.services.inverted`) flips to a full white background in the middle of a dark site. This creates a jarring visual break and feels dated. In 2026, dark-themed sites maintain consistency using **surface color variations** rather than full theme inversions.

**Recommendation**: Remove the `.inverted` class. Restyle service cards to use the dark theme with slightly elevated surface colors (e.g., `rgba(255,255,255,0.05)` background, white text). This creates visual separation without breaking the immersion.

### 2. Add staggered entrance animations (Priority: Medium)

The current `fadeInUp` applies uniformly to entire sections. 2026 trend is **staggered reveal** — individual cards animate in sequentially with slight delays, creating a cascade effect.

**Recommendation**: Add `transition-delay` per card using CSS `:nth-child()` selectors (e.g., 0ms, 80ms, 160ms). Minimal code change, noticeable visual upgrade.

### 3. More expressive hero typography (Priority: Medium)

2026 trend is kinetic, expressive headlines. The current hero is clean but static after initial load.

**Recommendation**: Consider a subtle text animation — e.g., the word "Calma" could have a slight shimmer/gradient shift on loop, or the headline could reveal word-by-word on load. Keep it subtle; the goal is polish, not distraction.

### 4. Add `prefers-reduced-motion` support (Priority: Medium)

Accessibility requirement that's becoming standard. Some users get motion sickness from animations.

**Recommendation**: Add a `@media (prefers-reduced-motion: reduce)` block that disables the canvas animation, fadeInUp, hover transforms, and the floating scroll arrow. A few lines of CSS.

### 5. Widen the container (Priority: Low)

`max-width: 1100px` is narrow by 2026 standards, especially on wide displays. Most modern sites use 1200–1400px.

**Recommendation**: Bump to `1200px`. Test at various screen sizes to ensure nothing breaks.

### 6. Add subtle section dividers with more presence (Priority: Low)

The current `.section-divider` is a single 1px line at 8% opacity — nearly invisible. Sections blend together without clear boundaries.

**Recommendation**: Use a subtle gradient divider (gold → transparent → green), or add more vertical spacing between sections. Could also use a faint horizontal line with a centered icon or dot as a visual anchor.

### 7. Update footer copyright year (Priority: Quick fix)

Footer currently says "© 2025". Should be "© 2026" or better yet, use a dynamic year approach if you ever move to a templating system.

### 8. Consider a light/dark toggle (Priority: Low, optional)

2026 standard is offering both modes. However, since Calma's brand identity is strongly tied to the dark aesthetic, this is optional. If implemented, the light mode would need its own careful design pass — it shouldn't just be an inversion.

### 9. Improve card hover microinteractions (Priority: Low)

Current hover effects (translateY + scale) are functional but generic. 2026 leans toward more purposeful microinteractions.

**Recommendation**: Replace the `scale(1.03)` on conference/traffic source cards with a subtle border-glow animation instead. The `translateY(-4px)` lift is fine to keep. Consider adding a slight tilt effect (CSS `perspective` + `rotateX/Y`) on team cards for personality.

### 10. Add a scroll progress indicator (Priority: Low, optional)

A thin gold gradient line at the top of the viewport that fills as the user scrolls. Provides orientation on a long single-page site — especially useful as you add Team and Case Studies sections.

## Quick Wins Checklist

These can be done in a single pass before or alongside the feature work:

- [ ] Remove `.inverted` from Services, restyle for dark theme
- [ ] Update footer year to 2026
- [ ] Add `@media (prefers-reduced-motion: reduce)` block
- [ ] Add staggered animation delays to card grids
- [ ] Bump container max-width to 1200px
- [ ] Fix `sitemap.xml` domain

---

## Data Still Needed

- [ ] Illustrational images for all 9 team members (or direction for placeholder style)
- [ ] Case study content for 2–3 studies (industry, title, summary, metrics, full article text)

---

## Known Issues / Notes

- `sitemap.xml` references `calma.ad` with a Cyrillic character in the URL — likely needs correction to `calma.io`
- No analytics (Google Analytics, etc.) detected in the source code
- `calma01.zip` (921KB) sits in the repo root — likely an old backup that could be removed
- `robots.txt` allows all crawling but sitemap points to wrong domain
