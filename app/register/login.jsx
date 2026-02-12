"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    await login(username, password);

    if (!username || !password) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    setMensaje("Login exitoso");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Iniciar Sesión
        </h1>

<div class="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
    <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Bienvenido devuelta a la <span class="text-[#7747ff]">App</span></div>
    <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Inicia sesión en tu cuenta</div>
<form class="flex flex-col gap-3">
    <div class="block relative"> 
    <label htmlFor="name" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
    <input 
    type="text" 
    name="username"
    id="username" 
    class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      autoComplete="username"
    ></input>

    </div>
    <div class="block relative"> 
    <label htmlFor="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
    <input 
    type="password" 
    name="password"
    id="password" 
    class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="current-password"
    ></input>

    </div>
    <div>
    <a class="text-sm text-[#7747ff]" href="#">¿Olvidaste tu contraseña?</a>
    </div>
    <button type="submit" class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Enviar</button>

</form>
<div class="text-sm text-center mt-[1.6rem]">¿No tienes cuenta? <a class="text-sm text-[#7747ff]" href="../register/register.jsx">Regístrate gratis!</a></div>
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