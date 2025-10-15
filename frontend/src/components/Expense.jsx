import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

export default function Expense(){
  const [expenseData,setExpenseData]=useState([]);

  useEffect(()=>{
    getExpenseData();
  },[])

  const getExpenseData = async ()=>{
    try{
      let result = await fetch("http://localhost:5000/expenses",{
        credentials: "include",
        cache: "no-store"
      });
      let data = await result.json();

      if(data.success){
        setExpenseData(data.expenses || []);
      } else{
        alert(data.message || "Failed to fetch expenses try again ");
      }
    } catch(error){
      console.error("Error fetching task",error);
      alert("Server error please try again later")
    }
  }

  const deleteExpense = async (id)=>{
    try{
      let item = await fetch(`http://localhost:5000/delete/${id}`,{
        method: "DELETE",
        credentials: "include"
      })

      item = await item.json()
      
      if(item.success){
        getExpenseData(),
        console.log("Expense delete successfully")
      } else{
        alert(item.message || "Failed to delete Expenses try again")
      }
    } catch(err){
      console.error("Error deleting task", err);
      alert("server error please try again later")
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
      <Link
        to={"/add-expense"}
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        Add Expense
      </Link>

      {expenseData.length === 0 ? (
        <p>
          No expenses found.{" "}
          <Link to="/add-expense" className="text-blue-500 underline">
            Add one
          </Link>
        </p>
      ) : (
        <ul className="space-y-2">
          {expenseData.map((expense) => (
            <li
              key={expense._id}
              className="p-2 border rounded shadow-sm flex justify-between items-center"
            >
              <span>{expense.title}</span>
              <span>${expense.amount}</span>
              <button
                onClick={() => deleteExpense(expense._id)}
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded transition duration-200"
              >
                Delete
              </button>
              <Link to={`/update/${expense._id}`}>Update</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}