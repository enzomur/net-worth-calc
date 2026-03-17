# Net Worth Educator

A personal finance tool that helps you calculate, understand, and track your net worth over time. Built for anyone who wants to take control of their financial health.

## What It Does

**Calculate Your Net Worth** — Add your assets (savings, investments, property) and liabilities (loans, credit cards, mortgages) to see your total net worth at a glance.

**Learn Financial Basics** — Interactive education cards explain key concepts like assets vs. liabilities, emergency funds, debt management, and more.

**See Where You Stand** — Enter your age to see how your net worth compares to others in your age bracket with percentile rankings based on real data.

**Set Goals & Track Progress** — Set a net worth goal and save snapshots over time to visualize your progress with interactive charts.

**Get Personalized Insights** — Receive tailored recommendations based on your financial situation, including budget suggestions and milestone tracking.

**Export Your Data** — Download your financial summary as CSV or PDF for record-keeping or sharing with a financial advisor.

## Features

- Asset & liability tracking with categories
- Real-time net worth calculation
- Financial health score
- Age-based percentile comparison
- Goal setting with progress tracking
- Historical snapshots with charts
- Milestone achievements
- Budget recommendations
- CSV and PDF export
- Fully client-side (your data stays in your browser)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd net-worth-calc

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Privacy

All data is stored locally in your browser using localStorage. Nothing is sent to any server. Your financial information never leaves your device.

## Tech Stack

- [Next.js](https://nextjs.org) — React framework
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Recharts](https://recharts.org) — Charts and visualizations
- [Zod](https://zod.dev) — Data validation
- [jsPDF](https://github.com/parallax/jsPDF) — PDF export

## License

MIT
