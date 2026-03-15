import React from "react";
import Link from "next/link";
import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";

const LocalCard = ({ local }) => {
  const image =
    local.photos?.[0] ||
    "https://aramar.com/wp-content/uploads/2017/05/aramar-suministros-para-el-vidrio-cristal-sin-imagen-disponible.jpg";

  const rating = local.rating ? Number(local.rating).toFixed(1) : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Imagen con overlay y badge de tipo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={local.name || "Local"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {local.type && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {local.type}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-xl font-bold text-gray-900 line-clamp-1">{local.name}</h3>

        {/* Ubicación con icono */}
        <div className="mb-2 flex items-center text-sm text-gray-600">
          <MapPinIcon className="mr-1 h-4 w-4 text-gray-400" />
          <span className="line-clamp-1">{local.city || "Ubicación no disponible"}</span>
        </div>

        {/* Descripción */}
        {local.description ? (
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{local.description}</p>
        ) : (
          <p className="mb-4 text-sm text-gray-600">Sin descripción disponible.</p>
        )}

        {/* Fila inferior con calificación y botón */}
        <div className="mt-auto flex items-center justify-between">
          {rating ? (
            <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span>{rating}</span>
            </div>
          ) : (
            <div className="text-sm text-gray-400">Sin calificar</div>
          )}

          <Link
            href={`/VerLocal/${local.id}`}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ver detalles
            <svg
              className="ml-1.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocalCard;