import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const mockChartData = [
  { time: '00:00', confidence: 12, status: 'Verified' },
  { time: '00:30', confidence: 10, status: 'Verified' },
  { time: '01:00', confidence: 15, status: 'Verified' },
  { time: '01:30', confidence: 8, status: 'Verified' },
  { time: '02:00', confidence: 11, status: 'Verified' },
  { time: '02:30', confidence: 9, status: 'Verified' },
];

const mockHighRiskData = [
  { time: '00:00', confidence: 40, status: 'Warning' },
  { time: '00:30', confidence: 55, status: 'Suspicious' },
  { time: '01:00', confidence: 80, status: 'High Risk' },
  { time: '01:30', confidence: 92, status: 'Deepfake' },
  { time: '02:00', confidence: 95, status: 'Deepfake' },
  { time: '02:30', confidence: 98, status: 'Deepfake' },
];

interface AnomalyConfidenceChartProps {
  riskScore: number;
}

export const AnomalyConfidenceChart: React.FC<AnomalyConfidenceChartProps> = ({ riskScore }) => {
  const isHighRisk = riskScore >= 50;
  const chartData = isHighRisk ? mockHighRiskData : mockChartData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 border border-slate-200/80 dark:border-slate-700 shadow-soft dark:shadow-soft-dark rounded-xl p-3 backdrop-blur-md">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Session {label}</div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">
            {data.confidence}% <span className="text-xs font-normal text-slate-500">Threat Score</span>
          </div>
          <div className={clsx(
            'text-xs font-semibold',
            data.confidence >= 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
          )}>
            {data.status}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-soft-dark">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Dynamic Detection Trends</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Continuous biometric confidence and deepfake risk trajectory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className={clsx('p-2 rounded-lg', isHighRisk ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400')}>
            {isHighRisk ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Live Threat Score</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-50">{riskScore}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isHighRisk ? 'Critical threshold exceeded' : 'Within safe baseline limits'}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className={clsx('p-2 rounded-lg', isHighRisk ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400')}>
            {isHighRisk ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Caller Authenticity</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {isHighRisk ? 'Synthetic / Deepfake' : 'Verified Human'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isHighRisk ? 'Artificial codec signatures detected' : 'Natural acoustic prosody confirmed'}
            </div>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isHighRisk ? '#E25565' : '#0284C7'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isHighRisk ? '#E25565' : '#0284C7'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-700/50" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="text-slate-500 dark:text-slate-400" dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="text-slate-500 dark:text-slate-400" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={50} stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '50% Threshold', fill: 'currentColor', fontSize: 10, dy: -10 }} />
            <Area 
              type="monotone" 
              dataKey="confidence" 
              stroke={isHighRisk ? '#E25565' : '#0284C7'} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorConfidence)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
