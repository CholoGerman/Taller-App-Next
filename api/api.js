const BASE_URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, password, name) => {

const response = await fetch(`${BASE_URL}/api/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password, name }),
});

const data = await response.json();
console.log("info:", data);
// return data;
}


const login = async (username, password) => {

  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  const data = await response.json();
  console.log("info:", data);
  // return data;
};

export { register, login };