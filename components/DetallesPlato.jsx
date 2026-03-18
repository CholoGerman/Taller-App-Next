'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDish } from "../api/api";
import {
  MapPinIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  TagIcon,
} from '@heroicons/react/20/solid';
import { Rating } from "@material-tailwind/react";
import Link from "next/link";
import PlatoRating from "../components/PlatoRating";

const FeatureRow = ({ icon: Icon, title, value, link }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg  text-indigo-600 ring-1 ring-indigo-100">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <dt className="font-medium text-gray-900">{title}</dt>
      <dd className="text-sm text-gray-600">
        {link && value ? (
          <Link href={link} className="text-indigo-600 hover:underline">
            {value}
          </Link>
        ) : (
          value || '—'
        )}
      </dd>
    </div>
  </div>
);

const DetallesPlato = () => {
  const [dish, setDish] = useState({});
  const [refresh, setRefresh] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await getDish(params?.id);
        setDish(data?.item || {});
      } catch (err) {
        console.error("Error fetching dish:", err);
      }
    };
    if (params?.id) fetchDish();
  }, [params?.id, refresh]);

  const features = [
    { name: 'Ciudad', description: dish.city, icon: MapPinIcon },
    { name: 'Categoría', description: dish.category, icon: TagIcon },
    { name: 'Precio', description: dish.price ? `$${dish.price}` : '', icon: CurrencyDollarIcon },
    {
      name: 'Local',
      description: dish.local?.name,
      icon: BuildingStorefrontIcon,
      link: dish.localId ? `/VerLocal/${dish.localId}` : null,
    },
  ];

  const image = dish.photos?.[0] || dish.photo || "https://via.placeholder.com/1200x900?text=Plato";

  return (
    <>
      {/* HERO / INFO */}
      <section className=" from-gray-50 to-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-12 items-start">
            <div className="lg:pt-4">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-2 items-center">
                  {dish.category && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      <TagIcon className="h-4 w-4" />
                      {dish.category}
                    </span>
                  )}
                  {dish.city && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-gray-100">
                      <MapPinIcon className="h-4 w-4 text-indigo-600" />
                      {dish.city}
                    </span>
                  )}
                </div>

                <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {dish.name || 'Nombre del plato'}
                </h1>

                <p className="mt-4 text-lg leading-7 text-gray-600">
                  {dish.description || 'Descripción no disponible.'}
                </p>

                {/* price + rating row */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-sm">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-700" />
                    <span className="text-gray-800">{dish.price ? `$${dish.price}` : 'Precio no informado'}</span>
                  </div>

                 
                </div>

                {/* features list */}
                <dl className="mt-8 space-y-4">
                  {features.map((f) => (
                    <FeatureRow
                      key={f.name}
                      icon={f.icon}
                      title={f.name}
                      value={f.description}
                      link={f.link}
                    />
                  ))}
                </dl>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {dish.localId && (
                    <Link
                      href={`/VerLocal/${dish.localId}`}
                      className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow hover:scale-[1.02] transition transform"
                    >
                      Ver local
                    </Link>
                  )}

                 
                </div>
              </div>
            </div>

            {/* RIGHT - imagen */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={image}
                  alt={dish.name ? `Foto de ${dish.name}` : 'Imagen del plato'}
                  loading="lazy"
                  className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
                />

                {dish.price && (
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                    {`$${dish.price}`}
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 px-6 py-5 bg-gradient-to-t from-black/55 to-transparent">
                  <div className="text-sm font-semibold text-white">{dish.name}</div>
                  <div className="text-xs text-white/80 mt-1">{dish.local?.name || ''}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Reseñas */}
{dish.reviews && dish.reviews.length > 0 && (
  <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
      Reseñas de clientes
    </h2>
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dish.reviews.map((review) => (
        <li
          key={review.id}
          className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          {/* Comilla decorativa */}
          <div className="absolute top-3 right-3 text-4xl text-gray-100 select-none">“</div>

          <div className="flex items-start gap-4">
            {/* Avatar con borde sutil */}
            <img
              alt={review.user?.name ? `Avatar de ${review.user.name}` : 'Avatar'}
              src={review.user?.avatar || "https://cdn-icons-png.flaticon.com/512/6861/6861326.png"}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              {/* Cabecera: nombre y fecha */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 truncate">
                  {review.user?.name || 'Usuario'}
                </p>
                {review.date && (
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(review.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {/* Calificación con estrellas amarillas */}
              <div className="mt-1">
                <Rating value={review.rating} readonly className="text-yellow-400" />
              </div>

              {/* Comentario con fondo suave */}
              <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                {review.comment}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
)}

      <PlatoRating id={dish.id} name={dish.name} setRefresh={setRefresh} />
    </>
  );
};

export default DetallesPlato;