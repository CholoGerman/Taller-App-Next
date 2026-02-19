"use client";
import { useState, useEffect, useRef } from "react";
import Filters from "@/components/Filters";
import DishCard from "@/components/DishCard";
import { fetchWithParams } from "@/lib/api";

export default function PlatosPage() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // filtros
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [city, setCity] = useState("");
  const [localId, setLocalId] = useState("");

  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchList();
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [q, category, dateFrom, dateTo, city, localId]);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {
        q,
        category,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        city,
        localId,
      };
      const data = await fetchWithParams("/api/dishes", params);
      setDishes(data || []);
    } catch (err) {
      console.error(err);
      setError(err.error || "Error al cargar platos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Platos</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input placeholder="Buscar..." className="border rounded p-2 flex-1" value={q} onChange={e=>setQ(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded p-2">
          <option value="">Categoría</option>
          <option value="entrada">Entrada</option>
          <option value="principal">Principal</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
          <option value="otros">Otros</option>
        </select>

        <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} className="border rounded p-2" />
        <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} className="border rounded p-2" />

        <input placeholder="Ciudad" value={city} onChange={e=>setCity(e.target.value)} className="border rounded p-2" />
        <input placeholder="Local ID" value={localId} onChange={e=>setLocalId(e.target.value)} className="border rounded p-2" />
      </div>

      {loading && <p>Cargando platos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {dishes.length === 0 && !loading ? (
          <p>No se encontraron platos</p>
        ) : dishes.map(d => <DishCard key={d.id} dish={d} />)}
      </div>
    </div>
  );
}
