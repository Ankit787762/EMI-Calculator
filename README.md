# 💰 EMI Calculator with Shared Workspace

A modern EMI Calculator built with **Next.js 14** that provides real-time loan analysis and a collaborative multi-tab experience. Changes made in one browser tab are instantly synchronized across all other open tabs using the **BroadcastChannel API**, without requiring any backend.

![EMI Calculator Dashboard](./screenshots/dashboard.png)

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8)
![Recharts](https://img.shields.io/badge/Recharts-Charting-orange)

---

## 🚀 Live Demo

🔗 https://your-vercel-link.vercel.app

## 📂 GitHub Repository

🔗 https://github.com/Ankit787762/EMI-Calculator

---

## 🎯 Why This Project?

This project was built as part of a Frontend Internship Assignment to demonstrate:

- Advanced React state management
- Cross-tab communication using the BroadcastChannel API
- Financial calculations and amortization logic
- Reusable component architecture
- Modern Next.js development practices

---

## ✨ Features

### 📊 EMI Calculator
- Real-time EMI, Total Interest, and Total Payable calculation
- Synchronized sliders and number inputs
- Principal vs Interest visualization

### 📅 Amortization Schedule
- Month-wise repayment breakdown
- Break-even Month Analysis
- Table & Chart View

### 🔄 Loan Comparison Mode
- Compare up to 3 loan scenarios
- Side-by-side comparison of loan options
- Automatic best-scenario identification

### 📈 What-If Analysis
- Dynamic Rate × Tenure sensitivity grid
- Instant EMI recalculation
- Current selection highlighting

### 💸 Prepayment Planner
- Multiple prepayment support
- Interest savings calculation
- Reduced tenure estimation
- Updated repayment schedule

### 🌐 Shared Workspace
- Real-Time Cross-Tab Synchronization
- Unique Tab Identity
- Active Tab Counter
- Theme Synchronization
- Undo Across Tabs

### 📤 Additional Features
- CSV Export
- URL State Sharing
- Dark / Light Theme

---

## 📸 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Loan Comparison Mode

![Comparison Mode](./screenshots/comparison.png)

### Amortization Schedule

![Amortization Schedule](./screenshots/amortization.png)

---

## 🛠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- JavaScript
- Tailwind CSS

### Data Visualization
- Recharts

### State Management
- React Context API
- Custom Hooks

### Browser APIs
- BroadcastChannel API
- URLSearchParams

---

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

---

## ⚡ Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd emi-calculator
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

---

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

---

## 👨‍💻 Author

**Ankit Swami**


- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile



