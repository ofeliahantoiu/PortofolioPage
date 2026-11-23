# Ofelia Hănțoiu — Portfolio

A static HTML, CSS and JavaScript portfolio, designed for GitHub Pages. The original pastel colors, rounded cards, floating circles, animations, and light/dark themes are retained.

## Run locally

Start a web server from this folder (needed for JSON translations):

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. You can also deploy this folder through GitHub Pages with `index.html` at the published root.

## Main pages

- `index.html`: introduction, About, ASML experience, skills, university project previews, and practice project highlights.
- `html/university-projects.html`: anchored university project case studies with filters and expandable technical highlights.
- `html/projects.html`: coding exercises and smaller web projects.

## Content notes

- The ASML overview is based on the public-facing CV provided with the original site. No internal code, configurations, metrics, or screenshots were added.
- The university case studies only elaborate on the technologies and outcomes already named in the original site. Add your own screenshots, repository links, demos, results and specific personal contributions as soon as you can verify/share them.
- `assets/CV.pdf` is **unchanged**. It currently mentions looking for work alongside studies; update that statement separately if your current priority is an HBO-ICT internship.
- Some project demo links are external; check that they still work before publishing. This patch does not create new GitHub repositories or demo apps.

## Patch summary

- Repaired university detail anchors and back-home paths.
- Fixed page-specific JavaScript errors, mobile-menu behavior, accessibility labels and dark-mode consistency.
- Replaced misleading “Coming Soon” project tiles with existing projects.
- Linked the home “See More” button to the local practice projects page.
- Added a grounded professional experience card and sharper introductory copy (English, Dutch, Romanian).
- Improved existing university project descriptions without inventing measurements or contributions.
