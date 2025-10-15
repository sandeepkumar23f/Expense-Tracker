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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
      <Link to={"/add-expense"}>Add Expense</Link>

      {expenseData.length === 0 ? (
        <p>No expenses found. <Link to="/add-expense" className="text-blue-500 underline">Add one</Link></p>
      ) : (
        <ul className="space-y-2">
          {expenseData.map((expense) => (
            <li key={expense._id} className="p-2 border rounded shadow-sm flex justify-between">
              <span>{expense.title}</span>
              <span>{expense.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}