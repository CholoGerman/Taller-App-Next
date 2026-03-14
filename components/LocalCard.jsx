import React from "react";
import Link from "next/link";

const LocalCard = ({ local }) => {
  const image =
    local.photos?.[0] ||
    "https://aramar.com/wp-content/uploads/2017/05/aramar-suministros-para-el-vidrio-cristal-sin-imagen-disponible.jpg";

  return (
    <div className="group relative flex flex-col rounded-xl bg-clip-border text-gray-700 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-gray-200">
        <img
          src={image}
          alt={local.name || "Local"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{local.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{local.type || "Sin tipo"}</p>

        {local.description ? (
          <p className="mb-3 text-sm text-gray-600 line-clamp-3">{local.description}</p>
        ) : (
          <p className="mb-3 text-sm text-gray-600">Ubicado en {local.city || "—"}</p>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {local.rating !== undefined && (
              <span className="text-sm font-medium text-gray-900">{local.rating} ★</span>
            )}
            <span className="text-sm text-gray-500">{local.city || "Ciudad desconocida"}</span>
          </div>

          <Link
            href={`/VerLocal/${local.id}`}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Ver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocalCard;