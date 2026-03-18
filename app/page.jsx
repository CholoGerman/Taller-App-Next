"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin } from "../api/api";
import Form from "../components/Form";
import PatronVerde from "../components/PatronVerde"; 

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!username || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    try {
      setLoading(true);
      const data = await apiLogin(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMensaje("Login exitoso");
      router.push("/home");
    } catch (err) {
      console.error(err);
      setMensaje(err?.error || err?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  return (
   <div className="relative min-h-screen w-full overflow-hidden bg-black">  
  <PatronVerde className="absolute inset-0" />
  <div className="relative z-10 flex items-center justify-center min-h-screen">
    <Form
      username={username}
      password={password}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
      onSignUp={handleSignUp}
      loading={loading}
      mensaje={mensaje}
    />
  </div>
</div>
  );
}