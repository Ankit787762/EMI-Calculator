# 💰 EMI Calculator with Shared Workspace

A modern EMI Calculator built with **Next.js 14** that provides real-time loan analysis and a collaborative multi-tab experience. Changes made in one browser tab are instantly synchronized across all other open tabs using the **BroadcastChannel API**, without requiring any backend.

## 🚀 Live Demo

**Live URL:** https://your-deployment-link.com

## 📂 GitHub Repository

**Repository:** https://github.com/your-username/emi-calculator

## ✨ Features

- Real-time EMI, Total Interest, and Total Payable calculation
- Synchronized sliders and number inputs
- Amortization Schedule with Table & Chart View
- Break-even Month Analysis
- Loan Comparison Mode (up to 3 scenarios)
- What-If Sensitivity Analysis Grid
- Prepayment Planner with Interest Savings Calculation
- Cross-Tab State Synchronization using BroadcastChannel API
- Unique Tab Identity & Active Tab Counter
- Dark/Light Theme Synchronization
- CSV Export Functionality
- URL State Sharing
- Undo Across Tabs

## 🛠 Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS
- Recharts
- Context API
- BroadcastChannel API

## 📁 Project Structure

```text
src
├── app
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components
│   ├── calculator
│   ├── amortization
│   ├── compareMode
│   ├── prepayment
│   ├── sensitivityTable
│   ├── charts
│   └── layout
│
├── context
│   └── AppContext.jsx
│
├── hooks
│   ├── useBroadcastSync.js
│   ├── useUndoSync.js
│   └── useURLState.js
│
└── utils
    ├── emi.js
    ├── amortization.js
    ├── prepayment.js
    └── exportCSV.js
```

## ⚡ Getting Started

```bash
git clone <repository-url>
cd emi-calculator
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🧮 EMI Formula

```text
EMI = P × r × (1 + r)^n
      -------------------
      (1 + r)^n − 1
```

Where:

- **P** = Principal Amount
- **r** = Monthly Interest Rate
- **n** = Loan Tenure (Months)

The application also generates:

- Amortization Schedule
- Interest vs Principal Breakdown
- Break-Even Analysis
- Prepayment Impact Analysis

##  Author

**Ankit Swami**
