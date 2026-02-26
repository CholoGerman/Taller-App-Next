// app/perfil/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "../../../components/Profile"; 

export default function ProfilePage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [locales, setLocales] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const loadProfile = async () => {
      try {
        const userData = await fetchUser(token);
        setUsuario(userData);

        const [localesData, platosData] = await Promise.all([
          fetchUserLocales(userData.id),
          fetchUserDishes(userData.id),
        ]);

        setLocales(localesData);
        setPlatos(platosData);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) return <p className="p-6 text-center">Cargando perfil...</p>;

  return (
    <div>
      <Profile usuario={usuario} />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis locales</h2>
        {locales.length === 0 ? (
          <p className="text-gray-500">Aún no has creado ningún local.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locales.map((local) => (
              <div key={local.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg">{local.name}</h3>
                <p className="text-gray-600">{local.address}</p>
                <p className="text-sm text-gray-500">{local.city}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis platos</h2>
        {platos.length === 0 ? (
          <p className="text-gray-500">Aún no has creado ningún plato.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platos.map((plato) => (
              <div key={plato.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg">{plato.name}</h3>
                <p className="text-gray-600">{plato.description}</p>
                <p className="text-sm font-medium text-indigo-600 mt-2">${plato.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}