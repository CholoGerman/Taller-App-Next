export default function LocalCard({ local }) {
  const name = local.name ?? local.nombre ?? "Sin nombre";
  const type = local.type ?? local.tipo ?? "—";
  const city = local.city ?? local.ciudad ?? local.zone ?? "—";
  const price = local.priceRange ?? local.rangoPrecio ?? "—";
  const rating = local.rating ?? local.puntuacion ?? "—";

  return (
    <article className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-1">{type} · {city}</p>
      <p className="text-sm">Precio: {price}</p>
      <p className="text-sm">Rating: {rating}</p>
      <div className="mt-3">
        <a href={`/locales/${local.id}`} className="text-blue-600 hover:underline text-sm">
          Ver detalle
        </a>
      </div>
    </article>
  );
}