'use client';
import { useState, useEffect } from 'react';
import { getUser } from '../api/api';
import { useParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import LocalCard from './LocalCard';
import Link from 'next/link';
import PlatoCard from './PlatoCard';
import ProfileCard from './ProfileCard';

export default function PerfilComponent() {

  const params = useParams();
  const [user, setUser] = useState({});
  const [locals, setLocals] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const data = await getUser(params.id);

        console.log(data)

        setUser(data.item)
        setLocals(data.item.locals)
        setDishes(data.item.dishes)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchUser()
  }, [])


  return (
    <div className="bg-white py-24 sm:py-32">
      {error ? <Alert severity="error">{error}.</Alert> :
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex justify-center">
            <ProfileCard
              user={user}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s"
            />
          </div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Locales de {user.name}</h2>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {locals.map((local) => (
                  <LocalCard key={local.id} local={local} />
                ))}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Platos de {user.name}</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {dishes.map((dish) => (
                  <Link key={dish.id} href={`/VerPlato/${dish.id}`}>
                    <PlatoCard dish={dish} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}