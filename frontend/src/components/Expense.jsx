import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";

export default function Expense() {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getExpenseData();
  }, []);

  const getExpenseData = async () => {
    try {
      const res = await fetch("http://localhost:5000/expenses", {
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
      const res = await fetch(`http://localhost:5000/delete/${id}`, {
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

  // Prepare chart array
  const chartArray = Object.entries(
    expenseData.reduce((acc, exp) => {
      const cat = exp.category || "Others";
      acc[cat] = (acc[cat] || 0) + Number(exp.amount || 0);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const totalExpense = expenseData.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Expenses</h1>

      {expenseData.length === 0 ? (
        <p className="text-center text-gray-600">
          No expenses found.{" "}
          <Link to="/add-expense" className="text-blue-500 underline font-medium">
            Add one
          </Link>
        </p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <ul className="divide-y divide-gray-200">
              {expenseData.map((expense) => (
                <li
                  key={expense._id}
                  className="flex flex-wrap justify-between items-center py-3 hover:bg-blue-50 rounded-lg px-2 transition"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{expense.title}</span>
                    <span className="text-sm text-gray-500">
                      {expense.category || "Others"} •{" "}
                      {expense.date ? new Date(expense.date).toLocaleDateString() : "-"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-green-600">₹{expense.amount}</span>
                    <button
                      onClick={() => deleteExpense(expense._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${expense._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Update
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {chartArray.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                Expenses by Category
              </h2>
              <ExpenseChart expenses={chartArray} />
            </div>
          )}
        </>
      )}

      <h3 className="mt-6 text-xl font-semibold text-right text-blue-700">
        Total Expenses: ₹{totalExpense}
      </h3>
    </div>
  );
}
