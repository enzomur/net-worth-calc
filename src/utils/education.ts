import { EducationTopic } from '@/types';

export const educationTopics: EducationTopic[] = [
  {
    id: 'net-worth',
    title: 'What is Net Worth?',
    icon: '📊',
    content: 'Net worth is the difference between what you own (assets) and what you owe (liabilities). It\'s the single most important number in your financial life because it shows your true financial position.',
    keyPoints: [
      'Net Worth = Assets - Liabilities',
      'A negative net worth means you owe more than you own',
      'Track it monthly to see your progress',
      'Focus on growing the gap between assets and liabilities',
    ],
  },
  {
    id: 'assets',
    title: 'Understanding Assets',
    icon: '💰',
    content: 'Assets are anything of value that you own. They include cash, investments, real estate, vehicles, and personal property. Some assets appreciate (grow in value) while others depreciate.',
    keyPoints: [
      'Cash & savings are the most liquid assets',
      'Investments (stocks, bonds, crypto) can grow over time',
      'Real estate often appreciates but is illiquid',
      'Vehicles depreciate — don\'t count on their full value',
    ],
  },
  {
    id: 'liabilities',
    title: 'Understanding Liabilities',
    icon: '📋',
    content: 'Liabilities are debts — money you owe to others. Not all debt is bad: a mortgage builds equity, while credit card debt destroys wealth. The key is managing debt strategically.',
    keyPoints: [
      'High-interest debt (credit cards) should be paid off first',
      'Mortgage debt builds equity over time',
      'Student loans are an investment in earning potential',
      'Debt-to-income ratio affects loan approvals',
    ],
  },
  {
    id: 'emergency-fund',
    title: 'Emergency Fund',
    icon: '🛡️',
    content: 'An emergency fund is 3-6 months of living expenses kept in a savings account. It\'s your financial safety net that prevents you from going into debt when unexpected expenses hit.',
    keyPoints: [
      'Start with $1,000, then build to 3 months of expenses',
      'Keep it in a high-yield savings account',
      'Only use it for true emergencies',
      'Replenish it immediately after using it',
    ],
  },
  {
    id: 'investing',
    title: 'Investing Basics',
    icon: '📈',
    content: 'Investing puts your money to work, growing wealth through compound returns. Start early — time in the market matters more than timing the market.',
    keyPoints: [
      'Max out employer 401(k) match — it\'s free money',
      'Index funds offer diversification at low cost',
      'Compound interest is the 8th wonder of the world',
      'Don\'t invest money you\'ll need within 5 years',
    ],
  },
  {
    id: 'debt-payoff',
    title: 'Debt Payoff Strategies',
    icon: '🎯',
    content: 'Two popular methods: Avalanche (highest interest first) saves the most money. Snowball (smallest balance first) provides quick psychological wins. Pick whichever keeps you motivated.',
    keyPoints: [
      'Avalanche method: pay highest interest rate first',
      'Snowball method: pay smallest balance first',
      'Always pay minimums on all debts',
      'Consider balance transfer or consolidation for high rates',
    ],
  },
];

export function getTopicById(id: string): EducationTopic | undefined {
  return educationTopics.find(t => t.id === id);
}
