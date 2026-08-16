import { useMemo, useState } from 'react';
import './App.css';
import { FilterBar } from './components/FilterBar';
import { IssueCard } from './components/IssueCard';
import { IssueForm } from './components/IssueForm';
import { useIssues } from './hooks/useIssues';
import type { IssueFilters } from './types';
import { filterIssues } from './utils/filterIssues';

const initialFilters: IssueFilters = {
  search: '',
  status: 'All',
  priority: 'All',
};

export default function App() {
  const { issues, addIssue, advanceStatus } = useIssues();
  const [filters, setFilters] = useState<IssueFilters>(initialFilters);

  const visibleIssues = useMemo(() => filterIssues(issues, filters), [issues, filters]);

  const stats = useMemo(
    () => ({
      total: issues.length,
      open: issues.filter((issue) => issue.status === 'Open').length,
      inProgress: issues.filter((issue) => issue.status === 'In Progress').length,
      resolved: issues.filter((issue) => issue.status === 'Resolved').length,
    }),
    [issues],
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Frontend engineering portfolio</p>
          <h1>IssueFlow</h1>
          <p className="subtitle">
            A typed React issue tracker focused on predictable state, reusable components,
            accessible forms, responsive layout, and testable logic.
          </p>
        </div>
        <span className="tech-pill">React + TypeScript</span>
      </header>

      <main>
        <section className="stats-grid" aria-label="Issue summary">
          <div className="stat-card"><span>Total</span><strong>{stats.total}</strong></div>
          <div className="stat-card"><span>Open</span><strong>{stats.open}</strong></div>
          <div className="stat-card"><span>In progress</span><strong>{stats.inProgress}</strong></div>
          <div className="stat-card"><span>Resolved</span><strong>{stats.resolved}</strong></div>
        </section>

        <div className="workspace-grid">
          <section className="issues-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Issue queue</p>
                <h2>Track and triage</h2>
              </div>
              <span className="result-count">{visibleIssues.length} shown</span>
            </div>

            <FilterBar filters={filters} onChange={setFilters} />

            <div className="issue-list" aria-live="polite">
              {visibleIssues.length > 0 ? (
                visibleIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} onAdvanceStatus={advanceStatus} />
                ))
              ) : (
                <div className="empty-state">
                  <h3>No matching issues</h3>
                  <p>Try clearing one of the filters or using a broader search term.</p>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setFilters(initialFilters)}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="form-panel">
            <IssueForm onSubmit={addIssue} />
          </aside>
        </div>
      </main>
    </div>
  );
}
