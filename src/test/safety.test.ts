import { describe, it, expect } from 'vitest';
import { INITIAL_COMPLAINTS } from '../lib/mockData';
import { SafetyComplaint, HazardStatus } from '../lib/types';

describe('Workplace Safety Reporting & Hazard Triage', () => {
  it('should generate valid complaint tracking codes matching CR-SAFE-XXXX format', () => {
    const generateCode = () => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      return `CR-SAFE-${randomCode}`;
    };

    for (let i = 0; i < 20; i++) {
      const code = generateCode();
      expect(code).toMatch(/^CR-SAFE-\d{4}$/);
    }
  });

  it('should include all required hazard properties on submitted complaints', () => {
    INITIAL_COMPLAINTS.forEach((c: SafetyComplaint) => {
      expect(c.id).toBeDefined();
      expect(c.complaintCode).toMatch(/^CR-SAFE-\d{4}$/);
      expect(c.title).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(c.location).toBeTruthy();
      expect(['low', 'medium', 'high', 'critical']).toContain(c.severity);
      expect(['submitted', 'under_review', 'in_progress', 'resolved']).toContain(c.status);
      expect(c.createdAt).toBeDefined();
    });
  });

  it('should allow progressive hazard status transitions with supervisor notes', () => {
    const complaint: SafetyComplaint = {
      id: 'test-comp-1',
      complaintCode: 'CR-SAFE-9999',
      reportedByUserId: 'user-worker-1',
      reportedByName: 'Ramesh Kumar',
      isAnonymous: false,
      industry: 'construction',
      title: 'Loose scaffolding clamp on Level 3',
      description: 'Clamp bolt stripped near viaduct joint.',
      category: 'fall_risk',
      severity: 'high',
      location: 'Metro Pier 18',
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Transition 1: Under Review
    const updateStatus = (item: SafetyComplaint, newStatus: HazardStatus, notes?: string): SafetyComplaint => {
      return {
        ...item,
        status: newStatus,
        adminResolutionNotes: notes || item.adminResolutionNotes,
        updatedAt: new Date().toISOString(),
        resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : item.resolvedAt
      };
    };

    const reviewState = updateStatus(complaint, 'under_review', 'Safety engineer notified.');
    expect(reviewState.status).toBe('under_review');
    expect(reviewState.adminResolutionNotes).toBe('Safety engineer notified.');
    expect(reviewState.resolvedAt).toBeUndefined();

    // Transition 2: In Progress
    const inProgressState = updateStatus(reviewState, 'in_progress', 'Replacement clamps dispatched from depot.');
    expect(inProgressState.status).toBe('in_progress');

    // Transition 3: Resolved
    const resolvedState = updateStatus(inProgressState, 'resolved', 'Clamps replaced and torque tested to 65 Nm.');
    expect(resolvedState.status).toBe('resolved');
    expect(resolvedState.resolvedAt).toBeDefined();
    expect(resolvedState.adminResolutionNotes).toContain('torque tested');
  });

  it('should correctly filter critical unresolved hazards for priority alerts', () => {
    const openCriticalHazards = INITIAL_COMPLAINTS.filter(
      c => c.status !== 'resolved' && (c.severity === 'critical' || c.severity === 'high')
    );

    expect(openCriticalHazards.length).toBeGreaterThan(0);
    openCriticalHazards.forEach(h => {
      expect(h.status).not.toBe('resolved');
      expect(['high', 'critical']).toContain(h.severity);
    });
  });
});
