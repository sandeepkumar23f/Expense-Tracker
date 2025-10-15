import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ login, setLogin }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(false); 
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Expense Tracker</div>
      <ul className="nav-links">
        {login && (
          <>
            <li><Link to="/">Expense</Link></li>
            <li><Link to="/add">Add Expense</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
