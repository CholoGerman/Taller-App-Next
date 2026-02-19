function LocalCard({ local }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{local.nombre}</h2>
        <p className="text-gray-600">
          {local.tipo} - {local.ciudad}
        </p>
        <p className="text-sm mt-2 line-clamp-2">{local.descripcion}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-yellow-500">★ {local.puntuacion}</span>
          <span className="text-gray-500">{local.rangoPrecio}</span>
        </div>
        <Link
          href={`/locales/${local.id}`}
          className="mt-2 inline-block text-blue-500 hover:underline"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}