import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { SupportedLanguage } from '../../lib/translations';
import {
  ShieldAlert,
  UserCheck,
  Building2,
  HardHat,
  GraduationCap,
  Volume2,
  Globe,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { speakText, stopSpeaking } from '../../lib/speech';

interface NavbarProps {
  currentView: 'landing' | 'worker' | 'admin';
  setCurrentView: (view: 'landing' | 'worker' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, users, switchUser } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleReadPageAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(`${t.hero.headline}. ${t.hero.description}`, language);
      setTimeout(() => setIsSpeaking(false), 8000);
    }
  };

  const languagesList: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-sm">
      {/* Top Demo Context Bar for Hackathon Evaluators */}
      <div className="bg-forest-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between border-b border-forest-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            UN SDG 8 HACKATHON LIVE DEMO
          </span>
          <span className="hidden md:inline text-emerald-300/70">|</span>
          <span className="hidden md:inline text-emerald-200/90 text-[11px]">
            Decent Work & Workplace Safety Platform
          </span>
        </div>

        {/* Quick Persona Selector */}
        <div className="flex items-center gap-2">
          <span className="text-emerald-300/80 text-[11px] hidden sm:inline">Active Persona:</span>
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-800 hover:bg-forest-700 text-white font-medium text-xs border border-forest-700 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="truncate max-w-[140px]">{currentUser.name}</span>
              <span className="text-[10px] text-emerald-300/80 uppercase">({currentUser.role})</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 text-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Switch Demo Account
                </div>
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setPersonaDropdownOpen(false);
                      if (u.role === 'admin') setCurrentView('admin');
                      else setCurrentView('worker');
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-forest-50 transition ${
                      u.id === currentUser.id ? 'bg-emerald-50 text-forest-900 font-semibold' : ''
                    }`}
                  >
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-emerald-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{u.name}</p>
                      <p className="text-[10px] text-gray-500 capitalize">
                        {u.role === 'admin' ? 'Operations Admin' : `${u.industry} • ${u.jobTitle}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-emerald-900/10 group-hover:scale-105 transition duration-200 bg-white">
              <img
                src="/logo.webp"
                alt="dead.croco logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-forest-950 font-sans leading-none">
                dead<span className="text-emerald-600">.croco</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-forest-700 uppercase mt-0.5">
                BE DEAD LIKE CROCO
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'landing'
                  ? 'text-forest-900 bg-forest-50'
                  : 'text-gray-600 hover:text-forest-900 hover:bg-gray-50'
              }`}
            >
              {t.nav.home}
            </button>
            <a
              href="#features"
              onClick={() => currentView !== 'landing' && setCurrentView('landing')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-900 hover:bg-gray-50 transition"
            >
              {t.nav.features}
            </a>
            <a
              href="#industries"
              onClick={() => currentView !== 'landing' && setCurrentView('landing')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-900 hover:bg-gray-50 transition"
            >
              {t.nav.industries}
            </a>
            <a
              href="#impact"
              onClick={() => currentView !== 'landing' && setCurrentView('landing')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-900 hover:bg-gray-50 transition"
            >
              {t.nav.impact}
            </a>
          </nav>

          {/* Right Controls: Read Aloud + Language + Dashboard Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Audio Read-Aloud Feature */}
            <button
              onClick={handleReadPageAloud}
              title="Read aloud text-to-speech for accessibility"
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                isSpeaking
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-700' : 'text-gray-500'}`} />
              <span className="text-[11px]">{isSpeaking ? 'Reading...' : 'Listen'}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                <Globe className="w-3.5 h-3.5 text-forest-700" />
                <span>{languagesList.find(l => l.code === language)?.label}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {languagesList.map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                        language === item.code ? 'font-bold text-forest-900 bg-emerald-50/70' : 'text-gray-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{item.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <button
              onClick={() => {
                if (currentUser.role === 'admin') {
                  switchUser('user-worker-1'); // Switch to Ramesh
                }
                setCurrentView('worker');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-sm ${
                currentView === 'worker'
                  ? 'bg-forest-900 text-white ring-2 ring-forest-700 shadow-md'
                  : 'bg-emerald-50 text-forest-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <HardHat className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.workerDashboard}</span>
            </button>

            <button
              onClick={() => {
                if (currentUser.role !== 'admin') {
                  switchUser('user-admin-1'); // Switch to Vikramaditya
                }
                setCurrentView('admin');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-sm ${
                currentView === 'admin'
                  ? 'bg-forest-900 text-white ring-2 ring-forest-700 shadow-md'
                  : 'bg-forest-900 text-white hover:bg-forest-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.adminDashboard}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleReadPageAloud}
              className="p-2 rounded-lg border border-gray-200 text-gray-700"
              aria-label="Listen aloud"
            >
              <Volume2 className="w-4 h-4 text-emerald-800" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                if (currentUser.role === 'admin') switchUser('user-worker-1');
                setCurrentView('worker');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 text-forest-950 font-bold text-sm border border-emerald-200"
            >
              <HardHat className="w-4 h-4 text-emerald-700" />
              <span>{t.nav.workerDashboard}</span>
            </button>
            <button
              onClick={() => {
                if (currentUser.role !== 'admin') switchUser('user-admin-1');
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-forest-900 text-white font-bold text-sm"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.adminDashboard}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-1">
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
            >
              {t.nav.home}
            </button>
            <a
              href="#features"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t.nav.features}
            </a>
            <a
              href="#industries"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t.nav.industries}
            </a>
            <a
              href="#impact"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {t.nav.impact}
            </a>
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Language:</span>
            <div className="flex items-center gap-1">
              {languagesList.map(item => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    language === item.code ? 'bg-forest-900 text-white font-bold' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
