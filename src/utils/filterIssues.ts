import type { Issue, IssueFilters } from '../types';

export function filterIssues(issues: Issue[], filters: IssueFilters): Issue[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return issues.filter((issue) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      issue.title.toLowerCase().includes(normalizedSearch) ||
      issue.description.toLowerCase().includes(normalizedSearch) ||
      issue.assignee.toLowerCase().includes(normalizedSearch) ||
      issue.id.toLowerCase().includes(normalizedSearch);

    const matchesStatus = filters.status === 'All' || issue.status === filters.status;
    const matchesPriority = filters.priority === 'All' || issue.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}
