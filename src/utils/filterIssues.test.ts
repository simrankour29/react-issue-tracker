import { describe, expect, it } from 'vitest';
import { initialIssues } from '../data/issues';
import type { IssueFilters } from '../types';
import { filterIssues } from './filterIssues';

const allFilters: IssueFilters = {
  search: '',
  status: 'All',
  priority: 'All',
};

describe('filterIssues', () => {
  it('returns all issues when no filters are active', () => {
    expect(filterIssues(initialIssues, allFilters)).toHaveLength(initialIssues.length);
  });

  it('matches search text across title and assignee without case sensitivity', () => {
    expect(filterIssues(initialIssues, { ...allFilters, search: 'MAYA' })).toHaveLength(1);
    expect(filterIssues(initialIssues, { ...allFilters, search: 'search results' })).toHaveLength(1);
  });

  it('combines status and priority filters', () => {
    const result = filterIssues(initialIssues, {
      ...allFilters,
      status: 'Open',
      priority: 'High',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('ISS-1042');
  });

  it('does not mutate the source array', () => {
    const snapshot = [...initialIssues];
    filterIssues(initialIssues, { ...allFilters, search: 'dashboard' });
    expect(initialIssues).toEqual(snapshot);
  });
});
