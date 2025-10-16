import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleAddExpense = async () => {
    if (!expenseData.title || !expenseData.amount) {
      alert("Title and amount both are required");
      return;
    }

    try {
      const res = await fetch("https://expense-tracker-3-tejm.onrender.com/add-expense", {
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
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 text-gray-800">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Add New Expense
      </h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-800 font-medium mb-1">
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-800 font-medium mb-1">
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-800 font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          value={expenseData.category}
          onChange={(e) =>
            setExpenseData({ ...expenseData, category: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="date" className="block text-gray-800 font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={expenseData.date}
          onChange={(e) =>
            setExpenseData({ ...expenseData, date: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        onClick={handleAddExpense}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
      >
        Add Expense
      </button>
    </div>
  </div>
);

}