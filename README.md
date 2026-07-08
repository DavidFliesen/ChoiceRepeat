# Choice...Repeat PWA v9

This update brings the app closer to the approved polished mockup style.

## v9 changes

- Reworked Today screen to match the clean warm earth-tone layout
- Added circular stylized Inspiration Moment portrait assets
- Added horizontal Inspiration Moments carousel
- Added a collapsible/read-more style Inspiration detail card
- Added the daily focus food-bowl illustration
- Added stronger polished visual hierarchy and less clutter
- Kept the app as a static PWA for GitHub Pages
- Service worker cache bumped to `choicerepeat-v9`

## Run locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment note

After uploading to GitHub Pages, clear site data or hard refresh if an older service worker keeps showing an earlier version.
