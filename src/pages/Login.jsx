import { useState } from "react";
import { loginUser } from "../api/authApi"
import { saveToken } from "../services/tokenService"
import { useNavigate } from "react-router-dom";


function Login(){
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const token = await loginUser(email,password)
      saveToken(token)
      console.log("JWT Token:", token);
      navigate("/dashboard")
      alert("Login successful!")
      console.log("Jwt Token:", token)
    }catch(err){
      setError("Invalid email or password")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 justify-center rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 justify-center text-center">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 justify-center border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 justify-center border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
    </div>
  )
}

export default Login
