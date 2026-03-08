'use client';
import { useState, useEffect } from 'react';
import { getLocals } from '../api/api';

const BusquedaPlatos = ({ setQ, setCategory, setDateFrom, setDateTo, setCity, setLocalId }) => {
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const data = await getLocals();
        setLocals(data.items || []);
      } catch (error) {
        console.error('Error al cargar locales:', error);
      }
    };
    fetchLocals();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="q" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del plato
          </label>
          <input
            id="q"
            name="q"
            type="text"
            placeholder="Ej: Bife, Pizza..."
            onChange={(e) => setQ(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            <option value="">Todas las categorías</option>
            <option value="entrada">Entrada</option>
            <option value="principal">Principal</option>
            <option value="postre">Postre</option>
            <option value="bebida">Bebida</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Ej: Montevideo"
            onChange={(e) => setCity(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="localId" className="block text-sm font-medium text-gray-700 mb-1">
            Local
          </label>
          <select
            id="localId"
            name="localId"
            onChange={(e) => {
              console.log('Valor seleccionado:', e.target.value);
              setLocalId(e.target.value);
            }}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            <option value="">Todos los locales</option>
            {locals.map((local) => (
              <option key={local.id} value={local.id}>
                {local.name} - {local.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha de publicación</h3>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="dateFrom" className="block text-xs text-gray-500 mb-1">
              Desde
            </label>
            <input
              id="dateFrom"
              name="dateFrom"
              type="date"
              onChange={(e) => setDateFrom(e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="dateTo" className="block text-xs text-gray-500 mb-1">
              Hasta
            </label>
            <input
              id="dateTo"
              name="dateTo"
              type="date"
              onChange={(e) => setDateTo(e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusquedaPlatos;