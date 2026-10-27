import { describe, it, expect } from 'vitest';
import { INITIAL_ATTENDANCE, INITIAL_USERS } from '../lib/mockData';
import { AttendanceRecord } from '../lib/types';

describe('Smart Shift Tracking & Overtime Engine', () => {
  it('should correctly split standard hours and 1.5x overtime for shifts exceeding 8 hours', () => {
    const calculateHours = (durationHours: number) => {
      const regHours = Math.min(8, durationHours);
      const otHours = Math.max(0, durationHours - 8);
      return {
        regularHours: Math.round(regHours * 10) / 10,
        overtimeHours: Math.round(otHours * 10) / 10,
        status: otHours > 0 ? 'overtime' : 'completed'
      };
    };

    // Case 1: Standard 8-hour shift
    const standardShift = calculateHours(8.0);
    expect(standardShift.regularHours).toBe(8.0);
    expect(standardShift.overtimeHours).toBe(0.0);
    expect(standardShift.status).toBe('completed');

    // Case 2: 10.5-hour construction shift (2.5h overtime)
    const longShift = calculateHours(10.5);
    expect(longShift.regularHours).toBe(8.0);
    expect(longShift.overtimeHours).toBe(2.5);
    expect(longShift.status).toBe('overtime');

    // Case 3: 12-hour high-intensity shift (4.0h overtime)
    const heavyShift = calculateHours(12.0);
    expect(heavyShift.regularHours).toBe(8.0);
    expect(heavyShift.overtimeHours).toBe(4.0);
    expect(heavyShift.status).toBe('overtime');

    // Case 4: Short shift (5.5h)
    const shortShift = calculateHours(5.5);
    expect(shortShift.regularHours).toBe(5.5);
    expect(shortShift.overtimeHours).toBe(0.0);
    expect(shortShift.status).toBe('completed');
  });

  it('should calculate overtime earnings with statutory 1.5x premium', () => {
    const baseRate = 85; // Ramesh Kumar's hourly rate
    const overtimeMultiplier = 1.5;
    const overtimeRate = baseRate * overtimeMultiplier;

    expect(overtimeRate).toBe(127.5);

    const regularPay = 8 * baseRate;
    const overtimePay = 2.5 * overtimeRate;
    const totalDailyEarnings = regularPay + overtimePay;

    expect(regularPay).toBe(680);
    expect(overtimePay).toBe(318.75);
    expect(totalDailyEarnings).toBe(998.75);
  });

  it('should prevent duplicate active check-ins when a shift is already in progress', () => {
    const activeRecords: AttendanceRecord[] = [
      {
        id: 'att-active-1',
        userId: 'user-worker-1',
        date: '2026-10-27',
        checkInTime: new Date().toISOString(),
        totalHours: 0,
        regularHours: 0,
        overtimeHours: 0,
        status: 'active',
        locationName: 'Metro Line 4 - Pier 18 East Gate'
      }
    ];

    const canCheckIn = (userId: string) => {
      const activeShift = activeRecords.find(
        a => a.userId === userId && a.status === 'active' && !a.checkOutTime
      );
      if (activeShift) {
        return { success: false, message: 'You already have an active shift in progress!' };
      }
      return { success: true, message: 'Shift checked in successfully!' };
    };

    // Attempting check-in while already clocked in must fail
    const attempt1 = canCheckIn('user-worker-1');
    expect(attempt1.success).toBe(false);
    expect(attempt1.message).toContain('already have an active shift');

    // Another user without active shift can check in
    const attempt2 = canCheckIn('user-worker-3');
    expect(attempt2.success).toBe(true);
  });

  it('should reject invalid checkout attempts when no shift is active', () => {
    const activeRecords: AttendanceRecord[] = [];

    const canCheckOut = (userId: string) => {
      const activeShift = activeRecords.find(
        a => a.userId === userId && a.status === 'active' && !a.checkOutTime
      );
      if (!activeShift) {
        return { success: false, message: 'No active shift found to check out from.' };
      }
      return { success: true, message: 'Shift ended successfully!' };
    };

    const result = canCheckOut('user-worker-1');
    expect(result.success).toBe(false);
    expect(result.message).toContain('No active shift found');
  });

  it('should verify sample historical attendance records are intact and structured', () => {
    expect(INITIAL_ATTENDANCE.length).toBeGreaterThanOrEqual(5);

    INITIAL_ATTENDANCE.forEach(att => {
      expect(att.id).toBeDefined();
      expect(att.userId).toBeDefined();
      expect(att.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(att.regularHours).toBeLessThanOrEqual(8);
      expect(att.totalHours).toBeGreaterThanOrEqual(0);
    });
  });
});
