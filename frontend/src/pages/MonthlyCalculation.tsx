
import type { FinanceFormProps } from "../types/interface/calculation.interface";
import { expenseFields, savingsFields } from "../services/json/data.json";

const MonthlyCalculation = ({
  income,
  expenses,
  savings,
  totalIncome,
  totalExpenses,
  totalSavings,
  savingsPercentage,
  onIncomeChange,
  onExpenseChange,
  onSavingsChange,
  remainingBalance,
}: FinanceFormProps) => {

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Monthly Finance Dashboard
        </h1>

        <p className="mb-8 text-gray-500">
          Manage your monthly income, expenses and savings.
        </p>

        {/* Income Section */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold text-green-700">Income</h2>

          <div>
            <input
              type="text"
              value={income.salary}
              onChange={(e) => onIncomeChange("salary", Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400"
            />
          </div>
        </section>

        {/* Expenses Section */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold text-red-600">Expenses</h2>

          <div className="grid gap-5 md:grid-cols-2">
            {expenseFields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>

                <input
                  type="text"
                  min="0"
                  value={expenses[field.name]}
                  onChange={(e) =>
                    onExpenseChange(field.name, Number(e.target.value))
                  }
                  placeholder={`Enter ${field.label}`}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Savings Section */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold text-blue-700">
            Savings Categories
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Enter the amount you save or invest in each category.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {savingsFields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  key={field.name}
                  type="text"
                  min="0"
                  placeholder={field.label}
                  value={savings[field.name]}
                  onChange={(e) =>
                    onSavingsChange(field.name, Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Summary */}
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Monthly Summary
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-5">
              <p className="text-sm text-gray-600">Total Income</p>
              <h3 className="mt-2 text-2xl font-bold text-green-700">
                ₹{totalIncome.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="rounded-lg bg-red-50 p-5">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <h3 className="mt-2 text-2xl font-bold text-red-600">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="rounded-lg bg-blue-50 p-5">
              <p className="text-sm text-gray-600">Total Savings</p>
              <h3 className="mt-2 text-2xl font-bold text-blue-700">
                ₹{totalSavings.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="rounded-lg bg-yellow-50 p-5">
              <p className="text-sm text-gray-600">Savings Percentage</p>
              <h3 className="mt-2 text-2xl font-bold text-yellow-700">
                {savingsPercentage.toFixed(2)}%
              </h3>
            </div>
          </div>
          {remainingBalance < 0 ? (
            <p className="text-white bg-red-600 p-3 mt-5 text-xl text-center rounded-md w-full">
              You are over budget by ₹ {Math.abs(remainingBalance)}
            </p>
          ) : (
            <p className="text-white bg-green-600 p-3 mt-5 text-xl text-center rounded-md w-full">
              You have ₹ {remainingBalance} remaining this month.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MonthlyCalculation;
