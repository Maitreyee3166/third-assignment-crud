import type { ExpenseData, SavingsData } from "../../types/interface/calculation.interface";

export const expenseFields = [
  {
    "label": "Food",
    "name": "food"
  },
  {
    "label": "Rent",
    "name": "rent"
  },
  {
    "label": "Electricity",
    "name": "electricity"
  },
  {
    "label": "Transportation",
    "name": "transportation"
  },
  {
    "label": "Shopping",
    "name": "shopping"
  },
  {
    "label": "Education",
    "name": "education"
  },
  {
    "label": "Medical",
    "name": "medical"
  },
  {
    "label": "Other Expenses",
    "name": "otherExpenses"
  }
] satisfies { label: string; name: keyof ExpenseData }[]


export const savingsFields = [
  {
    "label": "Emergency Fund",
    "name": "emergencyFund"
  },
  {
    "label": "Fixed Deposit",
    "name": "fixedDeposit"
  },
  {
    "label": "Education Fund",
    "name": "educationFund"
  },
  {
    "label": "Travel Fund",
    "name": "travelFund"
  },
  {
    "label": "House Fund",
    "name": "houseFund"
  },
  {
    "label": "Other Savings",
    "name": "otherSavings"
  }
] satisfies { label: string; name: keyof SavingsData }[]
