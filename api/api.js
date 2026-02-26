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
  return data;
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
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));  
  return data;
};

const getUser = async (id) => {
  const response = await fetch(`${BASE_URL}/api/users/${id}`);

  const data = await response.json();
  return data;
};


const getLocals = async (q="", type="", priceRange="", rating="", city="", zone="") => {
   const data = await fetch(`${BASE_URL}/api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`).then(res => res.json());

   return data;
};


const getLocal = async (id) => {
  const response = await fetch(`${BASE_URL}/api/locals/${id}`)
  const data = await response.json();

  return data;
}

const postLocal = async (name, type, priceRange, city, zone, address, hours, photos) => {
  const response = await fetch(`${BASE_URL}/api/locals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, type, priceRange, city, zone, address, hours, photos }),
    
  });

  const data = await response.json();

 
console.log("info:", data);

};


const getDishes = async () => {
  const data = await fetch(`${BASE_URL}/api/dishes`).then(res => res.json());
  return data;
};

const postDish = async (name, category, localId, city, price, description) => {
  const response = await fetch(`${BASE_URL}/api/locals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, category, localId, city, price, description }),

  });

  const data = await response.json();

  console.log("info:", data);

};

const postReview = async (id, rating, comment) => {
  const response = await fetch(`${BASE_URL}/api/locals/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ rating , comment  }),
  });

  if (response.ok) {
  const data = await response.json();
  return data;
  } else {
    throw new Error("Error al enviar la reseña");
  }

}







export { register, login, getLocal, getLocals, getDishes, postLocal, postDish, postReview, BASE_URL };