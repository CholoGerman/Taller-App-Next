"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../api/api";
import FormRegister from "../../components/FormRegister";
import PatronVerde from "../../components/PatronVerde"; 

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!name || !username || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    try {
      setLoading(true);
      const data = await register(username, name, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMensaje("Registrado correctamente");
      router.push("/");
    } catch (err) {
      console.error(err);
      setMensaje(err.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <PatronVerde className="absolute inset-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <FormRegister
          name={name}
          username={username}
          password={password}
          onNameChange={(e) => setName(e.target.value)}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleRegister}
          onSignIn={handleSignIn}
          loading={loading}
        />
        {mensaje && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-red-500 z-20">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}