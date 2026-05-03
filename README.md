# Discourse HighlightJS Clarion Syntax Highlighting

This plugin adds syntax highlighting for the Clarion language to Discourse, using Highlight.js.

## Installation

To install this theme component, do the following:

1. Navigate to your Discourse site's Admin panel.
2. Go to `Customize > Themes > Components`.
3. Click `Install` and paste in the URL to this repository.

## Features

### Clarion syntax highlighting

Use a ` ```clarion ` (or ` ```Clarion ` / ` ```CLARION `) code fence for full syntax highlighting of Clarion source code. Colours are inspired by Visual Studio Code and adapt automatically to Discourse's light and dark themes.

### Grid renderer

Use a ` ```grid ` fence to render pipe-separated data as a formatted table. The first row becomes the header.

````
```grid
Product|Version|Released|Status
Clarion 11|11.1|2021-03-15|Current
Clarion 10|10.0|2018-06-01|Legacy
```
````

- Leading and trailing `|` on a row are optional and ignored
- Empty cells are fine — just leave nothing between pipes
- On narrow screens the table scrolls horizontally

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

