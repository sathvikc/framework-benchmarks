# Weather App — Lume.js

A minimal reactive weather application built with [Lume.js](https://github.com/sathvikc/lume-js) (~5.58 KB gzipped, all-in-one).

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
- **`computed()`** — derives `showWeather` from `hasData`, `isLoading`, `hasError`
- **`show`** handler — built-in handler for `data-show` visibility toggling

This benchmark app uses the **CDN Global (IIFE)** build — a single `<script defer>` tag, no ES module syntax required.

```html
<script defer src="https://cdn.jsdelivr.net/npm/lume-js/dist/lume.global.js"></script>
<script>
  const { state, bindDom, computed, repeat, show } = window.Lume;
</script>
```

## All Supported Import Patterns

**npm (tree-shakeable ESM):**
```js
import { state, bindDom, effect, isReactive } from 'lume-js';
import { computed, watch, repeat, debug } from 'lume-js/addons';
import { show, classToggle, boolAttr } from 'lume-js/handlers';
```

**CDN ESM (module script, tree-shakeable):**
```html
<script type="module">
  import { state, bindDom } from 'https://cdn.jsdelivr.net/npm/lume-js/dist/index.min.mjs';
  import { computed, repeat } from 'https://cdn.jsdelivr.net/npm/lume-js/dist/addons.min.mjs';
  import { show } from 'https://cdn.jsdelivr.net/npm/lume-js/dist/handlers.min.mjs';
</script>
```

**CDN Global (IIFE, all-in-one, what this benchmark uses):**
```html
<script defer src="https://cdn.jsdelivr.net/npm/lume-js/dist/lume.global.js"></script>
<script>
  const { state, bindDom, computed, repeat, show } = window.Lume;
</script>
```

## Real-world example

[Lume.js](https://sathvikc.github.io/lume-js) — library documentation site built with Lume.js itself.
