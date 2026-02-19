"use client";

import { useState } from "react";
const BASE_URL = "https://api-react-taller-production.up.railway.app";
import Link from "next/link";

export default function HomePage() {
  // Estados para los filtros
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [puntuacion, setPuntuacion] = useState("");
  const [ciudad, setCiudad] = useState("");

  // Estados para los resultados y carga
  const [locales, setLocales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    setLoading(true);
    setError("");

    // Construir query string
    const params = new URLSearchParams();
    if (tipo) params.append("tipo", tipo);
    if (precio) params.append("precio", precio);
    if (puntuacion) params.append("puntuacion", puntuacion);
    if (ciudad) params.append("ciudad", ciudad);

    try {
      const res = await fetch(`${BASE_URL}/api/locals?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Error al cargar locales");
      }
      const data = await res.json();
      setLocales(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los locales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Locales Gastronómicos</h1>

      {/* Filtros */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos los tipos</option>
          <option value="restaurante">Restaurante</option>
          <option value="cafeteria">Cafetería</option>
          <option value="bar">Bar</option>
          <option value="foodtruck">Food Truck</option>
          <option value="otros">Otros</option>
        </select>

        <select
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos los precios</option>
          <option value="economico">Económico</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>

        <select
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las puntuaciones</option>
          <option value="1">1 estrella</option>
          <option value="2">2 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="5">5 estrellas</option>
        </select>

        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Botón de búsqueda */}
      <div className="mb-6">
        <button
          onClick={handleBuscar}
          className="bg-[#7747ff] text-white px-6 py-2 rounded hover:bg-[#6436e6] transition"
        >
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {loading && <p className="text-center">Cargando locales...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && locales.length === 0 && (
        <p className="text-center">No hay locales con esos filtros.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locales.map((local) => (
          <LocalCard key={local.id} local={local} />
        ))}
      </div>
    </div>
  );
}

