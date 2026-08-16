import { memo } from 'react';
import type { Issue } from '../types';

type Props = {
  issue: Issue;
  onAdvanceStatus: (id: string) => void;
};

export const IssueCard = memo(function IssueCard({ issue, onAdvanceStatus }: Props) {
  return (
    <article className="issue-card">
      <div className="issue-card__topline">
        <span className="issue-id">{issue.id}</span>
        <span className={`badge badge--${issue.priority.toLowerCase()}`}>{issue.priority}</span>
      </div>

      <h3>{issue.title}</h3>
      <p className="issue-description">{issue.description}</p>

      <div className="issue-meta">
        <span><strong>Status:</strong> {issue.status}</span>
        <span><strong>Assignee:</strong> {issue.assignee}</span>
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={() => onAdvanceStatus(issue.id)}
        aria-label={`Advance status for ${issue.id}`}
      >
        Advance status
      </button>
    </article>
  );
});
