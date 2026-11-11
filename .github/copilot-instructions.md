# Copilot instructions for this repository

## Project overview

Thi`s repository is a static, single-page portfolio for Tayyeb Iqbal. It is intentionally framework-free: the site is built with semantic HTML, custom CSS, and vanilla JavaScript only. Treat changes` as browser-first UI work rather than application development with a build pipeline.

## Build, test, and validation commands

There is no package manifest, no test runner, and no lint configuration in this repository.

Use one of the following to preview the site locally:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

You can also open `index.html` directly in a browser for quick checks.

When validating a change, verify the page still renders correctly in the browser and that key interactions still work:

- section navigation highlights remain in sync
- mobile menu toggles correctly
- scroll progress and reveal animations still work
- reduced-motion behavior remains acceptable
- asset paths still resolve correctly from the repository root

## High-level architecture

The project is intentionally simple and centered around a few key files:

- `index.html`: the complete portfolio page and section structure. Most content, metadata, and semantic markup live here.
- `assets/css/style.css`: the full visual system for the portfolio. This file contains the palette, typography, layout, responsive rules, animation timing, and accessibility styling.
- `assets/js/main.js`: progressive enhancement logic for the nav, scroll spy, reveal animations, and the animated hero canvas background.
- `assets/img/`: all non-code media, including the profile photo, resume PDF, favicon, project placeholders, and icon/logo assets.

The site is a one-page portfolio experience. Most behavior is driven by CSS and DOM interaction rather than component frameworks or data fetching.

## Key conventions

- Keep the repository dependency-free. Do not add frameworks, build tools, package managers, or NPM dependencies unless the task explicitly requires them.
- Preserve the established visual identity: dark charcoal/deep-navy background, forest-green accented CTAs and highlights, restrained gold details, and uppercase display typography.
- Favor semantic, accessible HTML. Maintain skip links, heading structure, aria attributes, and keyboard-focus styling.
- Keep asset references relative and stable. New images or PDFs should live under `assets/` and match the existing path conventions.
- Respect the current animation patterns. The site includes scroll reveals and a pointer-reactive hero canvas; keep motion polished without making the page heavier or noisier.
- Prefer surgical edits over broad refactors. This codebase is intentionally compact, so small, direct changes are the norm.
- Preserve responsive behavior: the single-page layout should remain usable across desktop and mobile sizes without introducing layout regressions.

## Content and deployment expectations

- Keep the personal branding and contact details consistent with the existing portfolio copy.
- If placeholder assets are introduced, keep the placeholders clearly marked and avoid breaking the layout.
- Maintain the current static-site delivery model unless the task explicitly calls for a new deployment structure.
