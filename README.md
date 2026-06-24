# dot tutor

A React + Vite + TypeScript web app for **dot tutor** — a platform that connects
students with expert tutors and assists with document preparation for study-abroad
applications (personal statements, recommendation letters, and more).

Originally exported from
[Figma](https://www.figma.com/design/n5TUxTDGWunHRhyrmBv3Je/dot-tutor-site-MAIN).

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and bundling
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) primitives + local UI component library (`src/app/components/ui`)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server
```

Then open the URL Vite prints (default http://localhost:5173).

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server                |
| `npm run build`     | Production build to `dist/`              |
| `npm run preview`   | Preview the production build locally     |
| `npm run typecheck` | Type-check the project with `tsc`        |

## Demo credentials

The app ships with in-memory demo accounts (see `src/app/App.tsx`):

| Role    | Email                   | Password     |
| ------- | ----------------------- | ------------ |
| Student | student@dot-tutor.com   | student123   |
| Tutor   | tutor@dot-tutor.com     | tutor123     |
| Admin   | admin@dot-tutor.com     | admin123     |

## Project structure

```
src/
  main.tsx                 App entry point
  app/
    App.tsx                Top-level page router / state
    components/            Feature components (student, tutor, admin, auth, ui)
    config/                App configuration
    imports/               Figma-imported SVG/logo assets
    supabase/functions/    Deno edge functions (deployed separately, not bundled)
    utils/                 Shared helpers
  assets/                  Static image assets
  styles/                  Global Tailwind + theme CSS
```
