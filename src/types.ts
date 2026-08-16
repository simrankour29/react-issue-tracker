export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export type IssuePriority = 'Low' | 'Medium' | 'High';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  createdAt: string;
}

export interface IssueDraft {
  title: string;
  description: string;
  priority: IssuePriority;
  assignee: string;
}

export interface IssueFilters {
  search: string;
  status: 'All' | IssueStatus;
  priority: 'All' | IssuePriority;
}
