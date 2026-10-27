import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { ProblemStatement } from './components/landing/ProblemStatement';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { HowItWorks } from './components/landing/HowItWorks';
import { IndustriesSection } from './components/landing/IndustriesSection';
import { ImpactSDG8 } from './components/landing/ImpactSDG8';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAppState } from './context/AppStateContext';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'worker' | 'admin'>('landing');
  const { switchUser, switchIndustry } = useAppState();

  const handleOpenWorker = () => {
    switchUser('user-worker-1'); // Default to Ramesh Kumar (Construction)
    setCurrentView('worker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    switchUser('user-admin-1'); // Default to Vikramaditya (Supervisor)
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectIndustryDemo = (industry: 'construction' | 'college') => {
    if (industry === 'construction') {
      switchUser('user-worker-1'); // Ramesh Kumar
    } else {
      switchUser('user-worker-2'); // Priya Selvam (College)
    }
    switchIndustry(industry);
    setCurrentView('worker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-900 font-sans selection:bg-emerald-200 selection:text-forest-950">
      {/* Top Universal Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection
              onOpenWorker={handleOpenWorker}
              onOpenAdmin={handleOpenAdmin}
            />
            <ProblemStatement />
            <FeaturesGrid
              onOpenWorker={handleOpenWorker}
              onOpenAdmin={handleOpenAdmin}
            />
            <HowItWorks />
            <IndustriesSection
              onSelectIndustryDemo={handleSelectIndustryDemo}
            />
            <ImpactSDG8 />
          </>
        )}

        {currentView === 'worker' && <WorkerDashboard />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Branded Footer */}
      <Footer />
    </div>
  );
};

export default App;
