import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateExpense() {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Others",
  ];

  useEffect(() => {
    getExpense(id);
  }, [id]);
  const API_URL = import.meta.env.VITE_API_URL;
  const getExpense = async (id) => {
    try {
      let res = await fetch(`${API_URL}/expense/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && data.expense) {
        setExpenseData({
          title: data.expense.title,
          amount: data.expense.amount,
          category: data.expense.category,
          date: data.expense.date?.split("T")[0] || "",
        });
      } else {
        alert(data.message || "Failed to fetch expense details");
      }
    } catch (err) {
      console.error("Error fetching expense:", err);
      alert("Error fetching expense details");
    }
  };

  const updateExpense = async () => {
    if (!expenseData.title || !expenseData.amount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/update-expense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Expense updated successfully");
        navigate("/");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating expense:", err);
      alert("Error updating expense");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white text-black shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6 drop-shadow-sm">
          Update Expense
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-black font-semibold mb-1">
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
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-black font-semibold mb-1">
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
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-black font-semibold mb-1">
              Category
            </label>
            <select
              id="category"
              value={expenseData.category}
              onChange={(e) =>
                setExpenseData({ ...expenseData, category: e.target.value })
              }
              className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-black font-semibold mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={expenseData.date}
              onChange={(e) =>
                setExpenseData({ ...expenseData, date: e.target.value })
              }
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={updateExpense}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            Update Expense
          </button>
        </div>
      </div>
    </div>
  );
}
