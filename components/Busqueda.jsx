'use client';
import { useState, useEffect } from 'react';
import Input from './input';
import Select from './Select';

const Busqueda = ({
  query,
  setQuery,
  type,
  setType,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  maxRating,
  setMaxRating,
  city,
  setCity,
  zone,
  setZone
}) => {
  const [localQuery, setLocalQuery] = useState(query || '');
  const [localType, setLocalType] = useState(type || '');
  const [localPriceRange, setLocalPriceRange] = useState(priceRange || '');
  const [localMinRating, setLocalMinRating] = useState(minRating || '');
  const [localMaxRating, setLocalMaxRating] = useState(maxRating || '');
  const [localCity, setLocalCity] = useState(city || '');
  const [localZone, setLocalZone] = useState(zone || '');

  useEffect(() => {
    setLocalQuery(query || '');
    setLocalType(type || '');
    setLocalPriceRange(priceRange || '');
    setLocalMinRating(minRating || '');
    setLocalMaxRating(maxRating || '');
    setLocalCity(city || '');
    setLocalZone(zone || '');
  }, [query, type, priceRange, minRating, maxRating, city, zone]);

  const handleApply = () => {
    setQuery(localQuery);
    setType(localType);
    setPriceRange(localPriceRange);
    setMinRating(localMinRating);
    setMaxRating(localMaxRating);
    setCity(localCity);
    setZone(localZone);
  };

  const handleClear = () => {
    setLocalQuery('');
    setLocalType('');
    setLocalPriceRange('');
    setLocalMinRating('');
    setLocalMaxRating('');
    setLocalCity('');
    setLocalZone('');

    setQuery('');
    setType('');
    setPriceRange('');
    setMinRating('');
    setMaxRating('');
    setCity('');
    setZone('');
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/70 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Filtrar locales
      </h3>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <Input
          label="Nombre del local"
          name="query"
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />

        <Select
          name="type"
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="RESTAURANTE">Restaurante</option>
          <option value="BAR">Bar</option>
          <option value="FOOD_TRUCK">Food Truck</option>
          <option value="CAFETERIA">Cafetería</option>
          <option value="OTROS">Otros</option>
        </Select>

        <Select
          name="priceRange"
          value={localPriceRange}
          onChange={(e) => setLocalPriceRange(e.target.value)}
        >
          <option value="">Todos los precios</option>
          <option value="ECONOMICO">Económico</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </Select>

        {/* Dos inputs para el rango de calificación */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Mínimo"
            name="minRating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={localMinRating}
            onChange={(e) => setLocalMinRating(e.target.value)}
          />
          <Input
            label="Máximo"
            name="maxRating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={localMaxRating}
            onChange={(e) => setLocalMaxRating(e.target.value)}
          />
        </div>

        <Input
          label="Ciudad"
          name="city"
          type="text"
          value={localCity}
          onChange={(e) => setLocalCity(e.target.value)}
        />

        <Input
          label="Zona"
          name="zone"
          type="text"
          value={localZone}
          onChange={(e) => setLocalZone(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700 mt-4">
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition"
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
    </div>
  );
};

export default Busqueda;