import type { Issue } from '../types';

export const initialIssues: Issue[] = [
  {
    id: 'ISS-1042',
    title: 'Dashboard cards overflow on tablet',
    description: 'Summary cards exceed the viewport width between 768px and 900px.',
    status: 'Open',
    priority: 'High',
    assignee: 'Maya',
    createdAt: '2026-08-12T09:30:00.000Z',
  },
  {
    id: 'ISS-1041',
    title: 'Search results do not update after clearing input',
    description: 'The filtered list remains stale after the search query is cleared.',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Arjun',
    createdAt: '2026-08-11T13:10:00.000Z',
  },
  {
    id: 'ISS-1038',
    title: 'Improve empty-state messaging',
    description: 'Users need a clearer message when filters return no matching issues.',
    status: 'Resolved',
    priority: 'Low',
    assignee: 'Nina',
    createdAt: '2026-08-09T16:45:00.000Z',
  },
  {
    id: 'ISS-1034',
    title: 'Priority badge lacks accessible contrast',
    description: 'The low-priority badge needs stronger visual contrast and semantic text.',
    status: 'Open',
    priority: 'Medium',
    assignee: 'Kabir',
    createdAt: '2026-08-08T08:20:00.000Z',
  },
];
