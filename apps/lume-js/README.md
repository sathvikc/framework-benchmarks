# Weather App — Lume.js

A minimal reactive weather application built with [Lume.js](https://github.com/sathvikc/lume-js) (~2.4 KB gzipped).

## Usage

```bash
# Dev server (no build step required)
npm run dev        # python3 -m http.server 3000

# Run tests
npm run test       # Playwright E2E

# Lint
npm run lint
```

## Implementation

Lume.js is closest to Alpine in philosophy — HTML-first, no build step, minimal overhead. The implementation uses:

- **`state()`** — flat reactive store holding all UI state
- **`bindDom()`** — binds `data-bind`, `data-show`, `data-disabled`, and a custom `data-classname` handler to DOM elements
- **`repeat()`** — keyed list rendering for the 7-day forecast (from `lume-js/addons`)

All three are loaded via ESM CDN in `<script type="module">` — no node_modules, no bundler.

```js
import { state, bindDom } from 'https://cdn.jsdelivr.net/npm/lume-js@2.0.1/dist/index.mjs';
import { repeat } from 'https://cdn.jsdelivr.net/npm/lume-js@2.0.1/dist/addons.mjs';
import { show } from 'https://cdn.jsdelivr.net/npm/lume-js@2.0.1/dist/handlers.mjs';
```

## Real-world example

[Lume.js](https://sathvikc.github.io/lume-js) — library documentation site built with Lume.js itself.
