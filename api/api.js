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

const fetchWithParams = async (path, params = {}) => {
  
  const qp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qp.append(k, v);
  });
  const url = `${BASE}${path}${qp.toString() ? `?${qp.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  return res.json();
}



export { register, login, fetchWithParams };