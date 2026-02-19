"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BASE_URL = "https://api-react-taller-production.up.railway.app";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Error en login");
      }

      const data = await response.json();

      console.log("Usuario logueado:", data);

      localStorage.setItem("token", data.token);

      setMensaje("Login exitoso");

      // redirigir a /home (ruta, no archivo)
      router.push("/home");
    } catch (error) {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Bienvenido devuelta a la <span className="text-[#7747ff]">App</span>
          </div>

          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Inicia sesión en tu cuenta
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="block relative">
              <label className="block text-gray-600 text-sm mb-2">Username</label>

              <input
                type="text"
                className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="block relative">
              <label className="block text-gray-600 text-sm mb-2">Password</label>

              <input
                type="password"
                className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div>
              <a className="text-sm text-[#7747ff]" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal hover:bg-[#6436e6] transition"
            >
              Enviar
            </button>
          </form>

          <div className="text-sm text-center mt-[1.6rem]">
            ¿No tienes cuenta?{" "}
            <a className="text-sm text-[#7747ff]" href="/register">
              Regístrate gratis!
            </a>
          </div>
        </div>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
