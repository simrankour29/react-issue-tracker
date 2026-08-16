# Engineering Notes

This portfolio project is intentionally small, but it is structured around frontend problems that commonly appear in production applications.

## 1. Avoiding stale derived state

Filtered issues are not stored as a second source of truth. The UI keeps only the issue collection and filter inputs in state, then derives the visible list with `useMemo`.

**Why:** storing both `issues` and `filteredIssues` in state can create synchronization bugs after add/update operations or when filters are cleared.

## 2. Stable list rendering

Issue cards use the domain issue ID as the React key rather than an array index.

**Why:** index keys can produce incorrect component reuse when items are inserted, removed, or reordered.

## 3. Predictable state updates

The custom `useIssues` hook uses functional state updates for both issue creation and status transitions.

**Why:** functional updates avoid depending on a potentially stale render snapshot when the next state depends on the previous state.

## 4. Controlled forms and validation

The issue form uses typed controlled inputs and a pure `validateIssue` function. Validation logic is kept outside the component so it can be tested independently.

**Why:** separating validation from rendering reduces component complexity and makes regression testing easier.

## 5. Responsive layout bug prevention

The workspace uses `minmax(0, ...)`, `min-width: 0`, and mobile breakpoints to prevent cards and form controls from forcing the grid wider than the viewport.

**Why:** grid/flex children can otherwise overflow at tablet widths even when the parent appears responsive.

## 6. Performance-conscious rendering

- Filtering and dashboard statistics are memoized as derived calculations.
- `IssueCard` is memoized because its props are stable for unaffected issues.
- Status mutation is scoped to the matching issue instead of rebuilding unrelated domain objects.

The project favors clear code first; memoization is applied only where the dependency model remains easy to reason about.

## 7. Accessibility considerations

- Every form control has a visible label.
- Validation states use `aria-invalid` and `aria-describedby`.
- The issue list uses `aria-live` for filtered-result changes.
- Buttons include explicit text or accessible labels.
- Focus-visible styles are preserved for keyboard navigation.
