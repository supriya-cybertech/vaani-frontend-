export type ThemeMode = 'light' | 'dark';

export interface Location {
  city: string;
  country: string;
  lat: number;
  lon: number;
  ip: string;
  isp: string;
  routingHops: number;
  geoConfidence: number;
}

export interface SignalQuality {
  snr: number;
  packetLoss: number;
  jitter: number;
  acousticMatch: number;
  spectralEntropy: number;
  codec: string;
  sampleRate: string;
}

export interface Liveness {
  status: 'VERIFIED' | 'FAILED' | 'PENDING';
  deepfakeProb: number;
  microProsody: string;
  replayDetected: boolean;
  frequencyContinuity: number;
}

export interface CallerProfile {
  id: string;
  name: string;
  role: string;
  accountId: string;
  institution: string;
  avatar: string;
  phone: string;
  location: Location;
  riskScore: number;
  signalQuality: SignalQuality;
  liveness: Liveness;
  voiceprintHash: string;
  sessionDurationSec: number;
  status: 'Verified' | 'High Risk' | 'Unverified';
  impersonatedExecutive: string;
  targetDepartment: string;
  wireTransferAmount: string;
  actionTaken: string;
  scanLatencyMs: number;
  isDeepfakeIntercepted: boolean;
}

export interface ConfidenceInterval {
  ciLow: number;
  ciHigh: number;
  level: number;
  marginOfError: number;
  sampleSize: number;
  pValue: number;
}

export interface BiometricAnomaly {
  id: string;
  callerId: string;
  timestamp: string;
  sessionOffset: string;
  frameNumber: number;
  anomalyVector: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  confidenceInterval: ConfidenceInterval;
  observedMetric: string;
  baselineExpected: string;
  phonemeSegment: string;
  durationMs: number;
  actionTaken: string;
  status: 'VERIFIED_BENIGN' | 'CONFIRMED_FRAUD' | 'INVESTIGATING';
  spectrogramSignature: string;
  details: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  details: string;
}
