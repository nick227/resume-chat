## Frontend Build & Optimization Plan

### Goals
- Vite build in static mode (no dev server) for CSS/JS bundling and hashing.
- JavaScript linting.
- Precompressed assets at build time only (`.br`/`.gz`).
- Serve `dist` with aggressive cache for hashed assets and no-cache HTML.
- Control the critical path with preload hints and CSS code splitting.

### Current State Notes
- Static assets are served from `public/` via `express.static` in `server.js`.
- CSS uses `@import` statements in `public/css/styles.css`.
- JS entry uses ES modules (`public/js/main.js`).

### Proposed Build Pipeline (Vite Static)
- **Build**: `vite build` only; no dev server and no build-on-start.
- **CSS**: Vite + Lightning CSS for minification and code splitting.
- **JS**: Vite + esbuild minifier for bundling, tree-shaking, and minification.
- **Manifest**: Vite `manifest.json` for data-driven HTML wiring.
- **Compression**: Build-time precompression for `.br` and `.gz`.
- **Browserslist**: Source of target browsers for toolchain.
- **CSS imports**: Flattened at build time; no runtime @import in output.
- **CSS import rules**: Imports must be static and top-level in source.

### Critical Path Control
- **No manual HTML edits**; HTML is data-driven via Vite `transformIndexHtml` (preferred).
- **CSS**: Do not inline full CSS unless <10kb. Use preload + stylesheet:
  - `<link rel="preload" href="/assets/app.css" as="style">`
  - `<link rel="stylesheet" href="/assets/app.css">`
- **JS**: Use modulepreload + module script; avoid `defer`:
  - `<link rel="modulepreload" href="/assets/app.js">`
  - `<script type="module" src="/assets/app.js"></script>`
- **JS preload scope**: Only modulepreload the entry chunk and critical shared chunks.
- **Fonts**: Preload woff2 with CORS; set `font-display: swap` (or `optional`):
  - `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>`
- **Font scope**: Only one font family is critical-path.
- **CSS code splitting**: Let critical CSS load first.

### Concrete Steps (Implementation)
1. Add Vite + ESLint + compression plugin + Lightning CSS config.
2. Add `browserslist` targets.
3. Add build scripts to `package.json` (clean version):
   - `lint`: `eslint public/js`
   - `build`: `vite build`
4. Automate HTML wiring using one of:
   - **Vite `transformIndexHtml`** (recommended; read manifest if needed)
5. Update `server.js` to serve `dist` only, with precompressed assets.
6. Ensure no build logic runs at server start (build happens in deploy).
7. Validate runtime: verify `dist` assets load and API routes still work.

### Server Behavior (Final Shape)
- `app.use('/api', apiRoutes)`
- Serve `dist` with precompressed assets only:
  - Prefer `.br`, then `.gz`; no runtime compression.
  - Set `Vary: Accept-Encoding`.
  - Set correct `Content-Encoding` and `Content-Type`.
- HTML (`index.html`) is no-cache.
- Hashed assets are long-cache and immutable.
- Fonts (`.woff2`) are long-cache with CORS.

### Cache Headers (Explicit)
- `index.html`: `no-cache`
- `*.js`, `*.css` (hashed): `public, max-age=31536000, immutable`
- `*.woff2`: `public, max-age=31536000, immutable`
- `.br` / `.gz`: same as source asset

### Review Checklist
- Build output is deterministic and minified via Vite.
- `dist/` contains only required hashed assets.
- Precompressed `.br`/`.gz` exist for static assets.
- HTML is data-driven, not manually edited per build.
- Cache headers match: no-cache HTML, immutable assets, fonts with CORS.
- CSS imports are static and top-level; no runtime `@import` in output.
- Modulepreload is limited to entry + critical shared chunks.

### Guardrails (Do Not Do)
- Inline CSS "just because".
- Add runtime compression.
- Hand-edit HTML after build.
- Add a CSS framework without critical-path justification.