import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [expenseData, setExpenseData] = useState({ title: "", amount: "" });
  const navigate = useNavigate();

  const handleAddExpense = async () => {
    if (!expenseData.title || !expenseData.amount) {
      alert("Title and amount both are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        console.log("New Expense added", data);
        navigate("/");
      } else {
        alert(data.message || "Failed to add Expense. Try again");
      }
    } catch (err) {
      console.error("Error adding expense: ", err);
      alert("Server error, please try again later");
    }
  };

  return (
  <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
    <h1 className="text-2xl font-semibold mb-4">Add New Expense</h1>

    <div className="w-64 flex flex-col">
      <label htmlFor="title" className="text-left mb-1">
        Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Enter expense title"
        value={expenseData.title}
        onChange={(e) =>
          setExpenseData({ ...expenseData, title: e.target.value })
        }
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="w-64 flex flex-col">
      <label htmlFor="amount" className="text-left mb-1">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        placeholder="Enter expense amount"
        value={expenseData.amount}
        onChange={(e) =>
          setExpenseData({ ...expenseData, amount: e.target.value })
        }
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button
      onClick={handleAddExpense}
      className="w-64 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4 transition duration-200"
    >
      Add Expense
    </button>
  </div>
);
}
