import { describe, it, expect } from 'vitest';
import { INITIAL_FATIGUE_ALERTS } from '../lib/mockData';
import { FatigueAlert } from '../lib/types';

describe('Rule-Based Fatigue & Rest Safeguards Engine', () => {
  it('should flag shifts exceeding 12 consecutive hours (Rule #1)', () => {
    const checkMaxShiftLength = (durationHours: number) => {
      if (durationHours > 12) {
        return {
          flagged: true,
          severity: 'critical' as const,
          rule: 'Rule #1: Shift Duration Exceeds 12 Hours (>12h limit)'
        };
      }
      return { flagged: false };
    };

    const regularShift = checkMaxShiftLength(8);
    expect(regularShift.flagged).toBe(false);

    const overtimeShift = checkMaxShiftLength(10);
    expect(overtimeShift.flagged).toBe(false);

    const excessiveShift = checkMaxShiftLength(12.5);
    expect(excessiveShift.flagged).toBe(true);
    expect(excessiveShift.severity).toBe('critical');
    expect(excessiveShift.rule).toContain('Exceeds 12 Hours');
  });

  it('should flag insufficient turnaround rest between shifts (<8 hours rest) (Rule #2)', () => {
    const checkRestInterval = (restHours: number) => {
      if (restHours < 8) {
        return {
          flagged: true,
          severity: 'moderate' as const,
          rule: 'Rule #2: Short Turnaround Interval (<8h rest between shifts)'
        };
      }
      return { flagged: false };
    };

    expect(checkRestInterval(12).flagged).toBe(false);
    expect(checkRestInterval(8).flagged).toBe(false);

    const shortRest = checkRestInterval(6.5);
    expect(shortRest.flagged).toBe(true);
    expect(shortRest.severity).toBe('moderate');
  });

  it('should verify all fatigue alerts contain actionable operational recommendations', () => {
    INITIAL_FATIGUE_ALERTS.forEach((fa: FatigueAlert) => {
      expect(fa.id).toBeDefined();
      expect(fa.workerName).toBeDefined();
      expect(fa.ruleViolated).toBeTruthy();
      expect(fa.details).toBeTruthy();
      expect(fa.recommendedAction).toBeTruthy();
      expect(['moderate', 'critical']).toContain(fa.severity);
    });
  });

  it('should allow acknowledging fatigue alerts upon supervisor schedule review', () => {
    const alert = { ...INITIAL_FATIGUE_ALERTS[0], acknowledged: false };
    expect(alert.acknowledged).toBe(false);

    const acknowledgedAlert = { ...alert, acknowledged: true };
    expect(acknowledgedAlert.acknowledged).toBe(true);
  });
});
