#  EMI Calculator with Shared Workspace

A modern EMI Calculator built with **Next.js 14**, featuring real-time loan analysis, amortization schedules, loan comparison, and cross-tab synchronization using the **BroadcastChannel API**.

<img width="1882" height="915" alt="image" src="https://github.com/user-attachments/assets/6192e1fc-4b95-4ead-a0ab-b40c8858c114" />

---

## 🚀 Live Demo

🔗 https://emi-calculator-psi-ashy.vercel.app/

## 📂 GitHub Repository

🔗 https://github.com/Ankit787762/EMI-Calculator

---

## 🎯 Why This Project?

This project demonstrates:

* Advanced React state management using Context API
* Cross-tab communication with the BroadcastChannel API
* Financial calculations and amortization logic
* URL-based state persistence and shareable scenarios
* Reusable and scalable component architecture
* Data visualization using Recharts
* Modern development practices with Next.js 14


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

<img width="1866" height="895" alt="image" src="https://github.com/user-attachments/assets/1eb3b984-1023-4d50-bee8-8a8f64bd4dce" />

### Amortization Schedule

<img width="1855" height="920" alt="image" src="https://github.com/user-attachments/assets/1d675902-b4a7-42c1-9d04-8be08b81c1f3" />

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
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components
│   ├── amortization
│   │   ├── AmortizationTable.jsx
│   │   └── ChartView.jsx
│   │
│   ├── calculator
│   │   ├── LoanInputs.jsx
│   │   ├── RatioBar.jsx
│   │   └── SummaryCards.jsx
│   │
│   ├── compareMode
│   │   ├── CompareMode.jsx
│   │   └── ScenarioCard.jsx
│   │
│   ├── features
│   │   ├── ModeTabs.jsx
│   │   └── SensitivityTable.jsx
│   │
│   ├── layout
│   │   └── Header.jsx
│   │
│   └── Prepayment
│       ├── MainContent.jsx
│       ├── PrepaymentPlanner.jsx
│       └── PrepaymentSchedule.jsx
│
├── context
│   └── AppContext.jsx
│
├── hooks
│   ├── useUndoSync.js
│   └── useURLState.js
│
└── utils
    ├── emi.js
    └── exportCSV.js
```

---

## ⚡ Getting Started

### Clone the Repository

```bash
git clone https://github.com/Ankit787762/EMI-Calculator.git
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


---

## 👨‍💻 Author

**Ankit Swami**


- GitHub: https://github.com/Ankit787762
- LinkedIn: https://www.linkedin.com/in/ankit-swami-612971283



