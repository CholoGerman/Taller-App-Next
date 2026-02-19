"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BASE_URL } from "../../../api/api";

export default function LocalDetallePage() {
  const { id } = useParams();
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarLocal = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/locals/${id}`);
        if (!res.ok) {
          throw new Error("Error al cargar el local");
        }
        const data = await res.json();
        setLocal(data);
      } catch (err) {
        setError("No se pudo cargar el local");
      } finally {
        setLoading(false);
      }
    };

    cargarLocal();
  }, [id]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!local) return <p className="text-center">Local no encontrado</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{local.nombre}</h1>
      <p className="text-gray-600">
        {local.tipo} - {local.ciudad}
      </p>
      <p className="mt-4">{local.descripcion}</p>
      <div className="mt-4">
        <span className="font-semibold">Dirección:</span> {local.direccion}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Horarios:</span> {local.horarios}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Puntuación:</span> {local.puntuacion} ★
      </div>
      {/* Aquí luego agregarás reseñas y platos */}
    </div>
  );
}