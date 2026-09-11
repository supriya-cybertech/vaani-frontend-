import React, { useState } from 'react';
import type { BiometricAnomaly } from '../types';
import { Search, Download, Beaker, ChevronDown, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface BiometricAnomalyTableProps {
  anomalies: BiometricAnomaly[];
}

export const BiometricAnomalyTable: React.FC<BiometricAnomalyTableProps> = ({ anomalies }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30';
      case 'HIGH': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30';
      case 'MEDIUM': return 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30';
      case 'LOW': return 'bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-soft-dark overflow-hidden">
      
      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search anomaly types, segments, or actions..."
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-shadow"
            />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer">
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1.5 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
          <button className="flex items-center space-x-1.5 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>
          <button className="flex items-center space-x-1.5 px-4 py-2 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 rounded-xl text-sm font-medium text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors ml-2">
            <Beaker className="w-4 h-4" />
            <span>Sample Anomaly</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-3 w-8"></th>
              <th className="px-6 py-3">Timestamp & Offset</th>
              <th className="px-6 py-3">Anomaly Vector & Category</th>
              <th className="px-6 py-3">Confidence & Severity</th>
              <th className="px-6 py-3">Status & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {anomalies.map((anomaly) => (
              <React.Fragment key={anomaly.id}>
                <tr 
                  onClick={() => toggleRow(anomaly.id)}
                  className="cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {expandedRow === anomaly.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{anomaly.timestamp.split(' ')[1]}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{anomaly.sessionOffset}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{anomaly.anomalyVector}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{anomaly.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={clsx('px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wide', getSeverityBadge(anomaly.severity))}>
                        {anomaly.severity}
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 text-xs">{anomaly.confidence}% Conf.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5 font-medium text-slate-900 dark:text-slate-100">
                      {anomaly.status === 'VERIFIED_BENIGN' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                      <span className="text-xs">{anomaly.actionTaken}</span>
                    </div>
                  </td>
                </tr>
                {/* Expanded Drawer */}
                {expandedRow === anomaly.id && (
                  <tr>
                    <td colSpan={5} className="bg-slate-50/50 dark:bg-slate-900/50 p-0 border-b border-slate-200 dark:border-slate-800">
                      <div className="px-14 py-6 text-sm grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Phonetic Segment & Context</h4>
                          <p className="text-slate-600 dark:text-slate-400">{anomaly.phonemeSegment}</p>
                          <div className="mt-3 text-xs text-slate-500">
                            Duration: <span className="font-medium text-slate-700 dark:text-slate-300">{anomaly.durationMs}ms</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Acoustic Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Observed:</span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{anomaly.observedMetric}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Baseline Expected:</span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{anomaly.baselineExpected}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Forensic Explanation</h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                            {anomaly.details}
                          </p>
                          <div className="mt-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Spectrogram Signature: {anomaly.spectrogramSignature}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
