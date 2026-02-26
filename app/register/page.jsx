"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register} from "../../api/api"; 

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
      await register(username, password, name);
      setMensaje("Registrado correctamente. Ahora inicia sesión.");
      router.push("/");
    } catch (err) {
      console.error(err);
      setMensaje(err?.error || err?.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Registrarse</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Nombre</label>
            <input
              type="text"
              className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal hover:bg-[#6436e6] transition"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Register"}
          </button>

          <div className="text-sm text-center mt-4">
            ¿Ya tienes cuenta? <Link href="/" className="text-[#7747ff]">Inicia sesión</Link>
          </div>

          {mensaje && (
            <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>
          )}
        </form>
      </div>
    </div>
  );
}