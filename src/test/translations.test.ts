import { describe, it, expect } from 'vitest';
import { translations, SupportedLanguage } from '../lib/translations';

describe('Multilingual Translation Integrity (Accessibility)', () => {
  const languages: SupportedLanguage[] = ['en', 'hi', 'ta'];

  it('should support English, Hindi, and Tamil with 100% dictionary completeness', () => {
    languages.forEach(lang => {
      const dict = translations[lang];
      expect(dict).toBeDefined();

      // Brand
      expect(dict.appName).toBe('dead.croco');
      expect(dict.tagline).toBe('BE DEAD LIKE CROCO');

      // Navigation
      expect(dict.nav.home).toBeTruthy();
      expect(dict.nav.features).toBeTruthy();
      expect(dict.nav.industries).toBeTruthy();
      expect(dict.nav.impact).toBeTruthy();
      expect(dict.nav.workerDashboard).toBeTruthy();
      expect(dict.nav.adminDashboard).toBeTruthy();

      // Hero
      expect(dict.hero.headline).toBeTruthy();
      expect(dict.hero.description).toBeTruthy();
      expect(dict.hero.getStarted).toBeTruthy();
      expect(dict.hero.exploreFeatures).toBeTruthy();
      expect(dict.hero.badgeSDG).toMatch(/(SDG|एसडीजी)/);

      // Worker Features
      expect(dict.worker.shiftTracking).toBeTruthy();
      expect(dict.worker.checkIn).toBeTruthy();
      expect(dict.worker.checkOut).toBeTruthy();
      expect(dict.worker.payslips).toBeTruthy();
      expect(dict.worker.safetyReport).toBeTruthy();
      expect(dict.worker.anonymousFeedback).toBeTruthy();
      expect(dict.worker.skillPassport).toBeTruthy();
      expect(dict.worker.voiceInput).toBeTruthy();
      expect(dict.worker.readAloud).toBeTruthy();

      // Admin & Safety
      expect(dict.safety.hazardTitle).toBeTruthy();
      expect(dict.safety.submitted).toBeTruthy();
      expect(dict.safety.resolved).toBeTruthy();
      expect(dict.admin.workerManagement).toBeTruthy();
      expect(dict.admin.safetyConsole).toBeTruthy();
      expect(dict.admin.fatigueMonitor).toBeTruthy();
      expect(dict.admin.ruleWarningNote).toBeTruthy();
    });
  });

  it('should verify Hindi translations use valid Devanagari script', () => {
    const hindi = translations.hi;
    expect(hindi.nav.home).toBe('मुख्य पृष्ठ');
    expect(hindi.worker.shiftTracking).toBe('स्मार्ट उपस्थिति ट्रैकिंग');
    expect(hindi.hero.headline).toContain('उचित काम');
  });

  it('should verify Tamil translations use valid Tamil script', () => {
    const tamil = translations.ta;
    expect(tamil.nav.home).toBe('முகப்பு');
    expect(tamil.worker.shiftTracking).toContain('வருகைப்பதிவு');
    expect(tamil.hero.headline).toContain('நியாயமான உழைப்பு');
  });
});
