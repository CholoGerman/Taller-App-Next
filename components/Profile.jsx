import { useEffect } from "react";

export default function Profile({ usuario, locales, platos }) {
  if (!usuario) return null;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(usuario.id);
      setUsuario(userData);
    };

    fetchData();
  })

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2">

          <div>
            <h2 className="text-base font-semibold text-indigo-600">
              Perfil de Usuario
            </h2>

            <p className="mt-2 text-4xl font-semibold text-gray-900">
              {usuario.username}
            </p>

            <p className="mt-6 text-lg text-gray-700">
              Email: {usuario.email}
            </p>

            <div className="mt-10 space-y-3 text-gray-600">
              <p><strong>Rol:</strong> {usuario.role}</p>
              <p><strong>ID:</strong> {usuario.id}</p>
              <p><strong>Locales creados:</strong> {locales.length}</p>
              <p><strong>Platos creados:</strong> {platos.length}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="Perfil"
              className="w-72 h-72 rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>

        </div>
      </div>
    </div>
  );
}