import { useState } from 'react';
import type { IssueDraft, IssuePriority } from '../types';
import { validateIssue, type IssueValidationErrors } from '../utils/validateIssue';

type Props = {
  onSubmit: (draft: IssueDraft) => void;
};

const emptyDraft: IssueDraft = {
  title: '',
  description: '',
  priority: 'Medium',
  assignee: '',
};

const priorities: IssuePriority[] = ['Low', 'Medium', 'High'];

export function IssueForm({ onSubmit }: Props) {
  const [draft, setDraft] = useState<IssueDraft>(emptyDraft);
  const [errors, setErrors] = useState<IssueValidationErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateIssue(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form className="issue-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Create issue</p>
          <h2>Report a frontend problem</h2>
        </div>
      </div>

      <label className="field">
        <span>Title</span>
        <input
          value={draft.title}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          placeholder="e.g. Modal closes after validation error"
        />
        {errors.title && <small id="title-error" className="field-error">{errors.title}</small>}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          rows={4}
          value={draft.description}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'description-error' : undefined}
          onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          placeholder="Describe the expected and actual behavior..."
        />
        {errors.description && (
          <small id="description-error" className="field-error">{errors.description}</small>
        )}
      </label>

      <div className="form-row">
        <label className="field">
          <span>Priority</span>
          <select
            value={draft.priority}
            onChange={(event) =>
              setDraft({ ...draft, priority: event.target.value as IssuePriority })
            }
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Assignee</span>
          <input
            value={draft.assignee}
            aria-invalid={Boolean(errors.assignee)}
            aria-describedby={errors.assignee ? 'assignee-error' : undefined}
            onChange={(event) => setDraft({ ...draft, assignee: event.target.value })}
            placeholder="Engineer name"
          />
          {errors.assignee && (
            <small id="assignee-error" className="field-error">{errors.assignee}</small>
          )}
        </label>
      </div>

      <button className="primary-button" type="submit">Create issue</button>
    </form>
  );
}
