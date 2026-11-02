export interface IncomeData {
  salary: number;
}

export interface ExpenseData {
  food: number;
  rent: number;
  electricity: number;
  transportation: number;
  shopping: number;
  education: number;
  medical: number;
  otherExpenses: number;
}

export interface SavingsData {
  emergencyFund: number;
  fixedDeposit: number;
  educationFund: number;
  travelFund: number;
  houseFund: number;
  otherSavings: number;
}

export interface FinanceFormProps {
  income: IncomeData;
  expenses: ExpenseData;
  savings: SavingsData;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsPercentage: number;
  remainingBalance: number;
  onIncomeChange: (field: keyof IncomeData, value: number) => void;
  onExpenseChange: (field: keyof ExpenseData, value: number) => void;
  onSavingsChange: (field: keyof SavingsData, value: number) => void;
}