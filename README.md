# Hamsa Rostom — Portfolio

A responsive, single-page portfolio built with vanilla HTML, CSS, and JavaScript. No framework or build step is required.

## Files

- `index.html` — semantic page structure and portfolio content.
- `style.css` — responsive styling, dark/light themes, animations, and layout.
- `script.js` — smooth navigation, mobile menu, theme persistence, scroll reveal, sliders, and mouse interaction.

## Run in Antigravity IDE

1. Open the project folder in Antigravity IDE.
2. Open `index.html`.
3. Use the IDE's preview / live server option if available.
4. Alternatively, open `index.html` directly in a browser.

No `npm install` or build command is required.

## Adding the CV

The CV button is intentionally disabled until the file is available.

When you have the CV:
1. Put the file inside the project, for example:
   `assets/Hamsa-Rostom-CV.pdf`
2. In `index.html`, find the CV button:
   `<a class="btn btn-outline disabled-link" href="#" ...>`
3. Replace it with:
   `<a class="btn btn-outline" href="assets/Hamsa-Rostom-CV.pdf" target="_blank" rel="noopener">CV <span>↓</span></a>`

## Replacing project placeholders

The Projects section currently contains three placeholders.

For each project, replace the placeholder `<article>` with an image, for example:

`<article class="project-card reveal">
  <img src="assets/project-01.jpg" alt="CTRL+Z brand identity project">
</article>`

Recommended image location:
`assets/project-01.jpg`
`assets/project-02.jpg`
`assets/project-03.jpg`

Keep descriptive `alt` text for accessibility.

If you want the project cards to have custom titles, descriptions, or clickable case-study pages, add those inside each project card.

## Theme

The theme toggle switches between the requested palettes:

Dark:
- #A64D79
- #6A1E55
- #3B1C32
- #1A1A1D

Light:
- #F5EFFF
- #E5D9F2
- #CDC1FF
- #A294F9

The user's theme choice is saved in `localStorage`.

## Notes

- Testimonials are sample placeholders and should be replaced with real client feedback before publishing.
- The contact links already point to the supplied WhatsApp number, email, and LinkedIn profile.
- The layout is designed to work across desktop, tablet, and mobile screen sizes.
