import React, { useState } from 'react';
import { Shield, ChevronDown, Sun, Moon, KeyRound, Lock, Unlock } from 'lucide-react';
import clsx from 'clsx';
import type { CallerProfile } from '../types';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  caller: CallerProfile;
  callers: CallerProfile[];
  onSelectCaller: (callerId: string) => void;
  isAccountFrozen: boolean;
  onTriggerMFA: () => void;
  onFreezeAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  caller,
  callers,
  onSelectCaller,
  isAccountFrozen,
  onTriggerMFA,
  onFreezeAccount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusColor = caller.status === 'Verified' ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <header className="flex items-center justify-between py-4">
      {/* Left Branding Block */}
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl text-sky-600 shadow-sm">
          <Shield className="w-6 h-6" />
          <span className="absolute top-[-2px] right-[-2px] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              VAANI<span className="text-sky-500">:</span>
            </h1>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Voice Authentication & Anti-spoofing Network Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enterprise Banking & Voice Biometrics Security
          </p>
        </div>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center space-x-4">
        {/* Caller Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-3 p-1.5 pr-3 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-sm"
          >
            <div className="relative">
              <img src={caller.avatar} alt={caller.name} className="w-8 h-8 rounded-full object-cover" />
              <span className={clsx('absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800', statusColor)} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold leading-none">{caller.name}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                {caller.accountId} • {caller.location.city}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-soft-dark border border-slate-200/80 dark:border-slate-700 z-50 overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/50 text-xs font-medium text-slate-500">
                Active Sessions
              </div>
              {callers.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCaller(c.id);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                >
                  <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-semibold truncate">{c.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.accountId}</span>
                  </div>
                  <span className={clsx('w-2 h-2 rounded-full', c.status === 'Verified' ? 'bg-emerald-500' : 'bg-rose-500')} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 shadow-sm transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Action Panel Buttons */}
        <button
          onClick={onTriggerMFA}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl shadow-sm text-sm font-medium transition-colors"
        >
          <KeyRound className="w-4 h-4" />
          <span>Trigger MFA</span>
        </button>

        <button
          onClick={onFreezeAccount}
          disabled={isAccountFrozen}
          className={clsx(
            "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
            isAccountFrozen 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700" 
              : "bg-[#E25565] hover:bg-[#D44757] text-white shadow-coral"
          )}
        >
          {isAccountFrozen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{isAccountFrozen ? 'Account Frozen' : 'Freeze Account'}</span>
        </button>
      </div>
    </header>
  );
};
