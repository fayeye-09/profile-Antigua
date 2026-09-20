# Maria Faith D. Antigua — personal profile

Plain HTML, CSS, and vanilla JavaScript. Open `index.html` in a browser; no installation or build step is needed.

## Edit the content and portfolio

- `index.html` holds your name, biography, interests, contact links, and the artwork list.
- `assets/profile/faith.jpg` is the browser-compatible copy of your supplied HEIC portrait. The original is unchanged.
- `assets/portfolio/1.png` through `31.png` are exact copies of the supplied exports. Their source files are unchanged. Similar exports are intentionally retained.
- Find `EDIT SLIDES HERE` in `index.html`. Each `<li class="artwork">` is one slide. This readable HTML list is the single source of paths, titles, descriptions, and alt text.
- To replace an artwork, copy the new file into `assets/portfolio/`, update both the link's `href` and image's `src`, provide its actual width/height and descriptive alt text, then update `h3`, the caption paragraph, and the link's accessible label.
- Duplicate a complete artwork list item to add a slide, or remove one to remove a slide. Keep at least one artwork. JavaScript automatically updates the counter and loops through the list.
- The supplied exports did not include project briefs. Captions describe visible designs; they do not claim results, clients, or individual contributions. School project materials remain a separate, clearly marked placeholder.

## How the timed presentation works

`script.js` reads the artwork list in `index.html`, shows one artwork, and advances every 3000 milliseconds, looping after image 31. CSS crossfades the overlapping grid items over 450 milliseconds with no horizontal movement. Reduced-motion preferences disable the fade. The Pause/Resume button allows visitors to read at their own pace. Playback also pauses while the page is hidden, the viewer is open, or an artwork link has keyboard focus.

Select an artwork to open the native enlarged dialog. Close or Escape dismisses it, Tab stays inside, and focus returns to the original link. Without JavaScript all images remain accessible as a gallery. `object-fit: contain` preserves complete artwork and its proportions.

The content panels and portfolio frames have square corners. The portrait backdrop remains circular. Featured School Projects now includes Intern Connect at https://intern-connect-pi.vercel.app/; replace the clearly marked description/role placeholders when accurate details are supplied.

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

The original commit `08fcdcd` was already published and has been preserved. The update uses the exact commit message `profile-Antigua`; no published history is rewritten.

## Full-window layout

Desktop windows (1000px and wider) use a stationary profile/contact sidebar and a separately scrolling main column. CSS Grid fills the viewport with no outer side margins. The sidebar can scroll independently on short windows so no contact information is cut off. Below 1000px, the page returns to normal document scrolling, with profile and contacts above the content. The skip link focuses the keyboard-scrollable main region.

The sidebar now has a small outer inset and a subtle shadow. Navigation sits at the top of the right content column. Contact links use dark pill buttons. The compact timed presentation includes decorative neighboring previews on larger screens, with a single image on mobile.
