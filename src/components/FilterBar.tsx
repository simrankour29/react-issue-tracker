import type { IssueFilters, IssuePriority, IssueStatus } from '../types';

type Props = {
  filters: IssueFilters;
  onChange: (filters: IssueFilters) => void;
};

const statuses: Array<'All' | IssueStatus> = ['All', 'Open', 'In Progress', 'Resolved'];
const priorities: Array<'All' | IssuePriority> = ['All', 'Low', 'Medium', 'High'];

export function FilterBar({ filters, onChange }: Props) {
  return (
    <section className="filter-bar" aria-label="Issue filters">
      <label className="field field--grow">
        <span>Search</span>
        <input
          type="search"
          value={filters.search}
          placeholder="Search title, ID, assignee..."
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </label>

      <label className="field">
        <span>Status</span>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({ ...filters, status: event.target.value as IssueFilters['status'] })
          }
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Priority</span>
        <select
          value={filters.priority}
          onChange={(event) =>
            onChange({ ...filters, priority: event.target.value as IssueFilters['priority'] })
          }
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
