import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CallerProfile as CallerProfileComponent } from './components/CallerProfile';
import { AnomalyConfidenceChart } from './components/AnomalyConfidenceChart';
import { BiometricAnomalyTable } from './components/BiometricAnomalyTable';
import { ActionPanel } from './components/ActionPanel';
import { CALLERS } from './data/sampleData';
import { ELENA_ANOMALIES } from './data/sampleAnomalies';
import { Radio, Activity, Layers } from 'lucide-react';
import clsx from 'clsx';
import type { ThemeMode } from './types';

function App() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [activeCallerId, setActiveCallerId] = useState(CALLERS[0].id);
  const [isAccountFrozen, setIsAccountFrozen] = useState(false);
  
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [mfaModalOpen, setMfaModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'telemetry' | 'log'>('telemetry');

  const caller = CALLERS.find(c => c.id === activeCallerId) || CALLERS[0];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  const handleMfaResult = (passed: boolean) => {
    if (!passed) {
      // In a real app, we'd update state to increase threat score
      setIsAccountFrozen(true);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        
        <Header 
          theme={theme}
          toggleTheme={toggleTheme}
          caller={caller}
          callers={CALLERS}
          onSelectCaller={id => { setActiveCallerId(id); setIsAccountFrozen(false); }}
          isAccountFrozen={isAccountFrozen}
          onTriggerMFA={() => setMfaModalOpen(true)}
          onFreezeAccount={() => setFreezeModalOpen(true)}
        />

        {/* Tab Navigation & Session Context Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          {/* Pill-shaped Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-200/50 dark:bg-slate-800/80 rounded-full border border-slate-200/80 dark:border-slate-700/50 shadow-sm w-fit">
            <button 
              onClick={() => setActiveTab('telemetry')}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeTab === 'telemetry' 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Radio className={clsx("w-4 h-4", activeTab === 'telemetry' && "text-sky-500 animate-pulse")} />
              <span>Live Threat Telemetry</span>
            </button>
            <button 
              onClick={() => setActiveTab('log')}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeTab === 'log' 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Activity className="w-4 h-4" />
              <span>Voice Verification Log</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-600 text-xs text-slate-600 dark:text-slate-300">
                3
              </span>
            </button>
          </div>

          {/* Session Context Bar */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Current Session: {caller.name} • {caller.status === 'Verified' ? 'Verified Baseline' : 'Elevated Risk'}</span>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Layers className="w-4 h-4" />
              <span>Detailed Log</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6">
          <CallerProfileComponent caller={caller} />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            <div className="w-full">
              <AnomalyConfidenceChart riskScore={caller.riskScore} />
            </div>
            <div className="w-full">
              <BiometricAnomalyTable anomalies={activeCallerId === 'caller-1' ? ELENA_ANOMALIES : []} />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
          <div>
            FIDO2 WebAuthn Level 3 • SOC2 Type II Attested • ISO/IEC 30107-3 Biometric Defense
          </div>
          <div>
            VAANI Zero-Trust Voice Intelligence • 28ms Engine Latency
          </div>
        </footer>

      </div>

      <ActionPanel 
        freezeModalOpen={freezeModalOpen}
        setFreezeModalOpen={setFreezeModalOpen}
        mfaModalOpen={mfaModalOpen}
        setMfaModalOpen={setMfaModalOpen}
        onConfirmFreeze={() => setIsAccountFrozen(true)}
        onMfaResult={handleMfaResult}
      />
    </div>
  );
}

export default App;
