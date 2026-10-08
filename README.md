# VAANI Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/Status-Production%20Demo-0EA5E9?style=for-the-badge" alt="Production demo" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/supriya-cybertech/vaani-frontend-" alt="Repository size" />
  <img src="https://img.shields.io/github/languages/top/supriya-cybertech/vaani-frontend-" alt="Top language" />
  <img src="https://img.shields.io/github/last-commit/supriya-cybertech/vaani-frontend-" alt="Last commit" />
</p>

<p align="center">
  <img src="src/assets/hero.png" alt="VAANI dashboard preview" width="1200" />
</p>

VAANI is a modern frontend dashboard focused on voice authentication, anti-spoofing intelligence, and real-time fraud risk investigation. This project models a secure operations console for checking caller identity, biometric validation, anomaly confidence, and intervention workflows.

## Overview

This interface is designed for enterprise security teams that need to:

- assess caller trust in real time
- inspect voice signal quality and liveness data
- detect synthetic or spoofed voice attempts
- review biometric anomalies with confidence intervals
- trigger MFA workflows or freeze risky accounts

The application is built with React, TypeScript, and Vite, and styled with Tailwind CSS to create a polished, analyst-friendly security dashboard.

## Key Features

- Live threat telemetry overview for active caller sessions
- Caller switching with contextual account and location metadata
- Risk scoring and signal quality monitoring
- Deepfake and spoofing detection insights
- Biometric anomaly timeline with evidence-based reasoning
- Action panel for MFA challenges and account freeze controls
- Responsive, dark/light theme support
- Clean enterprise dashboard styling

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 3
- Recharts
- Lucide React
- clsx and tailwind-merge

## Project Structure

```text
vaani-frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── ActionPanel.tsx
│   │   ├── AnomalyConfidenceChart.tsx
│   │   ├── BiometricAnomalyTable.tsx
│   │   ├── CallerProfile.tsx
│   │   └── Header.tsx
│   ├── data/
│   │   ├── sampleAnomalies.ts
│   │   └── sampleData.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── .oxlintrc.json
└── README.md
```

## Screenshots

### Security Console Layout

The dashboard presents a unified voice security control center with:

- caller identity and account metadata
- risk evaluation indicators
- anomaly confidence trends
- action controls for enforcement workflows

### Verification Workflow

- monitor session health
- inspect liveness and acoustic quality
- confirm or challenge suspicious voice activity
- protect enterprise assets by escalating risky behavior

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint the project

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and build the app for production
npm run lint     # Run the linter
npm run preview  # Preview the production build locally
```

## Use Case

This frontend is tailored for voice security and identity verification use cases, such as:

- financial institution authentication
- customer verification systems
- fraud prevention and anti-spoofing monitoring
- enterprise call center security operations

## Notes

This repository is built as a polished demonstration dashboard and can be extended with a real backend, API integrations, authentication services, and production-grade telemetry data sources.

## Contact / Project

Repository: https://github.com/supriya-cybertech/vaani-frontend-

Developed as a modern voice-biometrics security interface for monitoring trust, fraud risk, and operational response.
