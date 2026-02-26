"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login as apiLogin } from "../api/api"; // ruta desde app/page.jsx -> ../api/api

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
      // data = { user: {...}, token: '...' }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || {}));
      setMensaje("Login exitoso");
      router.push("/home");
    } catch (err) {
      console.error(err);
      setMensaje(err?.error || err?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Bienvenido de vuelta a la <span className="text-[#7747ff]">App</span>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <label className="block text-gray-600 text-sm mb-2">Username</label>
              <input
                type="text"
                className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">Password</label>
              <input
                type="password"
                className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal hover:bg-[#6436e6] transition"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Enviar"}
            </button>
          </form>

          <div className="text-sm text-center mt-[1.6rem]">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-[#7747ff]">
              Regístrate gratis!
            </Link>
          </div>

          {mensaje && (
            <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
}