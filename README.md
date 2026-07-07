# Choice...Repeat PWA

**Real food. Better choices. One day at a time.**

Choice...Repeat is an early PWA prototype for a practical healthy-eating and weight-loss support app.

Core line:

> Every day, make one better choice. Track it. Repeat it. Keep going.

## Current MVP features

- Mobile-first landing page
- Better Choice Coach using simple local rules
- Daily check-in form
- Weight / waist / water / walk tracking
- Repeatable wins:
  - Protein
  - Fiber
  - No unplanned late-night snack
  - One better choice
- Recent check-in table
- Test data stored locally in the browser with `localStorage`
- Installable PWA manifest
- Offline app shell via service worker
- GitHub Pages-ready static files

## How to test locally

Because service workers require a local server, do not just double-click `index.html`.

Use one of these:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Or use VS Code Live Server.

## How to host on GitHub Pages

1. Create a new GitHub repo, for example:

```text
choicerepeat
```

2. Upload these files to the root of the repo.

3. Go to:

```text
Settings → Pages
```

4. Under **Build and deployment**, choose:

```text
Deploy from a branch
```

5. Select:

```text
main / root
```

6. Save.

Your PWA will be available at a URL like:

```text
https://YOUR-USERNAME.github.io/choicerepeat/
```

## Roadmap ideas

### Version 0.2
- Add editable/deletable check-ins
- Add chart for weight and waist
- Add streaks
- Add restaurant mode
- Add saved favorite swaps
- Add onboarding questions

### Version 0.3
- Add Supabase authentication
- Store user data in a database
- Add private user profiles
- Add AI coach through a backend function

### Version 0.4
- Add barcode/photo food helper
- Add export to CSV
- Add reminders
- Add Apple Health / Google Fit planning

### Native apps later
After the PWA works well, wrap it with Capacitor for iOS and Android.

## Important health disclaimer

This app is for general education, food-choice support, and habit tracking. It does not diagnose, treat, or replace medical advice. Users should talk with a qualified medical professional before making major diet, exercise, medication, or weight-loss changes.
