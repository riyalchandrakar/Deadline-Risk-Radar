import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-gray-900"
        >
          Deadline Risk Radar
        </Link>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
