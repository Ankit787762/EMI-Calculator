# 💰 EMI Calculator with Shared Workspace

A modern EMI Calculator built with **Next.js 14**, featuring real-time loan analysis, amortization schedules, loan comparison, and cross-tab synchronization using the **BroadcastChannel API**.

<img width="1872" height="910" alt="image" src="https://github.com/user-attachments/assets/6bd22994-d657-4245-b1c4-140410d6a301" />

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

### Loan Comparison Mode

<img width="1876" height="898" alt="image" src="https://github.com/user-attachments/assets/9a12079d-e8ea-4d97-a6fa-89ea58b2b618" />

### Amortization Schedule

<img width="1842" height="916" alt="image" src="https://github.com/user-attachments/assets/7e5dffe8-0079-49d2-9f9a-1c9218b7c295" />

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



