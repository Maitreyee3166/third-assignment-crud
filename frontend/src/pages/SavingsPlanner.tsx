import { useCallback, useMemo, useState } from "react";
import type { ExpenseData, IncomeData, SavingsData } from "../types/interface/calculation.interface";
import MonthlyCalculation from "./MonthlyCalculation";

const SavingsPlanner = () => {
  // Income State
  const [income, setIncome] = useState<IncomeData>({
    salary: 0,
  });

  // Expenses State
  const [expenses, setExpenses] = useState<ExpenseData>({
    food: 0,
    rent: 0,
    electricity: 0,
    transportation: 0,
    shopping: 0,
    education: 0,
    medical: 0,
    otherExpenses: 0,
  });

  // Savings State
  const [savings, setSavings] = useState<SavingsData>({
    emergencyFund: 0,
    fixedDeposit: 0,
    educationFund: 0,
    travelFund: 0,
    houseFund: 0,
    otherSavings: 0,
  });

  // Income Handler
  const handleIncomeChange = useCallback(
    (field: keyof IncomeData, value: number) => {
      setIncome((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // Expense Handler
  const handleExpenseChange = useCallback(
    (field: keyof ExpenseData, value: number) => {
      setExpenses((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // Savings Handler
  const handleSavingsChange = useCallback(
    (field: keyof SavingsData, value: number) => {
      setSavings((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // Calculate Monthly Summary
  const {
    totalIncome,
    totalExpenses,
    totalSavings,
    savingsPercentage,
    remainingBalance
  } = useMemo(() => {
    const totalIncome = income.salary;

    const totalExpenses =
      expenses.food +
      expenses.rent +
      expenses.electricity +
      expenses.transportation +
      expenses.shopping +
      expenses.education +
      expenses.medical +
      expenses.otherExpenses;

    const totalSavings =
      savings.emergencyFund +
      savings.fixedDeposit +
      savings.educationFund +
      savings.travelFund +
      savings.houseFund +
      savings.otherSavings;


    const savingsPercentage =
      totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

    const remainingBalance = totalIncome - totalExpenses - totalSavings;

    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsPercentage,
      remainingBalance
    };
  }, [income, expenses, savings]);

  return (
    <MonthlyCalculation
      income={income}
      expenses={expenses}
      savings={savings}
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
      totalSavings={totalSavings}
      remainingBalance={remainingBalance}
      savingsPercentage={savingsPercentage}
      onIncomeChange={handleIncomeChange}
      onExpenseChange={handleExpenseChange}
      onSavingsChange={handleSavingsChange}
    />
  );
};

export default SavingsPlanner;
