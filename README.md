# Abhijit Singh — research site

Source of <https://mag-and-krotons.github.io>: papers, notes and an interactive model of the medial antiprism.

The site is static: plain HTML, CSS and JavaScript served by GitHub Pages, with no build step and no server.

## Contents

| Path | What it holds |
| :--- | :--- |
| `index.html` | The page: structure, papers, dispatches, code, about |
| `css/style.css` | The one stylesheet (light and dark) |
| `js/app.js` | Navigation, tabs, the paper list, citations, the results table, the code list |
| `js/structure.js` | The structure playground (Three.js). Every number it shows is computed from the construction |
| `js/cosmos.js` | The Game of Cosmos: the world of clocks (from *Nothing Binds a Twin*) and triad spins on a strand (from *The Medial Antiprism*), with every count checked as it runs |
| `js/blog.js` | The dispatches, compiled by `publish_dispatch.py` |
| `papers.json` | The paper list: titles, abstracts, PDFs, DOIs, BibTeX |
| `papers/<id>/<id>.pdf` | The PDFs, with the LaTeX sources and figures of the September series |
| `data/theoretical_matrix.json` | The key-results table of the September series |
| `dispatches/` | Markdown sources of the dispatches and the authoring guide |

External libraries load from jsDelivr: Three.js 0.160.0 and KaTeX 0.16.8.

## Adding a paper

1. Put the PDF at `papers/<id>/<id>.pdf`.
2. Add an entry to `papers.json` with the same `id`. Put new papers first: the list keeps the file's order, grouped by `series`.
3. When the paper gets a DOI, fill in `doi` and the BibTeX.

## Publishing a dispatch

```bash
python3 publish_dispatch.py --new
python3 publish_dispatch.py dispatches/my_note.md
```

See `dispatches/README.md` for the fields. `--push` also commits and pushes.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening the file directly does not work, because the page fetches `papers.json`.

## Licence

Papers: CC BY 4.0. Research record: [10.5281/zenodo.22129334](https://doi.org/10.5281/zenodo.22129334).
