import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ login, setLogin }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(false); 
    navigate("/login");
  };

  return (
  <nav className="bg-blue-900 fixed top-0 left-0 w-full shadow-md px-6 py-3 flex justify-between items-center z-50">
    <div className="font-bold text-xl text-white">Expense Tracker</div>
    <ul className="flex gap-4 items-center">
      {login && (
        <>
          <li><Link to="/" className="hover:text-yellow-300 font-medium text-white">Expense</Link></li>
          <li><Link to="/add-expense" className="hover:text-yellow-300  font-medium text-white">Add Expense</Link></li>
          <li>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  </nav>
);

}
