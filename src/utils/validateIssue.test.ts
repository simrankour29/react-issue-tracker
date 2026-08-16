import { describe, expect, it } from 'vitest';
import type { IssueDraft } from '../types';
import { validateIssue } from './validateIssue';

const validDraft: IssueDraft = {
  title: 'Fix modal focus handling',
  description: 'Keyboard focus should return to the trigger after the modal closes.',
  priority: 'Medium',
  assignee: 'Simran',
};

describe('validateIssue', () => {
  it('accepts a complete issue draft', () => {
    expect(validateIssue(validDraft)).toEqual({});
  });

  it('reports required field problems together', () => {
    const errors = validateIssue({
      ...validDraft,
      title: 'UI',
      description: 'Too short',
      assignee: '',
    });

    expect(errors.title).toBeDefined();
    expect(errors.description).toBeDefined();
    expect(errors.assignee).toBeDefined();
  });
});
