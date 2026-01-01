import { useEffect, useState } from "react"; // ✅ added useState
import { removeToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/userApi";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // ✅ useState
  const [user, setUser] = useState(null);       // ✅ useState

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Unauthorized or token expired", error);
        removeToken();
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="text-green-600 mb-6">
          You are logged in successfully 🎉
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
