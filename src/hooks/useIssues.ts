import { useCallback, useState } from 'react';
import { initialIssues } from '../data/issues';
import type { Issue, IssueDraft, IssueStatus } from '../types';

const statusOrder: IssueStatus[] = ['Open', 'In Progress', 'Resolved'];

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const addIssue = useCallback((draft: IssueDraft) => {
    setIssues((currentIssues) => {
      const nextNumber = 1043 + currentIssues.length;
      const newIssue: Issue = {
        id: `ISS-${nextNumber}`,
        title: draft.title.trim(),
        description: draft.description.trim(),
        priority: draft.priority,
        assignee: draft.assignee.trim(),
        status: 'Open',
        createdAt: new Date().toISOString(),
      };

      return [newIssue, ...currentIssues];
    });
  }, []);

  const advanceStatus = useCallback((id: string) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => {
        if (issue.id !== id) return issue;

        const currentIndex = statusOrder.indexOf(issue.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...issue, status: nextStatus };
      }),
    );
  }, []);

  return { issues, addIssue, advanceStatus };
}
