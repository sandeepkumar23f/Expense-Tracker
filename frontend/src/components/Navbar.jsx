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
        <div className="text-white font-bold text-lg sm:text-xl tracking-wide">
          Expense Tracker
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-yellow-300! focus:outline-none text-2xl z-50"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul
          className={`flex flex-col gap-2 absolute top-20 left-0 w-full bg-blue-900 p-4 md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {login && (
            <>
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block text-white hover:text-yellow-300 px-4 py-2 rounded text-lg sm:text-xl"
                >
                  Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/add-expense"
                  onClick={() => setMenuOpen(false)}
                  className="block text-white hover:text-yellow-300 px-4 py-2 rounded text-lg sm:text-xl"
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
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-base sm:text-lg mt-2 z-50"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <ul className="hidden md:flex md:items-center gap-4">
          {login && (
            <>
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-yellow-300 text-lg sm:text-xl"
                >
                  Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/add-expense"
                  className="text-white hover:text-yellow-300 text-lg sm:text-xl"
                >
                  Add Expense
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500! text-white px-4 py-2 rounded-md hover:bg-red-600! transition text-base sm:text-lg"
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
