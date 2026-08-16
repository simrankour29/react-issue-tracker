import type { IssueDraft } from '../types';

export type IssueValidationErrors = Partial<Record<keyof IssueDraft, string>>;

export function validateIssue(draft: IssueDraft): IssueValidationErrors {
  const errors: IssueValidationErrors = {};

  if (draft.title.trim().length < 4) {
    errors.title = 'Title must be at least 4 characters.';
  }

  if (draft.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  if (draft.assignee.trim().length < 2) {
    errors.assignee = 'Assignee is required.';
  }

  return errors;
}
