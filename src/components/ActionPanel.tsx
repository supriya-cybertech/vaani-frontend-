import React, { useState } from 'react';
import { Lock, X, AlertTriangle, KeyRound, Smartphone, MessageSquare, Loader2, Radar, CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface ActionPanelProps {
  freezeModalOpen: boolean;
  setFreezeModalOpen: (open: boolean) => void;
  mfaModalOpen: boolean;
  setMfaModalOpen: (open: boolean) => void;
  onConfirmFreeze: () => void;
  onMfaResult: (passed: boolean) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  freezeModalOpen,
  setFreezeModalOpen,
  mfaModalOpen,
  setMfaModalOpen,
  onConfirmFreeze,
  onMfaResult
}) => {

  // Freeze Modal State
  const [freezeReason, setFreezeReason] = useState('Suspected synthetic voice / deepfake');
  const [freezeScope, setFreezeScope] = useState('Block outbound wire transfers and withdrawals');
  const [freezeNote, setFreezeNote] = useState('Account frozen while customer identity is being verified with account holder.');

  // MFA Modal State
  const [mfaStep, setMfaStep] = useState<1 | 2 | 3>(1); // 1: Select, 2: Loading, 3: Awaiting Response
  const [selectedVector, setSelectedVector] = useState('push');

  const handleConfirmFreeze = () => {
    onConfirmFreeze();
    setFreezeModalOpen(false);
  };

  const handleSendChallenge = () => {
    setMfaStep(2);
    setTimeout(() => {
      setMfaStep(3);
    }, 500);
  };

  const handleMfaSimulation = (passed: boolean) => {
    onMfaResult(passed);
    setTimeout(() => {
      setMfaModalOpen(false);
      setMfaStep(1); // Reset
    }, 1000);
  };

  return (
    <>
      {/* Freeze Account Modal */}
      {freezeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-full">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Freeze Account</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Place immediate hold on wire transfers and accounts</p>
                </div>
              </div>
              <button onClick={() => setFreezeModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200/80 dark:border-rose-500/30 rounded-xl flex items-start space-x-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                <p className="text-sm text-rose-900 dark:text-rose-300 font-medium">
                  Freezing this account will immediately block all pending outbound transfers, SIP trunk gateways, and API tokens.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Reason for Freeze</label>
                  <select 
                    value={freezeReason}
                    onChange={e => setFreezeReason(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  >
                    <option>Suspected synthetic voice / deepfake</option>
                    <option>Stolen credentials / SIM swap</option>
                    <option>Suspicious high-value transfer pattern</option>
                    <option>Customer requested freeze</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Enforcement Scope</label>
                  <select 
                    value={freezeScope}
                    onChange={e => setFreezeScope(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  >
                    <option>Block outbound wire transfers and withdrawals</option>
                    <option>Complete account lockdown (inbound & outbound)</option>
                    <option>Revoke voice biometric authentication tokens</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Operator Note</label>
                  <textarea 
                    value={freezeNote}
                    onChange={e => setFreezeNote(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={() => setFreezeModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmFreeze}
                className="px-4 py-2 bg-[#E25565] hover:bg-[#D44757] text-white rounded-xl text-xs font-medium shadow-sm transition-colors shadow-coral"
              >
                Confirm Freeze
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MFA Modal */}
      {mfaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Trigger Multi-Factor Auth</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Issue an out-of-band active challenge</p>
                </div>
              </div>
              <button onClick={() => { setMfaModalOpen(false); setMfaStep(1); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {mfaStep === 1 && (
                <div className="space-y-3">
                  {/* Option 1 */}
                  <label className={clsx(
                    "flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-colors",
                    selectedVector === 'sms' 
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 dark:border-sky-500/50" 
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  )}>
                    <div className="flex items-center h-5 mt-1">
                      <input 
                        type="radio" 
                        name="mfa_vector" 
                        value="sms" 
                        checked={selectedVector === 'sms'}
                        onChange={() => setSelectedVector('sms')}
                        className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-600" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">One-Time Passcode (SMS / Voice)</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Send an automated cryptographic nonce to registered mobile ending in +41 22 819 4022.
                      </p>
                    </div>
                  </label>

                  {/* Option 2 */}
                  <label className={clsx(
                    "flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-colors",
                    selectedVector === 'push' 
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 dark:border-sky-500/50" 
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  )}>
                    <div className="flex items-center h-5 mt-1">
                      <input 
                        type="radio" 
                        name="mfa_vector" 
                        value="push" 
                        checked={selectedVector === 'push'}
                        onChange={() => setSelectedVector('push')}
                        className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-600" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Mobile Push Notification (Swisscom Mobile ID)</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Dispatch a biometric authentication prompt to Elena's enrolled iPhone hardware enclave.
                      </p>
                    </div>
                  </label>

                  {/* Option 3 */}
                  <label className={clsx(
                    "flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-colors",
                    selectedVector === 'kba' 
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 dark:border-sky-500/50" 
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  )}>
                    <div className="flex items-center h-5 mt-1">
                      <input 
                        type="radio" 
                        name="mfa_vector" 
                        value="kba" 
                        checked={selectedVector === 'kba'}
                        onChange={() => setSelectedVector('kba')}
                        className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-600" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <KeyRound className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Security Knowledge Verification</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Prompt operator with out-of-band banking secret questions.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {mfaStep === 2 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Dispatching Challenge...</h4>
                  <p className="text-sm text-slate-500">Establishing secure hardware enclave connection</p>
                </div>
              )}

              {mfaStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 bg-sky-500 rounded-full animate-pulse opacity-40 blur-md"></div>
                    <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full border-4 border-sky-100 dark:border-sky-900">
                      <Radar className="w-12 h-12 text-sky-500 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Awaiting Customer Response</h4>
                  <p className="text-sm text-slate-500 text-center mb-8 max-w-xs">
                    Challenge sent to registered device. Awaiting FIDO2 signature confirmation.
                  </p>

                  <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">Simulation Controls</p>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleMfaSimulation(true)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/20 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Customer Passed</span>
                      </button>
                      <button 
                        onClick={() => handleMfaSimulation(false)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500/20 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Customer Failed</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {mfaStep === 1 && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3 bg-slate-50 dark:bg-slate-900/50">
                <button 
                  onClick={() => setMfaModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendChallenge}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-medium shadow-sm transition-colors"
                >
                  Send Verification Challenge
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
