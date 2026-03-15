'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLocal, getDishes } from "../api/api";
import { MapPinIcon, MapIcon, BuildingStorefrontIcon, ClockIcon } from '@heroicons/react/20/solid';
import { Rating } from "@material-tailwind/react";
import RestaurantRating from "../components/RestaurantRating";
import Link from "next/link";
import PlatoCard from "../components/PlatoCard";
import Loader from "../components/Loader";

const DetallesLocal = () => {
  const [local, setLocal] = useState({});
  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const params = useParams();

  const features = [
    { name: 'Ciudad', description: local.city, icon: MapPinIcon },
    { name: 'Zona', description: local.zone, icon: MapIcon },
    { name: 'Dirección', description: local.address, icon: BuildingStorefrontIcon },
    { name: 'Horarios', description: local.hours, icon: ClockIcon },
  ];

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const data = await getLocal(params.id);
        setLocal(data.item || {});
      } catch (err) {
        console.error('Error fetching local:', err);
      }
    };
    if (params?.id) fetchLocal();
  }, [refresh, params?.id]);

  useEffect(() => {
    const fetchDishes = async () => {
      if (!params?.id) return;
      setLoadingDishes(true);
      try {
        const data = await getDishes('', '', '', '', '', params.id);
        setDishes(data.items || []);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoadingDishes(false);
      }
    };
    fetchDishes();
  }, [params?.id]);

  return (
    <>
      {/* HERO / INFO */}
      <section className="bg-gradient-to-b from-gray-50 overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            {/* LEFT - Texto */}
            <div className="lg:pr-8">
              <div className="lg:max-w-lg">
                {/* chips */}
                <div className="flex flex-wrap gap-2">
                  {local.category && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {local.category}
                    </span>
                  )}
                  {local.city && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {local.city}
                    </span>
                  )}
                </div>

                {/* título */}
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  {local.name || 'Nombre del local'}
                </h1>

                {/* descripción */}
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {local.description || 'Sin descripción disponible.'}
                </p>

                {/* horario inline */}
                {local.hours && (
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ClockIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    {local.hours}
                  </p>
                )}

                {/* features */}
                <dl className="mt-8 space-y-4 text-base text-gray-700">
                  {features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                        <feature.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-900">{feature.name}</dt>
                        <dd className="text-sm text-gray-600">{feature.description || '—'}</dd>
                      </div>
                    </div>
                  ))}

                  {/* perfil del creador (Link sin <a>) */}
                  <div className="mt-2">
                    <Link
                      href={`/perfil/${local.creatorId || ''}`}
                      className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100 hover:bg-indigo-50 transition"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 21a9 9 0 0118 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {local.creator?.name || 'Ver perfil'}
                    </Link>
                  </div>
                </dl>

          
              </div>
            </div>

            {/* RIGHT - Imagen */}
            <div className="relative mt-8 lg:mt-0">
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                <img
                  alt={local.name ? `Foto de ${local.name}` : 'Imagen del local'}
                  src={local.photos?.[0] || "https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"}
                  width={2432}
                  height={1442}
                  className="w-full h-80 sm:h-96 lg:h-[520px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
                  {local.openNow ? 'Abierto' : 'Horario'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de platos */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        {loadingDishes ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : dishes.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              Platos de {local.name}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/VerPlato/${dish.id}`}
                  className="block transform hover:-translate-y-1 transition"
                >
                  <PlatoCard dish={dish} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Este local aún no tiene platos registrados.</p>
        )}
      </section>

      {/* Reseñas */}
      {local.reviews && local.reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Reseñas</h2>
          <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {local.reviews.map((review) => (
              <li key={review.id} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <img
                    alt={review.user?.name ? `Avatar de ${review.user.name}` : 'Avatar'}
                    src={review.user?.avatar || "https://cdn-icons-png.flaticon.com/512/9131/9131478.png"}
                    className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-1 ring-black/5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{review.user?.name || 'Usuario'}</p>
                        <p className="text-xs text-gray-400">{review.date || ''}</p>
                      </div>
                      <Rating value={review.rating} readonly />
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <RestaurantRating id={local.id} name={local.name} setRefresh={setRefresh} />
    </>
  );
};

export default DetallesLocal;