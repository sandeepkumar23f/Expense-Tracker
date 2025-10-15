import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateExpense() {
  const [expenseData, setExpenseData] = useState({ title: "", amount: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getExpense(id);
  }, [id]);

  const getExpense = async (id) => {
    try {
      let res = await fetch(`http://localhost:5000/expense/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && data.expense) {
        setExpenseData({
          title: data.expense.title,
          amount: data.expense.amount,
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
      alert("Please fill in both title and amount");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/update-expense/${id}`, {
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
    <div >
      <h1 >
        Update Expense
      </h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="amount" >
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
          />
        </div>

        <button
          onClick={updateExpense}
        >
          Update Expense
        </button>
      </div>
    </div>
  );
}
