import { describe, it, expect } from 'vitest';
import { INITIAL_PAYSLIPS } from '../lib/mockData';
import { Payslip } from '../lib/types';

describe('Transparent Payslip & Wage Auditing Engine', () => {
  it('should accurately calculate gross salary from regular pay, overtime, and allowances', () => {
    INITIAL_PAYSLIPS.forEach((slip: Payslip) => {
      // 1. Regular pay math
      const expectedRegPay = slip.regularHours * slip.baseRatePerHour;
      expect(slip.regularPay).toBe(expectedRegPay);

      // 2. Overtime rate math (1.5x regular rate)
      const expectedOtRate = slip.baseRatePerHour * 1.5;
      expect(slip.overtimeRatePerHour).toBe(expectedOtRate);

      // 3. Overtime pay math
      const expectedOtPay = slip.overtimeHours * slip.overtimeRatePerHour;
      expect(slip.overtimePay).toBe(expectedOtPay);

      // 4. Gross salary math
      const expectedGross = slip.regularPay + slip.overtimePay + slip.specialAllowances;
      expect(slip.grossSalary).toBe(expectedGross);
    });
  });

  it('should accurately calculate net salary after statutory deductions', () => {
    INITIAL_PAYSLIPS.forEach((slip: Payslip) => {
      const { deductions } = slip;
      const totalDeductions =
        deductions.providentFund +
        deductions.esiHealthcare +
        deductions.welfareCess +
        deductions.advanceDeduction;

      const expectedNetSalary = slip.grossSalary - totalDeductions;
      expect(slip.netSalary).toBe(expectedNetSalary);
      expect(slip.netSalary).toBeGreaterThan(0);
    });
  });

  it('should verify Ramesh Kumar October 2026 construction payslip figures', () => {
    const rameshOctober = INITIAL_PAYSLIPS.find(p => p.id === 'pay-2026-10-ramesh');
    expect(rameshOctober).toBeDefined();

    if (rameshOctober) {
      expect(rameshOctober.baseRatePerHour).toBe(85);
      expect(rameshOctober.regularHours).toBe(176);
      expect(rameshOctober.regularPay).toBe(14960);
      expect(rameshOctober.overtimeHours).toBe(28);
      expect(rameshOctober.overtimeRatePerHour).toBe(127.5);
      expect(rameshOctober.overtimePay).toBe(3570);
      expect(rameshOctober.specialAllowances).toBe(1500);
      expect(rameshOctober.grossSalary).toBe(20030);

      // Deductions
      expect(rameshOctober.deductions.providentFund).toBe(1795);
      expect(rameshOctober.deductions.esiHealthcare).toBe(150);
      expect(rameshOctober.deductions.welfareCess).toBe(50);

      // Net take-home
      expect(rameshOctober.netSalary).toBe(18035);
      expect(rameshOctober.status).toBe('paid');
      expect(rameshOctober.transactionRef).toContain('UPI-DC-');
    }
  });

  it('should verify Priya Selvam October 2026 college sanitation payslip figures', () => {
    const priyaOctober = INITIAL_PAYSLIPS.find(p => p.id === 'pay-2026-10-priya');
    expect(priyaOctober).toBeDefined();

    if (priyaOctober) {
      expect(priyaOctober.baseRatePerHour).toBe(75);
      expect(priyaOctober.regularHours).toBe(176);
      expect(priyaOctober.regularPay).toBe(13200);
      expect(priyaOctober.overtimeHours).toBe(14);
      expect(priyaOctober.overtimeRatePerHour).toBe(112.5);
      expect(priyaOctober.overtimePay).toBe(1575);
      expect(priyaOctober.specialAllowances).toBe(1000);
      expect(priyaOctober.grossSalary).toBe(15775);

      // Deductions
      expect(priyaOctober.deductions.providentFund).toBe(1419);
      expect(priyaOctober.deductions.esiHealthcare).toBe(118);
      expect(priyaOctober.deductions.welfareCess).toBe(40);

      // Net take-home
      expect(priyaOctober.netSalary).toBe(14198);
      expect(priyaOctober.status).toBe('paid');
    }
  });
});
