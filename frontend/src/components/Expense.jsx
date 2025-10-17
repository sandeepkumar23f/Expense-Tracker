import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";

export default function Expense() {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getExpenseData();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;
  const getExpenseData = async () => {
    try {
      const res = await fetch(`${API_URL}/expenses`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success) {
        setExpenseData(data.expenses || []);
      } else {
        alert(data.message || "Failed to fetch expenses");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, try again later");
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) getExpenseData();
      else alert(data.message || "Failed to delete expense");
    } catch (err) {
      console.error(err);
      alert("Server error, try again later");
    }
  };

  const chartArray = Object.entries(
    expenseData.reduce((acc, exp) => {
      const cat = exp.category || "Others";
      acc[cat] = (acc[cat] || 0) + Number(exp.amount || 0);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const totalExpense = expenseData.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 w-full min-h-screen bg-white">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
    Your Expenses
  </h1>

  {expenseData.length === 0 ? (
    <p className="text-center text-gray-600 text-sm sm:text-base">
      No expenses found.{" "}
      <Link
        to="/add-expense"
        className="text-blue-500 underline font-medium"
      >
        Add one
      </Link>
    </p>
  ) : (
    <>
      <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 mb-6 overflow-x-auto">
        <ul className="divide-y divide-gray-200">
          {expenseData.map((expense) => (
            <li
              key={expense._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 hover:bg-blue-50 rounded-lg px-2 sm:px-4 transition"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-semibold text-gray-800 truncate">
                  {expense.title}
                </span>
                <span className="text-sm sm:text-base text-gray-500">
                  {expense.category || "Others"} •{" "}
                  {expense.date
                    ? new Date(expense.date).toLocaleDateString()
                    : "-"}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0 flex-wrap">
                <span className="font-semibold text-green-600">
                  ₹{expense.amount}
                </span>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm sm:text-base"
                >
                  Delete
                </button>
                <Link
                  to={`/update/${expense._id}`}
                  className="text-blue-600 hover:underline font-medium text-sm sm:text-base"
                >
                  Update
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {chartArray.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 mb-6 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 text-center">
            Expenses by Category
          </h2>
          <div className="w-full">
            <ExpenseChart expenses={chartArray} />
          </div>
        </div>
      )}
    </>
  )}

  <h3 className="mt-6 text-lg sm:text-xl font-semibold text-right text-blue-700">
    Total Expenses: ₹{totalExpense}
  </h3>
</div>

  );
}
