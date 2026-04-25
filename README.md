## Readme

React + TypeScript coding exercise built with Vite, MUI, and Biome.

Live sandbox: https://codesandbox.io/p/sandbox/dsv-forked-yjzv29

> Note: I did not manage to get this working with MUI v9, so the sandbox uses MUI v7.

## Stack

- React 19 + TypeScript
- Vite (dev/build)
- MUI + Emotion (UI)
- Vitest (tests for reducers)
- Biome (lint/format)

## Scripts

```bash
bun install      # install dependencies
bun run dev      # start dev server
bun run build    # production build
bun run preview  # preview build
bun test         # run reducer tests
bun run lint     # biome lint
bun run format   # biome format
bun run check    # biome check (write)
```

## Structure

- `src/components/` — UI components (Card, CounterPanel, SearchField, …)
- `src/reducers/` — state reducers and their tests
- `src/App.tsx` — app entry component
- `src/theme.ts` — MUI theme
