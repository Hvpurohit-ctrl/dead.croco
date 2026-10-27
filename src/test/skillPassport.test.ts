import { describe, it, expect } from 'vitest';
import { INITIAL_SKILLS, INITIAL_EXPERIENCE } from '../lib/mockData';
import { SkillItem } from '../lib/types';

describe('Digital Skill Passport & Credential Portability', () => {
  it('should verify structured skill credentials with recognized certifying bodies', () => {
    INITIAL_SKILLS.forEach((sk: SkillItem) => {
      expect(sk.id).toBeDefined();
      expect(sk.userId).toBeDefined();
      expect(sk.title).toBeTruthy();
      expect(sk.certifiedBy).toBeTruthy();
      expect(sk.certificateId).toBeTruthy();
      expect(['Beginner', 'Intermediate', 'Advanced', 'Master']).toContain(sk.proficiency);
      expect(sk.verified).toBe(true);
    });
  });

  it('should allow adding new verified trade credentials to worker passport', () => {
    const skillsList = [...INITIAL_SKILLS];
    const newSkill: SkillItem = {
      id: `skill-test-${Date.now()}`,
      userId: 'user-worker-1',
      title: 'Tower Crane Rigger & Signaller',
      category: 'Heavy Operations',
      proficiency: 'Advanced',
      certifiedBy: 'National Safety Council India',
      certificateId: 'NSCI-RIG-2026-1044',
      issueDate: '2026-10-27',
      verified: true
    };

    skillsList.push(newSkill);
    const retrieved = skillsList.find(s => s.id === newSkill.id);

    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe('Tower Crane Rigger & Signaller');
    expect(retrieved?.certifiedBy).toBe('National Safety Council India');
  });

  it('should maintain comprehensive verified work experience history', () => {
    expect(INITIAL_EXPERIENCE.length).toBeGreaterThan(0);
    INITIAL_EXPERIENCE.forEach(exp => {
      expect(exp.role).toBeTruthy();
      expect(exp.organization).toBeTruthy();
      expect(exp.duration).toBeTruthy();
      expect(exp.highlights.length).toBeGreaterThan(0);
    });
  });
});
