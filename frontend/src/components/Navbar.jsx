import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Navbar({ login, setLogin }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(false); 
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        {/* Logo / Title */}
        <div className="text-white font-bold text-lg md:text-xl tracking-wide">
          Expense Tracker
        </div>

        {/* Hamburger icon for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu links */}
        <ul
          className={`flex-col md:flex-row md:flex md:items-center gap-4 absolute md:static left-0 w-full md:w-auto bg-blue-900 md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? "top-14 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          {login && (
            <>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-white hover:text-yellow-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/add-expense"
                  className="block px-4 py-2 text-white hover:text-yellow-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Expense
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition mx-4"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
);

}
