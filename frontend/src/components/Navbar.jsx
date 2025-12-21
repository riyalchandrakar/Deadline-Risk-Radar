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
    <nav className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo / App Name */}
        <Link to="/" className="text-lg font-semibold">
          Deadline Risk Radar
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-1 border rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1 bg-black text-white rounded"
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
