'use client';
import { useState, useEffect } from 'react';
import { getLocals } from '../api/api';
import Input from './input';
import Select from './Select'; 

const BusquedaPlatos = ({ setQ, setCategory, setDateFrom, setDateTo, setCity, setLocalId }) => {
  const [locals, setLocals] = useState([]);

  // Estados locales temporales
  const [localQ, setLocalQ] = useState('');
  const [localCategory, setLocalCategory] = useState('');
  const [localDateFrom, setLocalDateFrom] = useState('');
  const [localDateTo, setLocalDateTo] = useState('');
  const [localCity, setLocalCity] = useState('');
  const [localLocalId, setLocalLocalId] = useState('');

  // Cargar locales para el select
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

  // Aplica los filtros al padre
  const handleApply = () => {
    setQ(localQ);
    setCategory(localCategory);
    setDateFrom(localDateFrom);
    setDateTo(localDateTo);
    setCity(localCity);
    setLocalId(localLocalId);
  };

  // Limpia todos los filtros
  const handleClear = () => {
    setLocalQ('');
    setLocalCategory('');
    setLocalDateFrom('');
    setLocalDateTo('');
    setLocalCity('');
    setLocalLocalId('');

    setQ('');
    setCategory('');
    setDateFrom('');
    setDateTo('');
    setCity('');
    setLocalId('');
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/70 rounded-lg shadow-sm p-6">
      <form className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filtrar platos</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Nombre del plato"
            name="q"
            type="text"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
          />
          <Select
            name="category"
            value={localCategory}
            onChange={(e) => setLocalCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="entrada">Entrada</option>
            <option value="principal">Principal</option>
            <option value="postre">Postre</option>
            <option value="bebida">Bebida</option>
            <option value="otros">Otros</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Ciudad"
            name="city"
            type="text"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
          />
          <Select
            name="localId"
            value={localLocalId}
            onChange={(e) => setLocalLocalId(e.target.value)}
          >
            <option value="">Todos los locales</option>
            {locals.map((local) => (
              <option key={local.id} value={local.id}>
                {local.name} - {local.city}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Fecha de publicación</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dateFrom" className="block text-xs text-gray-500 mb-1">Desde</label>
              <input
                id="dateFrom"
                type="date"
                value={localDateFrom}
                onChange={(e) => setLocalDateFrom(e.target.value)}
                className="block w-full rounded-md border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="block text-xs text-gray-500 mb-1">Hasta</label>
              <input
                id="dateTo"
                type="date"
                value={localDateTo}
                onChange={(e) => setLocalDateTo(e.target.value)}
                className="block w-full rounded-md border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7L5 21M5 7l14 14" />
            </svg>
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition"
          >
            Aplicar filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusquedaPlatos;