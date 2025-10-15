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
    <div className="container">
      <h1>Add New Expense</h1>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Expense title"
          value={expenseData.title}
          onChange={(e) =>
            setExpenseData({ ...expenseData, title: e.target.value })
          }
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter expense amount"
          value={expenseData.amount}
          onChange={(e) =>
            setExpenseData({ ...expenseData, amount: e.target.value })
          }
          className="input-field"
        />
      </div>

      <button onClick={handleAddExpense} className="submit-btn">
        Add Expense
      </button>
    </div>
  );
}
