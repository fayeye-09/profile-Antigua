# Maria Faith D. Antigua — personal profile

Plain HTML, CSS, and vanilla JavaScript. Open `index.html` in a browser; no installation or build step is needed.

## Edit the content and portfolio

- `index.html` holds your name, biography, interests, contact links, and the artwork list.
- `assets/profile/faith.jpg` is the browser-compatible copy of your supplied HEIC portrait. The original is unchanged.
- `assets/portfolio/1.png` through `31.png` are exact copies of the supplied exports. Their source files are unchanged. Similar exports are intentionally retained.
- Find `EDIT SLIDES HERE` in `index.html`. Each `<li class="artwork">` is one slide. This readable HTML list is the single source of paths, titles, descriptions, and alt text.
- To replace an artwork, copy the new file into `assets/portfolio/`, update both the link's `href` and image's `src`, provide its actual width/height and descriptive alt text, then update `h3`, the caption paragraph, and the link's accessible label.
- Duplicate a complete artwork list item to add a slide, or remove one to remove a slide. Keep at least three artworks for neighboring previews. JavaScript automatically updates thumbnails and the counter.
- The supplied exports did not include project briefs. Captions describe visible designs; they do not claim results, clients, or individual contributions. School project materials remain a separate, clearly marked placeholder.

## How the slideshow works

`script.js` loads with `defer` and reads the HTML list. It adds classes for the current and neighboring slides and creates thumbnail buttons. Previous/Next, Left/Right arrows, Home/End, thumbnails, and horizontal touch swipes change the active artwork. It never autoplays. Vertical scrolling remains available.

Select the active artwork to open a native `dialog`. It contains a labeled close button, supports Escape, keeps focus inside while open, and restores focus to the opening link when closed. Older browsers without dialog support can still follow the original image link. Without JavaScript, all 31 artworks remain visible in a gallery. No essential content depends on JavaScript.

CSS `object-fit: contain` displays the whole artwork, including mixed image sizes. Desktop has subtle neighboring previews; mobile hides them. The brief fade is disabled for reduced-motion preferences. The small hero loading motif is static and decorative.

## HTML and the CSS box model

The document includes the HTML5 doctype, language, encoding, viewport, title, external stylesheet, and deferred script. `header` contains navigation and the sole `h1`; `main` contains labeled About, Skills/Interests, Portfolio, and School Projects sections; `footer` contains working contact links. Section headings use `h2`, and artwork titles use `h3`. Lists use real `ul`/`li` elements.

`styles.css` holds all styling. Palette variables are in `:root`. Margins separate panels; padding creates space inside them; borders define their edges. `box-sizing: border-box` includes borders and padding within declared widths. Grid and flex layouts keep essential content in normal flow; media queries stack the layout below 760px. Absolute positioning is reserved for decorations and the accessible skip link.

The separate retro reference image and teacher's example were not available with these 31 exports. The page follows the supplied written design and assignment requirements.

## Version control and GitHub Pages

The folder had no Git history. It is initialized on `main`. Intended public repository: `https://github.com/fayeye-09/profile-Antigua`.

For future updates, in this folder:

```sh
git status
git add index.html styles.css script.js README.md assets
git commit -m "Update personal profile and portfolio"
git push origin main
```

In the repository's Settings → Pages, use **Deploy from a branch**, **main**, and **/(root)**. Relative asset paths work under the repository subfolder. The expected site address is `https://fayeye-09.github.io/profile-Antigua/`; confirm deployment in GitHub Actions and open that URL before submitting it.

If publishing must be completed manually:

```sh
gh repo create fayeye-09/profile-Antigua --public --source=. --remote=origin --push
```

Run that only if the remote repository does not already exist. Do not reset existing history or force-push. Official publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
