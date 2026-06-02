# Project structure

```
src/
├── assets/              # Static assets (images, fonts, svg)
├── components/
│   ├── common/          # Reusable atomic UI (Button, Card, Input...)
│   └── layout/          # Page frame (Header, Footer, MainLayout)
├── pages/               # Route-level views (one folder per page)
├── routes/              # Router configuration
├── hooks/               # Custom React hooks
├── context/             # React Context providers
├── services/            # API clients, external integrations
├── utils/               # Pure helpers (formatters, validators)
├── styles/              # Global CSS
├── App.jsx              # Root component (mounts the router)
└── main.jsx             # Entry point
```

## Conventions
- **One component per folder** with `Component.jsx`, `Component.module.css`,
  and `index.js` re-exporting the default. Allows `import X from '.../X'`.
- **CSS Modules** for component-scoped styles.
- **Pages** only orchestrate — keep logic in hooks/services and visuals in components.
- **Routing** uses `HashRouter` so deep links work on GitHub Pages without extra config.

## Adding a new page
1. Create `src/pages/MyPage/MyPage.jsx` + `MyPage.module.css` + `index.js`.
2. Register it in [routes/router.jsx](./routes/router.jsx).

## Adding a new component
1. Create `src/components/common/MyThing/MyThing.jsx` + `.module.css` + `index.js`.
2. Import via `import MyThing from '@/components/common/MyThing'` (relative paths also fine).
