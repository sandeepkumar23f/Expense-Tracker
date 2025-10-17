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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="text-white font-bold text-lg sm:text-xl tracking-wide">
          Expense Tracker
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none text-2xl"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-4 absolute md:static left-0 w-full md:w-auto bg-blue-900 md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen
              ? "top-20 opacity-100"
              : "top-[-500px] opacity-0 md:opacity-100"
          }`}
        >
          {login && (
            <>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-3 md:py-2 text-white hover:text-yellow-300 transition text-lg sm:text-xl text-center md:text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/add-expense"
                  className="block px-4 py-3 md:py-2 text-white hover:text-yellow-300 transition text-lg sm:text-xl text-center md:text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Expense
                </Link>
              </li>
              <li className="text-center md:text-left">
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-base sm:text-lg mt-2 md:mt-0"
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
