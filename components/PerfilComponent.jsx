'use client';
import { useState, useEffect } from 'react';
import { getUser } from '../api/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProfileCard from '../components/ProfileCard';
import PlatoCard from '../components/PlatoCard';

export default function PerfilComponent() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [locals, setLocals] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(params.id);
      console.log(data);
      setUser(data.item);
      setLocals(data.item.locals || []);
      setDishes(data.item.dishes || []);
    };
    fetchUser();
  }, [params.id]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ProfileCard
          user={user}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s"
        />
{/* locales */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Locales de {user.name}</h2>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {locals.map((local) => (
                <Link key={local.id} href={`/VerLocal/${local.id}`} className="group relative block">
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-auto lg:h-80">
                    <img
                      alt={local.name}
                      src={local.photos?.[0] || "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg?semt=ais_user_personalization&w=740&q=80"}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {local.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{local.type}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{local.city}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
{/* platos */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Platos de {user.name}</h2>
          {dishes.length === 0 ? (
            <p className="mt-4 text-gray-500">Este usuario aún no ha publicado platos.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {dishes.map((dish) => (
                <Link key={dish.id} href={`/VerPlato/${dish.id}`}>
                  <PlatoCard dish={dish} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}