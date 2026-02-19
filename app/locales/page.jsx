"use client";
import { useState, useEffect, useRef } from "react";
import Filters from "@/components/Filters";
import LocalCard from "@/components/LocalCard";
import { fetchWithParams } from "@/lib/api";

export default function LocalesPage() {
  const [locales, setLocales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchList();
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [q, type, priceRange, rating, city, zone]);

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {
        q,
        type,
        priceRange,
        rating,
        city,
        zone,
      };
      const data = await fetchWithParams("/api/locals", params);
      setLocales(data || []);
    } catch (err) {
      console.error(err);
      setError(err.error || "Error al cargar locales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Locales</h1>

      <Filters
        q={q} setQ={setQ}
        type={type} setType={setType}
        priceRange={priceRange} setPriceRange={setPriceRange}
        rating={rating} setRating={setRating}
        city={city} setCity={setCity}
        zone={zone} setZone={setZone}
      />

      {loading && <p>Cargando locales...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {locales.length === 0 && !loading ? (
          <p>No se encontraron locales</p>
        ) : locales.map(local => (
          <LocalCard key={local.id} local={local} />
        ))}
      </div>
    </div>
  );
}
