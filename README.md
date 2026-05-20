# Chin Fu Jie Portfolio Site

This is a GitHub Pages-ready portfolio built with plain HTML, CSS, and JavaScript. It has a Flutter-inspired app aesthetic, but it does not require the Flutter SDK or any build step.

The site now includes real project media:

- Clear cover images for every project card.
- Captioned follow-up images in each project detail modal.
- Embedded PDF previews for reports, posters, and slide documents.
- Web video previews for Verbasense and LiftOff 3D Project.

## Edit Your Content

- Update your email, GitHub, and LinkedIn in `index.html`.
- Update project titles, summaries, tags, captions, document links, and details in `app.js`.
- Replace `assets/profile.svg` and `assets/og-preview.svg` with your own images when ready.

## Large Files

`Kokoni/Moxin.pdf` was not copied into the website bundle because it is about 125 MB, which is above GitHub's normal 100 MB per-file limit. The site includes image previews for slides 21, 25, and 26 plus a local full-document link. For GitHub Pages, compress the PDF or host it externally, then update the Kokoni document entry in `app.js`.

The original Verbasense video was compressed into `assets/projects/verbasense/demo-compressed.mp4` for web hosting.

## Publish On GitHub Pages

1. Create a GitHub repository, for example `yourusername.github.io` or `portfolio`.
2. Upload the files from this folder.
3. In GitHub, go to `Settings > Pages`.
4. Set the source to the `main` branch and the root folder.
5. Your site will be available at `https://yourusername.github.io/` or `https://yourusername.github.io/portfolio/`.

## Local Preview

You can open `index.html` directly in a browser. No server is required.
