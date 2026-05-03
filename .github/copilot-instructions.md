# Copilot Instructions

## What this is

A **Discourse theme component** (not a plugin) that registers a Clarion language definition with Highlight.js so Discourse forums can syntax-highlight Clarion code fences.

Installed through Discourse Admin → Customize → Themes → Components (paste the repo URL). There is no local build system, package manager, or test suite.

## Repository structure

| Path | Purpose |
|------|---------|
| `about.json` | Component metadata (`"component": true` marks it as a theme component, not a full theme) |
| `common/color_definitions.scss` | CSS custom properties for all token colours, supporting light/dark mode via Discourse's `dark-light-choose()` |
| `common/common.scss` | CSS rules mapping custom properties to Highlight.js class names, scoped to `.lang-clarion` |
| `javascripts/discourse/api-initializers/init-clarion-highlightjs.js` | Registers the language definition with Discourse's `api.registerHighlightJSLanguage("clarion", ...)` |

## Architecture

The language definition lives entirely inside `init-clarion-highlightjs.js` as an `apiInitializer("0.13", ...)` callback. It builds a flat array of Highlight.js rule objects (`CLARION_RULES`) and returns a language descriptor with:

- `aliases: ['clarion', 'Clarion', 'CLARION']` — all three casings trigger highlighting
- `case_insensitive: true` — token regexes use `(?i:...)` inline flags as well

Custom token class names (not standard hljs names):

| Class name | Usage |
|-----------|-------|
| `keyword-hard` | Control-flow keywords (`IF`, `LOOP`, `RETURN`, …) |
| `keyword-soft` | Structure keywords (`CLASS`, `WINDOW`, `REPORT`, …) |
| `label` | Line-start identifiers |
| `class-label` | `Object.Member` dotted references |
| `picture-numeric-format` | `@N…~` picture strings |

Every custom class name must have a matching CSS variable in `color_definitions.scss` and a rule in `common.scss`.

## Grid renderer

A second feature in the same JS file: ` ```grid ` or ` ```grid6 ` code fences are intercepted by a `decorateCookedElement` decorator and replaced with a rendered HTML `<table>`. The number suffix is optional and ignored at runtime (column count is inferred from the first row). Syntax inside the fence:

```
SurName|First Name|Born|Died|Notes
Lingo|George|1992-?-?||Clarion Education/Trainer
```

- First row → `<thead>`, remaining rows → `<tbody>`
- Leading/trailing `|` are stripped before splitting (so `| A | B |` and `A|B` both work)
- Rows are padded/truncated to match the header column count
- Output is wrapped in `<div class="clarion-grid-wrapper">` with `overflow-x: auto` for mobile horizontal scroll
- CSS lives in `common.scss` under `.clarion-grid-wrapper` / `.clarion-grid`

## Conventions

- **Rule order matters**: rules earlier in `CLARION_RULES` take priority. `STRING_LITERAL` and `COMMENTS` come first to prevent keywords inside strings/comments from matching.
- **Colour theming**: always define colours as CSS custom properties in `color_definitions.scss` using `dark-light-choose(lightValue, darkValue)`. Never hard-code hex values in `common.scss`.
- **Scoping**: all CSS rules in `common.scss` are nested inside `.lang-clarion {}` to avoid affecting other language blocks.
- **No external dependencies**: the component is self-contained; do not introduce npm packages or external scripts.
