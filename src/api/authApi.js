import axios from "axios"

const BASE_URL = "http://localhost:8081/auth"

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

  return response.data.token
}
