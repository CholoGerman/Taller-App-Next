function PlatoCard({ plato }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{plato.nombre || plato.name}</h2>
        <p className="text-gray-600">{plato.categoria}</p>
        <p className="text-sm mt-2 line-clamp-2">{plato.descripcion}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-yellow-500">★ {plato.rating || plato.puntuacion}</span>
          <span className="text-gray-500">{plato.precio}</span>
        </div>
        <Link
          href={`/platos/${plato.id}`}
          className="mt-2 inline-block text-blue-500 hover:underline"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
export default PlatoCard;