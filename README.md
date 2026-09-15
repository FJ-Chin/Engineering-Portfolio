# Chin Fu Jie Portfolio Site

This is a GitHub Pages-ready portfolio built with plain HTML, CSS, and JavaScript. It does not require the Flutter SDK, a package install, or a build step.

The site now includes real project media:

- Clear cover images for every project card.
- Captioned follow-up images in each project detail modal.
- Image previews with links to complete reports and presentations.
- Inline prototype videos and CellWave alignment comparisons.
- An interactive portrait and automatic project showcases with pause, keyboard, and mobile swipe controls.
- Shareable project pages at `project.html?project=cellwave` (and the other project IDs).

## Edit Your Content

- Update your email, GitHub, and LinkedIn in `index.html`.
- Update project descriptions, experience, recognition, skills, and media references in `portfolio-data.js`.
- Layout is in `index.html` and `styles.css`; interactions and case-study rendering are in `app.js`.
- The portrait uses `assets/profile/profile-hero.jpg`. The public resume is `assets/documents/chin-fu-jie-resume.pdf`.

## Large Files

The full 31-page Moxin presentation is included as a compressed PDF at `assets/documents/kokoni/moxin-presentation.pdf` (about 7 MB). Slides 21, 25, and 26 also have image previews. The original source PDF outside this site is unchanged.

The original Verbasense video was compressed into `assets/projects/verbasense/demo-compressed.mp4` for web hosting.

## Publish On GitHub Pages

1. Create a GitHub repository, for example `yourusername.github.io` or `portfolio`.
2. Upload the files from this folder.
3. In GitHub, go to `Settings > Pages`.
4. Set the source to the `main` branch and the root folder.
5. Your site will be available at `https://yourusername.github.io/` or `https://yourusername.github.io/portfolio/`.

## Local Preview

You can open `index.html` directly in a browser. No server is required.

In Chrome or Edge, open Inspect, then press Ctrl+Shift+M to enable device emulation. Check widths of 360, 390, 430, and 820 pixels as well as a full desktop viewport. Verify section navigation, carousel controls, project dialogs, image previews, and video playback. Finish with a real-phone check before publishing.

Selected Work uses a full-width Focus glide: projects move left to right, enlarging and slowing near the center. The image height adapts to shorter laptop viewports so the heading, posts, and controls fit together. The opening cue sits beside the category, away from project photos. Clicking a post expands its summary and gallery in place. Click away, use the close control, or press Escape to collapse it and resume its previous motion state. The full case study and image lightbox remain available from the expanded view.

Experience uses a gently floating two-card deck with small opposing tilts and smooth focus changes. Phones keep horizontal swipe navigation with a restrained vertical drift. Pausing rotation also pauses the decorative movement.

Automatic motion continues through pointer hover. The showcases pause when offscreen, the page is hidden, a project is open, or the user is pressing/dragging a card. Keyboard interaction still pauses motion for reading; the play control explicitly resumes it. Reduced-motion preferences disable autoplay and decorative movement. The portrait's animated icons have a light silhouette outline without a rectangular background.

## Brand Asset

The LinkedIn contact mark uses the [LinkedIn brand SVG from Bootstrap Icons](https://icons.getbootstrap.com/icons/linkedin/), version 1.13.1, in LinkedIn blue. Its MIT license is included in `assets/vendor/bootstrap-icons-LICENSE.txt`. LinkedIn and its logo are trademarks of LinkedIn Corporation; the mark links only to the portfolio owner's LinkedIn profile.
