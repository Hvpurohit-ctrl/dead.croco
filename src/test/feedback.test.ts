import { describe, it, expect } from 'vitest';
import { INITIAL_ANONYMOUS_FEEDBACK } from '../lib/mockData';
import { AnonymousFeedback } from '../lib/types';

describe('100% Anonymous Feedback System (Identity Decoupling)', () => {
  it('should strictly guarantee zero worker identity metadata in all feedback entries', () => {
    INITIAL_ANONYMOUS_FEEDBACK.forEach((fb: any) => {
      // Identity fields MUST NOT exist
      expect(fb.userId).toBeUndefined();
      expect(fb.userName).toBeUndefined();
      expect(fb.userEmail).toBeUndefined();
      expect(fb.phone).toBeUndefined();
      expect(fb.ipAddress).toBeUndefined();
      expect(fb.employeeId).toBeUndefined();

      // Only anonymous category, department, message, sentiment, and timestamp are permitted
      expect(fb.id).toBeDefined();
      expect(fb.department).toBeDefined();
      expect(fb.message).toBeDefined();
      expect(['positive', 'neutral', 'urgent']).toContain(fb.sentiment);
      expect(['management', 'workload', 'facilities', 'fairness', 'safety']).toContain(fb.category);
    });
  });

  it('should accept feedback across both construction and college campus facilities', () => {
    const constructionFeedback = INITIAL_ANONYMOUS_FEEDBACK.filter(f => f.industry === 'construction');
    const collegeFeedback = INITIAL_ANONYMOUS_FEEDBACK.filter(f => f.industry === 'college');

    expect(constructionFeedback.length).toBeGreaterThan(0);
    expect(collegeFeedback.length).toBeGreaterThan(0);
  });
});
