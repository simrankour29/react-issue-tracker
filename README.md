# React Issue Tracker

A portfolio project built with **React + TypeScript** to demonstrate practical frontend engineering: reusable components, predictable state management, typed forms, filtering, validation, responsive layout, accessibility, debugging patterns, and regression testing.

## What it solves

The app provides a lightweight issue-tracking workflow where users can:

- view and triage frontend issues
- search by title, description, issue ID, or assignee
- filter by status and priority
- create new issues through a controlled, validated form
- advance an issue through `Open -> In Progress -> Resolved`
- inspect live summary counts for the current issue collection
- recover quickly from an empty filtered state

## Frontend engineering focus

### React component design

The UI is split into focused components rather than one large page component:

- `FilterBar` owns typed filter controls
- `IssueForm` handles controlled inputs and validation feedback
- `IssueCard` renders reusable issue rows and is memoized for stable unaffected items
- `useIssues` contains domain state transitions separately from presentation

### TypeScript

Domain objects, form drafts, statuses, priorities, and filter values are explicitly typed. This prevents invalid UI states from spreading through the component tree and makes refactoring safer.

### State and rendering

The app keeps a single source of truth for issues. Filtered results and dashboard statistics are derived with `useMemo` instead of being duplicated into additional state.

This avoids a common frontend bug where derived state becomes stale after an item update or after filters are cleared.

### UI debugging and refactoring decisions

The project documents practical reasoning around:

- stale derived state
- stable React list keys
- functional state updates
- controlled form validation
- responsive grid overflow
- memoization and render behavior
- keyboard and form accessibility

See [`docs/engineering-notes.md`](docs/engineering-notes.md) for the detailed notes.

### Testing

Pure filtering and validation logic is covered with **Vitest** regression tests. The tests verify combined filters, case-insensitive search, immutability, valid form input, and multiple validation failures.

## Tech stack

- React
- TypeScript
- Vite
- Vitest
- CSS Grid / Flexbox
- GitHub Actions

## Project structure

```text
src/
├── components/
│   ├── FilterBar.tsx
│   ├── IssueCard.tsx
│   └── IssueForm.tsx
├── data/
│   └── issues.ts
├── hooks/
│   └── useIssues.ts
├── utils/
│   ├── filterIssues.ts
│   ├── filterIssues.test.ts
│   ├── validateIssue.ts
│   └── validateIssue.test.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── types.ts
```

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Run tests

```bash
npm test
```

## Production build

```bash
npm run build
```

The GitHub Actions workflow also runs the test suite and production build on pushes and pull requests to `main`.

## Why this project exists

This repository is intentionally focused on the kinds of tasks that appear in frontend engineering work: understanding unfamiliar UI state, reproducing bugs, making small feature changes, improving component boundaries, keeping behavior testable, and documenting the reasoning behind a fix.
