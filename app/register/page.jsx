"use client";

import { useState } from "react";
import { register } from "../../api/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !name) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      await register(username, password, name);
      setMensaje("Registrado correctamente");
    } catch (error) {
      setMensaje("Error en el registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Registrarse
        </h1>

        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Bienvenido a la <span className="text-[#7747ff]">App</span>
          </div>

          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Crea tu cuenta!
          </div>

          {/* 👇 SOLO CAMBIA ESTO */}
          <form onSubmit={handleRegister} className="flex flex-col gap-3">

            <div className="block relative">
              <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                Name
              </label>

              <input
                type="text"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="block relative">
              <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                Username
              </label>

              <input
                type="text"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="block relative">
              <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                Password
              </label>

              <input
                type="password"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal hover:bg-[#6436e6] transition"
            >
              Register
            </button>

          </form>

          <div className="text-sm text-center mt-[1.6rem]">
            ¿Ya tienes cuenta?{" "}
            <a href="/" className="text-[#7747ff]">
              Inicia sesión
            </a>
          </div>
        </div>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}
