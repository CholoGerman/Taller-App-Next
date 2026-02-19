"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LocalCard from "../../components/LocalCard";
import { fetchWithParams } from "../../api/api";

export default function HomePage() {
  const router = useRouter();

  const [locales, setLocales] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  const debounceRef = useRef(null);

  useEffect(() => {
    // Chequear token en localStorage; si no hay token -> / (login)
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token) {
      router.push("/");
      return;
    }
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || parsed.username || "");
      } catch {
        // ignore
      }
    }

    // primera carga
    fetchList(token, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // buscar con debounce
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchList(token, q);
    }, 400);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const fetchList = async (token, query) => {
    setLoading(true);
    setError("");
    try {
      const params = { q: query || undefined }; // si q === "" no lo añade
      const data = await fetchWithParams("/api/locals", params, token);
      setLocales(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.error || "Error al cargar locales");
      // si la API responde que token inválido, podés forzar logout:
      // if (err.message === '...') logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rutas del Sabor</h1>
          {userName && <p className="text-sm text-gray-600">Hola, {userName}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/crear/local")}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Nuevo local
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-4">
          <input
            type="search"
            placeholder="Buscar locales por nombre..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full md:w-1/2 p-2 border rounded"
          />
        </div>

        {loading && <p>Cargando locales...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading && locales.length === 0 && <p>No hay locales para mostrar.</p>}
          {locales.map((local) => (
            <LocalCard key={local.id} local={local} />
          ))}
        </div>
      </main>
    </div>
  );
}
