import React from 'react';
import type { CallerProfile as CallerProfileType } from '../types';
import clsx from 'clsx';
import { Globe, Fingerprint, ShieldAlert, Activity, Volume2, Fingerprint as FingerprintIcon } from 'lucide-react';

interface CallerProfileProps {
  caller: CallerProfileType;
}

export const CallerProfile: React.FC<CallerProfileProps> = ({ caller }) => {
  const isVerified = caller.status === 'Verified';
  const statusColor = isVerified ? 'text-emerald-700 bg-emerald-50 border-emerald-200/70 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30' : 'text-rose-700 bg-rose-50 border-rose-200/70 dark:text-rose-300 dark:bg-rose-500/15 dark:border-rose-500/30';
  const pipColor = isVerified ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-soft-dark">
      {/* Caller Identity Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <img src={caller.avatar} alt={caller.name} className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-100 dark:border-slate-700" />
            <span className={clsx('absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900', pipColor)} />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold tracking-tight">{caller.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                {caller.accountId}
              </span>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap', statusColor)}>
                {isVerified ? 'Verified Authentic' : 'High Risk Profile'}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {caller.role} • {caller.institution} ({caller.location.city}, {caller.location.country})
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-500 pt-1">
              <span className="flex items-center"><Globe className="w-3 h-3 mr-1" /> IP: {caller.location.ip} • ISP: {caller.location.isp}</span>
              <span className="flex items-center"><Fingerprint className="w-3 h-3 mr-1" /> Voiceprint: {caller.voiceprintHash.substring(0, 12)}...</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Forensic Metric Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Total Security Events</span>
          </div>
          <div className="text-xl font-semibold">3 Events</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Logged this session</div>
        </div>
        
        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Live Threat Score</span>
          </div>
          <div className="text-xl font-semibold flex items-baseline space-x-1">
            <span className={clsx(caller.riskScore < 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>{caller.riskScore} / 100</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {caller.riskScore < 50 ? 'Low Threat / Verified Biological Human' : 'High Threat / Synthetic Clone Likely'}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-2">
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Signal Quality & Codec</span>
          </div>
          <div className="text-xl font-semibold">{caller.signalQuality.snr} dB SNR</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{caller.signalQuality.codec}</div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-2">
            <FingerprintIcon className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Active Liveness Integrity</span>
          </div>
          <div className="text-xl font-semibold">{caller.liveness.frequencyContinuity}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{caller.liveness.microProsody}</div>
        </div>
      </div>
    </div>
  );
};
